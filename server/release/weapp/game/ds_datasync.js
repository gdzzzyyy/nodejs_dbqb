let sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time)
    })
}

class ds_datasync
{
    constructor()
    {
    }

    init_sync()
    {
        this.dirty_array  = [];
        this.dirty_map  = new Map();
        this.sync_loop();
    }

    async wait_sync_finish()
    {
        while(this.dirty_array.length != 0)
        {
            console.log('wait sync len', this.dirty_array.length);
            await sleep(2000); // 2秒检查一次是否同步完成
        }
    }

    async sync_loop()
    {
        while(true)
        {
            if (this.dirty_array.length == 0)
            {
                await sleep(100); // 100毫秒检查一次
            }
            else
            {
                await this.sync_next();
                await sleep(10);  //  10毫秒同步一次
            }
        }
    }

    async sync_next()
    {
        if (this.dirty_array.length > 0)
        {
            //:TODO  这里有可能会发生存档失败的情况! 
            let player = this.dirty_array.shift();   // not pop();
            this.dirty_map.delete(player.get_uid());
            let succ = await player.sync_data2db();
            if (!succ)
            {
                //:TODO 存档失败,处理方法未知, 有可能DB断了, 写本地文件?
            }
        }
    }

    push(player, reason)
    {
        let uid = player.get_uid();
        if (this.dirty_map.has(uid))
        {
            return;
        }
        
        this.dirty_array.push(player);
        this.dirty_map.set(uid, player);
    }
}

module.exports = new ds_datasync();
