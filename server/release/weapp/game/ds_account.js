const ds_player = require('./ds_player');
const ds_helper = require('./ds_helper');
const ds_db = require('./ds_db');
const util = require('util');

class ds_account
{
    init_account(uid, create_time, last_login_time, login_count)
    {
        this.uid = uid;
        this.login_count = login_count;
        this.create_time = create_time;
        this.last_login_time = last_login_time;
        this.openid = "";
        this.last_sid = "";
        this.net_req_time = []; // 10个请求包,旧的在前面，新在后面(push)
        
        this.player = new ds_player();
        this.player.init_player(uid);
    }

    // 协议：限流
    net_freq()
    {
        let now = Date.now();
        if (this.net_req_time.length < 30)
        {
            this.net_req_time.push(now);
            return true; 
        }
        
        if (now - this.net_req_time[29] < 30) // 30毫秒连发2个包，不允许
        {
            return false;
        }

        if (now - this.net_req_time[0] < 6*1000) // 6秒之内，不能大于30个包（即1秒5个包）
        {
            return false;
        }

        this.net_req_time.shift();
        this.net_req_time.push(now);
        return true;
    }

    get_uid()
    {
        return this.uid;
    }

    get_login_count()
    {
        return this.login_count;
    }

    get_last_sid()
    {
        return this.last_sid;
    }

    set_open_id(openid)
    {
        this.openid = openid;
    }

    set_last_sid(last_sid)
    {
        this.last_sid = last_sid;
    }

    get_player()
    {
        return this.player;
    }

    async relogin(sid)
    {
        this.last_sid = sid;
        this.login_count++;
        this.last_login_time = ds_helper.now_tick();
        let sql = util.format('update `account` set `last_login_time`=%d, `login_count`=%d where `uid`=%d', 
            this.last_login_time, this.login_count, this.uid);
        await ds_db.query(sql);
    }
}

module.exports = ds_account;