const data_table = require('../dt/data_table');


class ds_loot
{
    // 创建一个掉落物
    create_one_loot(lines, max_prob)
    {
        let hit = Math.random() * max_prob;
        let total = 0;
        for(let idx in lines)
        {
            let line = lines[idx]
            let left = total;
            let right= total+ line.prob;
            if (hit >= left && hit <= right)
            {
                let type_id = line.itemTypeId;
                let min = line.min;
                let max = line.max;
                let value = Math.floor( min + ( ( max - min) * Math.random() ) );
                return { "id" : type_id, "count": value };
            }
            total += line.prob;
        }
        console.log('create_one_loot exception!', lines, max_prob);
    }

    // 计算掉落物信息
    calc_loot_items(loot_pack_id, loot_drop_num)
    {
        let output = {};
        let pack_config = this.pack_list[loot_pack_id];
        if (pack_config == null)
        {
            console.error('pack_id err1 ', loot_pack_id);
            return output;
        }
        
        let lines = pack_config.lines;
        if (lines.length == 0)
        {
            console.error('pack id err2 ', loot_pack_id);
            return output;
        }

        let fixed = pack_config.fixed;
        for(let i in fixed)
        {
            let line = fixed[i];
            let min = line.min;
            let max = line.max;
            let value = Math.floor( min + ( ( max - min) * Math.random() ) );
            let item_id = line.itemTypeId;
            output[item_id] = (output[item_id] || 0) + value;
        }

        for (let i=0; i<loot_drop_num; ++i)
        {
            let item = this.create_one_loot(lines, pack_config.max_prob);
            if (item != null)
            {
                output[item.id] = (output[item.id] || 0) + item.count;
            }
        }

        return output;
    }

    _load_packids()
    {
        let pack_ids = {};
        data_table.for_each_clone_line('lootpack', function(line)
        {
            let pack_id = line.packId;
            pack_ids[pack_id]= pack_ids[pack_id] || [];
            pack_ids[pack_id].push(line);
        })

        let plist = {};
        for(let pack_id in pack_ids)
        {
            let cfg = pack_ids[pack_id];
            let lines = [];
            let fixed = [];
            let max_prob = 0;
            for(let i in cfg)
            {
                let line = cfg[i];
                let item = { 'prob': line.prob, 'min': line.min, 'max': line.max, 'itemTypeId': line.itemTypeId };
                if (line.prob <= 0) // 必掉物品
                {
                    fixed.push(item);
                }
                else
                {
                    lines.push(item);
                    max_prob += line.prob;
                }
            }

            plist[pack_id] = 
            {
                'lines' : lines,
                'fixed' : fixed,
                'max_prob': max_prob
            }
        }

        this.pack_list = plist;
    }

    init()
    {
        this._load_packids();
    }
}

module.exports = new ds_loot;
