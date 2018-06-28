
const ds_db = require('./ds_db');
const gamedef = require('../def/gamedef');
const ds_account = require('./ds_account');
const util = require('util');
const ds_helper = require('./ds_helper');
const ds_datasync = require('./ds_datasync');

const HEXCHAR = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SIDLEN = 8;

function new_random_sid(len)
{
    let s = [];
    for(let i =0; i<len; ++i)
    {
        let index = Math.floor( (Math.random() * HEXCHAR.length) );
        s.push(HEXCHAR[index]);
    }
    return s.join('');
}

class ds_account_mgr
{
    constructor()
    {
    }

    create_session_id()
    {
        for(let i=0; i<10; ++i)
        {
            const sid = new_random_sid(SIDLEN);
            if (this.sessions[sid] == null)
            {
                return sid;
            }
        }
    }

    async create_account_by_openid(openid, now)
    {
        const sql = util.format('insert into `account` (`openid`, `create_time`, `last_login_time`, `login_count`) values ( "%s", %d, %d, 1)', 
            openid, now, now);
        let row = await ds_db.query(sql, []);
        let uid = row.insertId;
        return uid;
    }

    async create_account_by_uid(uid, now)
    {
        const sql = util.format('insert into `account` (`uid`, `openid`, `create_time`, `last_login_time`, `login_count`) values ( %d, "", %d, %d, 1)', 
            uid, now, now);
        await ds_db.query(sql, []);
    }

    create_new_account(uid, create_time, last_login_time, login_count)
    {
        let acc = new ds_account();
        acc.init_account(uid, create_time, last_login_time, login_count);
        this.uid_table[uid] = acc;
        return acc;
    }

    get_acc_obj(query)
    {
        if (query.sid != null)
        {
            return this.get_acc_by_sid(query.sid);
        }

        if (gamedef.debug_mode)
        {
            if (query.uid !=null)
            {
                return this.get_acc_by_uid(query.uid);
            }
        }
    }

    get_acc_by_sid(sid)
    {
        let sobj = this.sessions[sid];
        if (sobj != null)
        {
            return this.uid_table[sobj.uid];
        }        
    }

    get_acc_by_uid(uid)
    {
        return this.uid_table[uid];
    }

    async login_dev(cfg)
    {
        let uid = cfg.uid;
        console.log( util.format('login_dev begin, uid=%d', uid) );

        let sid = this.create_session_id();
        if (sid == null)
        {
            console.error( util.format('create_session_id fail, uid=%d', uid) );
            return;
        }

        let acc_obj = this.uid_table[uid];
        if (acc_obj == null)
        {
            // 创建新帐号
            let now_tick = ds_helper.now_tick();
            await this.create_account_by_uid(uid, now_tick);
            console.log(util.format('create dev_account, uid=%d', uid));

            acc_obj = this.create_new_account(uid, now_tick, now_tick, 1);
            acc_obj.set_last_sid(sid);

            // 初始化数据库
            acc_obj.get_player().init_new_player_data();
        }
        else
        {
            // 使用老帐号, 要把原来的session清空
            let last_sid = acc_obj.last_sid;
            if(last_sid.length > 0)
            {
                this.sessions[last_sid] = null;
                console.log( util.format('relogin dev, uid=%s, clear sid=%s', uid, last_sid) );
            }
            await acc_obj.relogin(sid);
        }

        let info =
        {
            'uid': uid,
        }
        this.sessions[sid] = info;
        console.log( util.format('login_dev ok, uid=%d, sid=%s', uid, sid) );
        return acc_obj;
    }

    async login_wx_openid(cfg)
    {
        const curropenid = "wx|" + cfg.openid;
        console.log( util.format('login_wx_openid begin, open_id=%s', curropenid) );

        let sid = this.create_session_id();
        if (sid == null)
        {
            console.error( util.format('create_session_id fail, open_id=%s', curropenid) );
            return;
        }

        let acc_obj = this.openid_table[curropenid];
        if (acc_obj == null)
        {
            let now_tick = ds_helper.now_tick();
            // 创建新帐号
            let uid = await this.create_account_by_openid(curropenid, now_tick);
            console.log( util.format('create wx_account, open_id=%s, uid=%s', curropenid, uid) );
            acc_obj = this.create_new_account(uid, now_tick, now_tick, 1);
            acc_obj.set_open_id(curropenid);
            acc_obj.set_last_sid(sid);
            this.openid_table[curropenid] = acc_obj;
            acc_obj.get_player().init_new_player_data();
        }
        else
        {
            // 使用老帐号, 要把原来的session清空
            let last_sid = acc_obj.last_sid;
            if(last_sid.length > 0)
            {
                this.sessions[last_sid] = null;
                console.log( util.format('relogin_wx, open_id=%s, clear sid=%s', cfg.openid, last_sid) );
            }
            await acc_obj.relogin(sid);
        }

        let info =
        {
            'uid': acc_obj.uid,
            'wx_skey': cfg.seky, // 可选
            'wx_code': cfg.code, // 可选
        }

        this.sessions[sid] = info;
        console.log( util.format('login_wx_openid ok, uid=%s, sid=%s', acc_obj.uid, sid) );
        return acc_obj;
    }

    async init_acc_mgr()
    {
        this.uid_table = {};
        this.openid_table = {};
        this.sessions= {};

        let tables = await ds_db.query('select * from `account`', []);
        for(let i in tables)
        {
            let line = tables[i];
            let acc_obj = this.create_new_account(line.uid, line.create_time, line.last_login_time, line.login_count);
            acc_obj.set_open_id(line.openid);
            acc_obj.get_player().load_db_asset();

            if (line.openid.length > 0)
            {
                this.openid_table[line.openid] = acc_obj;
            }
        }

        console.log('`account` load ok, count=%d', tables.length);
        ds_datasync.init_sync();
    }

    get_all_player()
    {
        let players = [];
        for(let i in this.uid_table)
        {
            let acc_obj = this.uid_table[i];
            players.push( acc_obj.get_player() );
        }
        return players;
    }

    get_all_acc()
    {
        return this.uid_table;
    }
}

module.exports = new ds_account_mgr();
