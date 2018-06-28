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
    let hero_id = parseInt(query.hero_id);
    if ( Number.isNaN(hero_id)|| hero_id <= 0)
    {
        ctx.state.code = errcode.REQUEST_CONTEXT_INVALID2;
        return;
    }

    let player = acc_obj.get_player();
    let exist_hero = player.get_hero_mgr().get_hero(hero_id);
    if (exist_hero != null)
    {
        ctx.state.code = errcode.UNLOCK_EXIST_HERO
        return;
    }

    let hero_line = data_table.get('hero', hero_id);
    if (hero_line == null)
    {
        ctx.state.code = errcode.HERO_NOT_EXIST;
        return;
    }

    let fragmentid = hero_line.fragmentid;
    let need_fragment_num = hero_line.need_fragment_num;

    // 消耗体力
    if (!player.unlock_hero(hero_id, fragmentid, need_fragment_num))
    {
        ctx.state.code = errcode.NEED_MORE_POWER;
        return;
    }

    ctx.state.code = errcode.OK;
    ctx.state.data = {};

    console.log( util.format('unlock hero, uid=%d, hero_id=%d', 
        acc_obj.get_uid(), hero_id));
}
