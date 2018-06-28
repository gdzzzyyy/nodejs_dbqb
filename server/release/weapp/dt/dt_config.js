const data_table = require('../dt/data_table');

// 建新号时送的英雄列表
const init_hero_cfg =
{
    '1001':
    {
        level : 0
    },

    '1003': 
    {
        level: 0
    }
}

class dt_config
{
    _load_stages()
    {
        let stage_ids = [];
        data_table.for_each_line('stagelist', function(line)
        {
            stage_ids.push(line.id);
        });

        stage_ids.sort( function(a,b)
        {
            return a > b ? 1 : -1;
        });

        this.stage_ids= stage_ids;
    }

    load()
    {
        this._load_stages();
        console.log('stage ids:', this.stage_ids);
        return true;
    }

    get_first_hero_config()
    {
        return init_hero_cfg;
    }

    get_first_stage_id()
    {
        return this.stage_ids[0];
    }

    get_next_stage_id(id)
    {
        // 如果是偶数关，则没有下一关！！！
        if (id % 2 == 0)
        {
            return 0;
        }

        for(let i=0; i<this.stage_ids.length-1; ++i)
        {
            let cid = this.stage_ids[i];
            if (cid == id)
            {
                return this.stage_ids[i+2];
            }
        }
        
        return 0;
    }
}

module.exports = new dt_config();
