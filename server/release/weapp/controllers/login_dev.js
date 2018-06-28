const util = require('util');
const errcode = require('../def/errcode');
const account_mgr = require('../game/ds_account_mgr');

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

    let suid = query.uid;
    if (suid == null) {
        ctx.state.code = errcode.REQUEST_ARGS_INVALID;
        console.log('invalid login data, uid= null!');
        return;
    }

    let uid = parseInt(suid);
    let acc = await account_mgr.login_dev( { 'uid': uid } )
    if (acc == null)
    {
        ctx.state.code = errcode.INTERNAL_ERROR;
        console.log( util.format('login_dev fail, uid=%d', uid));
        return;
    }

    let login_count = acc.get_login_count();
    let sid = acc.get_last_sid();
    console.log('login_dev ok, uid=%d, sid=%s', uid, sid);   
    ctx.state.data = { 'sid': sid, 'uid': uid, 'login_count': login_count };
    ctx.state.code = errcode.OK;
}