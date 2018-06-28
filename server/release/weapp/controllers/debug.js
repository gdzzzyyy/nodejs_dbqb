const account_mgr = require('../game/ds_account_mgr');
const errcode = require('../def/errcode');

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
    
    let cmd = query.cmd;
    let acc_obj =account_mgr.get_acc_obj(query);
    if (acc_obj == null || cmd == null)
    {
        ctx.state.code = errcode.REQUEST_ARGS_INVALID2;
        return;
    }

    let player = acc_obj.get_player();
    console.log('debug:', cmd);
    switch(cmd)
    {
        case 'add_item':
        {
            if (!player.get_backpack().add_items(query.items))
            {
                ctx.state.code = errcode.ADD_ITEM_FAIL_IDERR;
                return;
            }
            player.set_data_dirty('gm_add');
            ctx.state.code = errcode.OK;
        }
        break;
    }

    console.log('debug:', cmd, 'ok');
}
