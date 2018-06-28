const data_table = require('../dt/data_table');
const util = require('util');

class ds_backpack
{
    constructor()
    {
    }

    init_backpack()
    {
        this.items = {};
        this.item_table = data_table.get_table('prop');
    }

    set_items(data)
    {
        this.items = {};
        for(let i in data)
        {
            this.items[i] = data[i];
        }
    }

    get_all_items()
    {
        return this.items;
    }

    add_item(id, count)
    {
        this.items[id] = ( this.items[id] || 0) + count;
    }

    // 输入参数： { '1001': 20,  '2001': 30 }
    add_items(props)
    {
        for(let id in props)
        {
            if ( null == this.item_table.get(id))
            {
                return false;
            }
        }
        
        for(let id in props)
        {
            this.add_item(id, props[id]);
        }
        return true;
    }

    cosume_items(cosumes)
    {
        for(let id in cosumes)
        {
            let has_count = this.items[id] || 0
            let need_count = cosumes[id];
            if (need_count <= 0 || has_count == 0 || need_count > has_count)
            {
                console.log( util.format('cosume %s fail, need %d, has %d', id, need_count, has_count));
                return false;
            }
        }

        for(let id in cosumes)
        {
            this.items[id] -= (cosumes[id]);
        }
        return true;
    }
}

module.exports = ds_backpack;
