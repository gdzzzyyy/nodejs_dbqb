const http = require('axios');
const errcode = require('../def/errcode');
const account_mgr = require('../game/ds_account_mgr');
const wx_config = require('../../config/wx_config');
const util = require('util');

const WX_J2CODE_URL = 'https://api.weixin.qq.com/sns/jscode2session';

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


    let code = query.code;
    let encryptedData = query.encryptedData;
    if (code == null || encryptedData == null) {
        ctx.state.code = errcode.REQUEST_ARGS_INVALID;
        console.log('invalid login data, code=null or encryptedData= null!');
        return;
    }

    const [skey, openid] = await http({
        url: WX_J2CODE_URL,
        method: 'GET',
        params: {
            appid: wx_config.appId,
            secret: wx_config.appSecret,
            js_code: code,
            grant_type: 'authorization_code'
        }
    }).then(res =>
    {
        let key = res.data.session_key;
        let id = res.data.openid;
        return [key, id];
    })

    if (skey == null || openid == null) {
        ctx.state.code = errcode.REQUEST_WECHAR_FAIL;
        console.log('get jscode2session fail, code=%s', code);
        return;
    }

    let acc = await account_mgr.login_wx_openid( { 'skey': skey, 'openid': openid, 'code': code } )
    if (acc == null)
    {
        ctx.state.code = errcode.INTERNAL_ERROR;
        console.log('login_wx_openid fail', openid, code);
        return;
    }

    let uid = acc.get_uid();
    let sid = acc.get_last_sid();
    let login_count = acc.get_login_count();
    console.log('login_wx ok, openid=%s, sid=%s, uid=%d', openid, sid, uid);       

    ctx.state.data = { 'sid': sid, 'login_count': login_count, 'uid': uid };
    ctx.state.code = errcode.OK;
}
