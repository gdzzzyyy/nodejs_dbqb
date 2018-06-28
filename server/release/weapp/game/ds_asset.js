
const gamedef = require('../def/gamedef');
const datadef = require('../def/datadef');
const ds_helper = require('./ds_helper');
const util = require('util');
// 经验、钻石、金币、体力、等级、体力恢复时间点
class ds_asset
{
    constructor()
    {
    }

    init_asset()
    {
        this.base_data= {};    
        for(let i in gamedef.asset_fields)
        {
            let f = gamedef.asset_fields[i];
            this.base_data[f] = 0;
        }

        this.base_data[datadef.PBD_POWER] = gamedef.MAX_POWER;
        this.base_data[datadef.PBD_POWER_RTIME] = ds_helper.now_tick();
    }

    sub_power(value, reason)
    {
        this.sync_power_value();
        let point = this.base_data[datadef.PBD_POWER] - value;
        if (point >= 0)
        {           
            this.base_data[datadef.PBD_POWER] = point;  
            // 扣体力，如果之前是“0”，则从现在开始计算
            if (this.base_data[datadef.PBD_POWER_RTIME] == 0)
            {
                this.base_data[datadef.PBD_POWER_RTIME] = ds_helper.now_tick();
            }
            
            let s = util.format('sub power: %d, curr=%d, reason=%s', value, point, reason);
            console.log(s);

            return true;
        }

        return false;
    }

    // 同步体力值
    sync_power_value()
    {
        let etime = ( ds_helper.now_tick() - this.base_data[datadef.PBD_POWER_RTIME] );
        let add_point = Math.floor( etime / gamedef.POWER_RECOVER_TIME );
        let curr_power = this.base_data[datadef.PBD_POWER] + add_point;
        if (curr_power >= gamedef.MAX_POWER)
        {
            this.base_data[datadef.PBD_POWER] = gamedef.MAX_POWER;
            this.base_data[datadef.PBD_POWER_RTIME] = 0;
        }
        else
        {
            this.base_data[datadef.PBD_POWER] = curr_power;
            this.base_data[datadef.PBD_POWER_RTIME] += (gamedef.POWER_RECOVER_TIME * add_point);
        }        
    }

    get_base_data()
    {
        return this.base_data;
    }

    set_asset_value(t,v)
    {
        this.base_data[t] = v;
    }

    add_asset_value(t, v)
    {
        if (v > 0)
        {
            this.base_data[t] += v;
        }
    }

    sub_asset_value(t, v)
    {
        if (v > 0)
        {
            let nv = this.base_data[t] - v;
            nv < 0 ? nv = 0 : 0;
            this.base_data[t] = nv;
        }
    }

    get_asset_value(t)
    {
        return this.base_data[t];
    }
};

module.exports = ds_asset;