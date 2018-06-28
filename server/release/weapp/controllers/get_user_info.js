const account_mgr = require('../game/ds_account_mgr');
const errcode = require('../def/errcode');
const gamedef = require('../def/gamedef');
const ds_helper = require('../game/ds_helper');

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


    let acc_obj = account_mgr.get_acc_obj(query);
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
    
    let player = acc_obj.get_player();

    let cfg = {}
    cfg.prt = gamedef.POWER_RECOVER_TIME;
    cfg.tick = ds_helper.now_tick();

    // 手动同步一次
    player.get_asset().sync_power_value();

    let send = {}
    send.base_asset = player.get_asset().get_base_data();
    send.backpack = player.get_backpack().get_all_items();
    send.top_stage_id = player.get_battle().get_top_stage_id();
    send.heros= player.get_hero_mgr().get_all_hero_client();
    send.cfg = cfg;

    ctx.state.data = send;
    ctx.state.code = errcode.OK;
}
