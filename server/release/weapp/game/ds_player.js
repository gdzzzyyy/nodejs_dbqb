const ds_asset = require('./ds_asset');
const ds_db = require('./ds_db');
const gamedef = require('../def/gamedef');
const util = require('util');
const ds_backpack = require('./ds_backpack');
const ds_battle = require('./ds_battle');
const dt_config = require('../dt/dt_config');
const ds_datasync = require('./ds_datasync');
const ds_heros = require('./ds_heros');


class ds_player
{
    constructor()
    {
    }

    init_player(uid)
    {
        this.uid = uid;
        this.data_dirty = 0;

        this.asset = new ds_asset();
        this.asset.init_asset();

        this.backpack = new ds_backpack();
        this.backpack.init_backpack();

        this.hero_mgr =new ds_heros();
        this.hero_mgr.init_heros();

        this.battle = new ds_battle();
        this.battle.init_battle(this.hero_mgr);
    }

    set_data_dirty(reason)
    {
        ds_datasync.push(this, reason);
    }

    get_backpack()
    {
        return this.backpack;
    }

    get_asset()
    {
        return this.asset;
    }

    get_hero_mgr()
    {
        return this.hero_mgr;
    }

    get_uid()
    {
        return this.uid;
    }

    get_battle()
    {
        return this.battle;
    }

    // 创建新号
    init_new_player_data()
    {
        // 最初关卡
        this.get_battle().set_top_stage_id( dt_config.get_first_stage_id() );
        
        // 最初英雄
        let heros =dt_config.get_first_hero_config();
        this.get_hero_mgr().set_heros_data(heros);

        this.set_data_dirty('new_account');
    }

    // 载入老号
    async load_db_asset()
    {
        let sql = util.format('select `backpack`, `heros`, `basedata`, `top_stage_id`, `fps_reward` from `player_data` where `uid` = %s',
            this.uid.toString());

        let lines = await ds_db.query(sql, []);
        if (lines.length != 1)
        {
            let s = util.format('load player db: %d fail, len=%d', this.uid, lines.length);
            console.error(s);
            return;
        }

        let line = lines[0];
        let base_obj, backpack_obj, hero_obj, fps_reward;

        try
        {
            base_obj = JSON.parse(line.basedata);
            backpack_obj = JSON.parse(line.backpack);
            hero_obj = JSON.parse(line.heros);
            fps_reward = JSON.parse(line.fps_reward);
        }
        catch(err)
        {
            console.error(util.format('load db format fail: uid=%d, err=%s', this.uid, err || ""));
            return;
        }

        for(let i in gamedef.asset_fields)
        {
            let field = gamedef.asset_fields[i];
            let data_value = base_obj[field];
            this.asset.set_asset_value(field, data_value);
        }
        this.asset.sync_power_value();

        this.backpack.set_items(backpack_obj);
        this.get_battle().set_top_stage_id(line.top_stage_id);
        this.get_battle().load_fps_reward_db(fps_reward);
        this.get_hero_mgr().set_heros_data(hero_obj);
    }

    async sync_data2db()
    {
        let uid = this.get_uid();
        console.log(util.format('save db, uid=%d ...', uid));

        try
        {
            let asset = JSON.stringify(this.get_asset().get_base_data());
            let backpack = JSON.stringify(this.get_backpack().get_all_items());
            let heros = JSON.stringify(this.get_hero_mgr().get_all_hero_db());
            let top_stage_id = this.get_battle().get_top_stage_id();
            let fps_reward = this.get_battle().get_fps_reward_db();
            let sql = util.format("replace into `player_data` (`uid`, `top_stage_id`, `basedata`, `backpack`, `heros`, `fps_reward`) values (%d, %d, '%s', '%s', '%s', '%s')",
                uid, top_stage_id, asset, backpack, heros, fps_reward);
            this.data_dirty = 0;

            await ds_db.query(sql, []);

            console.log(util.format('save db, uid=%d, ok', uid));
        }
        catch(err)
        {
            let msg = err || "";
            console.error(util.format('save db fail, uid=%d, msg=%s', uid, msg));
            return false;
        }

        return true;
    }
    
    // 消耗体力
    consume_power(value, reason)
    {
        if (this.asset.sub_power(value, reason))
        {
            this.set_data_dirty('consume_power');
            return true;
        }       

        return false;
    }

    levelup_hero(hero, citems)
    {
        if (!this.backpack.cosume_items(citems))
        {
            return false;
        }

        hero.levelup();
        this.set_data_dirty('hero_levelup');
        return true;
    }

    unlock_hero(hero_id, fragmentid, need_fragment_num)
    {
        let items = {};
        items[fragmentid] = need_fragment_num;

        if (!this.backpack.cosume_items(items))
        {
            return false;
        }

        if (!this.hero_mgr.add_new_hero(hero_id, 0))
        {
            return false;
        }

        this.set_data_dirty('unlock_hero');
        return true;
    }
}

module.exports = ds_player;
