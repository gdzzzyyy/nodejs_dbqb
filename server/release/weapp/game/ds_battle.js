
class ds_battle
{
    constructor()
    {
    }

    init_battle(hero_mgr)
    {
        this.curr_battle_ins_id = 0; // 战场实例ID （不存档）
        this.curr_battle_stage_id = 0; // 当前正在作战的关卡ID （不存档）
        this.top_stage_id = 0; // 最高解锁关卡ID（存档）
        this.hero_mgr = hero_mgr;
        this.fps_reward = {}; // 首通奖励
    }

    get_curr_battle_stage_id()
    {
        return this.curr_battle_stage_id;
    }

    set_top_stage_id(id)
    {
        this.top_stage_id = id;
    }

    get_top_stage_id(id)
    {
        return this.top_stage_id;
    }

    // 设置作战英雄队列
    hero_goto_battle_field(ids)
    {
        this.curr_battle_heros = null;
        let list= {};
        for(let i in ids)
        {
            let hero_type_id = ids[i];
            let hero = this.hero_mgr.get_hero(hero_type_id);
            if (hero == null)
            {
                // 英雄不存在,失败
                return;
            }

            list[hero_type_id] = hero.get_level();
        }
        this.curr_battle_heros = list;
        return this.curr_battle_heros;
    }

    new_battle_start(stage_id)
    {
        ++this.curr_battle_ins_id;
        this.curr_battle_stage_id = stage_id;
        return this.curr_battle_ins_id;
    }

    get_battle_ins_id()
    {
        return this.curr_battle_ins_id;
    }

    set_battle_end()
    {
        this.curr_battle_ins_id = 0;
        this.curr_battle_stage_id = 0;
        this.curr_battle_heros = null;
    }

    /////////////////////////////////////////////////////////
    /// fps_reward
    /////////////////////////////////////////////////////////
    has_fps_reward(id)
    {
        return this.fps_reward[id] == true;
    }

    add_fps_reward_flag(id)
    {
        this.fps_reward[id] = true;
    }

    load_fps_reward_db(fpsd)
    {
        for(let i in fpsd)
        {
            let stage_id = fpsd[i];
            this.fps_reward[stage_id] = true;
        }
    }

    get_fps_reward_db()
    {
        let list = [];
        for(let stage_id in this.fps_reward)
        {
            list.push(stage_id);
        }
        return list;
    }

    /////////////////////////////////////////////////////////


}

module.exports = ds_battle;
