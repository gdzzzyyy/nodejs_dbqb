const account_mgr = require('../game/ds_account_mgr');
const errcode = require('../def/errcode');
const util = require('util');
const ds_db = require('../game/ds_db');

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
    if (acc_obj == null)
    {
        ctx.state.code = errcode.REQUEST_CONTEXT_INVALID3;
        return;
    }

    let gender = parseInt(query.gender || "1");
    if (!Number.isInteger(gender))
    {
        gender = 1;
    }

    let nickname = query.nickname || "";    
    let city = query.city || "";
    let province = query.province || "";
    let country = query.country || "";

    let sql = util.format("replace into `wx_acc` (`uid`, `gender`, `nickname`, `city`, `province`, `country`) values (%d, %d, '%s', '%s', '%s', '%s')",
        acc_obj.get_uid(), gender, nickname, city, province, country);

    await ds_db.query(sql, []);    

    let s = util.format("report wx: %d, name=%s", acc_obj.get_uid(), nickname);
    console.log(s);

    ctx.state.code = errcode.OK;
    ctx.state.data = {};
}