const account_mgr = require('../game/ds_account_mgr');
const errcode = require('../def/errcode');
const datadef = require('../def/datadef');
const util = require('util');
const data_table = require('../dt/data_table');
const dt_config = require('../dt/dt_config');
const ds_loot = require('../game/ds_loot');

// 战斗胜负的影响结果
// 1. 胜利给经验，失败不给经验
// 2. 胜利解锁下一关，失败不解锁
// 战斗结束

module.exports = async (ctx, next) =>
{
    let query 
    try
    {
        query = JSON.parse(ctx.request.body);
        if (query == null) 
        {
            ctx.state.code = errcode.REQUEST_ARGS_INVALID;
            return;
        }
    }
    catch(e)
    {
        ctx.state.code = errcode.REQUEST_ARGS_INVALID2;
        return;
    }

    let acc_obj =account_mgr.get_acc_obj(query);
    let stage_ins_id = query.stage_ins_id;
    let battle_result = query.result;
    let reward = query.reward;

    if (acc_obj == null || stage_ins_id == null 
        || battle_result == null || reward == null)
    {
        ctx.state.code = errcode.REQUEST_CONTEXT_INVALID3;
        return;
    }

    if (!acc_obj.net_freq())
    {
        ctx.state.code = errcode.REQUEST_SO_FAST;
        return;
    }

    console.log( util.format('battle_end request, uid=%d, result=%s, stage_ins_id=%s',
        acc_obj.get_uid(), battle_result.toString(), stage_ins_id.toString()) );

    if (battle_result !== datadef.BATTLE_WIN && battle_result !== datadef.BATTLE_LOSE)
    {
        ctx.state.code = errcode.REQUEST_CONTEXT_INVALID4;
        return;
    }

    let player = acc_obj.get_player();
    let battle = player.get_battle();
    let curr_stage_id = battle.get_curr_battle_stage_id();

    if ( stage_ins_id != battle.get_battle_ins_id())
    {
        ctx.state.code = errcode.BATTLE_INS_ID_INVALID1;
        return;
    }

    if (curr_stage_id == 0)
    {
        ctx.state.code = errcode.BATTLE_INS_ID_INVALID2;
        return;
    }

    let stage_line = data_table.get('stagelist', curr_stage_id);
    if (stage_line == null)
    {
        ctx.state.code = errcode.BATTLE_INS_ID_INVALID2;
        return;
    }
    ////////////////////////////////////////////////////////////////
    // 以上部分为数据合法性检测
    ////////////////////////////////////////////////////////////////

    const reply_obj = {};

    // 背包添加道具
    let items= {};
    for(let i in reward)
    {
        let c = reward[i];
        let item_id = c[0];
        let item_count = c[1];
        items[item_id] = (items[item_id] || 0 ) + item_count;
    }

    if (!player.get_backpack().add_items(items))
    {
        ctx.state.code = errcode.ADD_ITEM_FAIL_IDERR;
        return;
    }

    if (battle_result === datadef.BATTLE_WIN)
    {
        if (stage_line.first_reward > 0)
        {
            if (!player.get_battle().has_fps_reward(curr_stage_id))
            {
                // 添加首通奖励
                let fps_reward_items = ds_loot.calc_loot_items(stage_line.first_reward, 1);
                player.get_backpack().add_items(fps_reward_items);
                player.get_battle().add_fps_reward_flag(curr_stage_id);
                console.log('add fps reward', player.get_uid(), fps_reward_items);
                console.log(stage_line.first_reward);
            }
        }

        // 添加经验
        let add_exp = stage_line.win_add_exp;
        player.get_asset().add_asset_value(datadef.PBD_EXP, add_exp);     
        reply_obj.exp = add_exp;

        // 解锁下一关
        let top_stage_id = battle.get_top_stage_id();
        let next_stage_id = dt_config.get_next_stage_id(curr_stage_id);
        if (next_stage_id > top_stage_id)
        {
            battle.set_top_stage_id(next_stage_id);
            reply_obj.top_stage_id = next_stage_id;
        }

        let s = util.format('uid=%d, battle win, prev_id=%d, new_id=%d',
            player.get_uid(), top_stage_id, next_stage_id);

        console.log(s);
    }
    else
    {
        let s = util.format('uid=%d, battle lost', player.get_uid());
        console.log(s);
    }

    battle.set_battle_end();
    player.set_data_dirty('battle_end_reward');

    ctx.state.data = reply_obj;
}
