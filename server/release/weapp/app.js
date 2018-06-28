const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const wx_config = require('../config/wx_config')
const ds_db = require('./game/ds_db');
const account_mgr = require('./game/ds_account_mgr');
const cors = require('koa-cors');
const data_table = require('./dt/data_table');
const dt_config = require('./dt/dt_config');
const dt_control = require('./game/ds_control');
const ds_loot = require('./game/ds_loot');

async function main()
{   
    if (!data_table.load_all())
    {
        console.error('load data table fail');
        return;
    }

    if (!dt_config.load())
    {
        console.error('load config fail');
        return;
    }

    ds_loot.init();

    ds_db.connect();  
    
    await account_mgr.init_acc_mgr();

    app.use(async(ctx, next)=> {
        if (dt_control.is_running()) {
            await next();
        }
    })

    app.use(cors());
    
    // 使用响应处理中间件
    app.use(response)
    // 解析请求体
    app.use(bodyParser( {
            enableTypes: ['text', 'json'],
        }
    ))

    // 引入路由分发
    const router = require('./routes')

    app.use(router.routes())

    // 启动程序，监听端口
    app.listen(wx_config.port, () => debug(`listening on port ${wx_config.port}`))
}

main();
