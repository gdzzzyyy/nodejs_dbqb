const ds_control = require('../game/ds_control');
const errcode = require('../def/errcode');
const ds_datasync = require('../game/ds_datasync');

module.exports = async (ctx, next) =>
{
    let query = ctx.request.query;
    let cmd = query.cmd;
    if (cmd == null)
    {
        ctx.state.code = errcode.REQUEST_ARGS_INVALID;
        return;
    }

    console.log('gm:', cmd);

    switch(cmd)
    {
        case 'shutdown': //  停机
        {
            console.log('game shutdown begin .. ');
            ds_control.shutdown();
            await ds_datasync.wait_sync_finish();
            console.log('game shutdown end .. ');
            process.exit(101);
        }
        break;
    }

    console.log('gm:', cmd, 'ok');
}
