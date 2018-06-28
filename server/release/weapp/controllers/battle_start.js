const account_mgr = require('../game/ds_account_mgr');
const errcode = require('../def/errcode');
const data_table = require('../dt/data_table');
const util = require('util');

// 战斗开始
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
        ctx.state.code = errcode.REQUEST_ARGS_INVALID;
        return;
    }
    
    let acc_obj =account_mgr.get_acc_obj(query);
    if (acc_obj == null)
    {
        ctx.state.code = errcode.REQUEST_CONTEXT_INVALID;
        return;
    }

    if (!acc_obj.net_freq())
    {
        ctx.state.code = errcode.REQUEST_SO_FAST;
        return;
    }

    // 关卡ID
    let stage_id = parseInt(query.stage_id);
    if ( Number.isNaN(stage_id)|| stage_id <= 0)
    {
        ctx.state.code = errcode.REQUEST_CONTEXT_INVALID2;
        return;
    }

    // 英雄上阵列表
    let heros = query.heros;
    if (!Array.isArray(heros))
    {
        ctx.state.code = errcode.REQUEST_CONTEXT_INVALID3;
        return; 
    }

    let line = data_table.get('stagelist', stage_id);
    if (line == null)
    {
        ctx.state.code = errcode.STAGE_ID_INVALID;
        return;
    }

    let need_power = line.cost_power;
    let player = acc_obj.get_player();
    let battle = player.get_battle();
    let top_stage_id = battle.get_top_stage_id();
    if (stage_id > top_stage_id)
    {
        ctx.state.code = errcode.STAGE_LOCK;
        return;
    }

    let battle_heros = battle.hero_goto_battle_field(heros);
    if (battle_heros == null)
    {
        ctx.state.code = errcode.HERO_CONFIG_ERROR;
        return;
    }

    // 消耗体力
    if ( !player.consume_power(need_power, 'battle_start'))
    {
        ctx.state.code = errcode.NEED_MORE_POWER;
        return;
    }

    // 如果发生之前的关卡没有打完(没有发送battle_end)，客户端再次发送battle_start的情况，不管，因为已经扣了体力了
    let stage_ins_id = battle.new_battle_start(stage_id);
    ctx.state.code = errcode.OK;
    ctx.state.data = 
    { 
        'stage_ins_id': stage_ins_id, 
        'heros':  battle_heros,
        'stage_id': stage_id
    };

    console.log( util.format('new battle start, uid=%d, stage_id=%d, top_sid=%d, ins_id=%d', 
        acc_obj.get_uid(), stage_id, top_stage_id, stage_ins_id));
}
