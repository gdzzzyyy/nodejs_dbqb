let DataTableHead= require('./DataTableHead')
let fs = require('fs');

function format_table_url(name)
{
    return "./table/"+ name + ".json";
}

class Table
{
    constructor(config)
    {
        this.line = new config.cls(null);
        this.dt = config.data;
    }

    get(key)
    {
        let d = this.dt[key];
        if (d)
        {
            this.line._assign(d);
            return this.line;
        }
    }
}

class DataTable
{
    load_all()
    {
        this.datableMap={}
        for(let key in DataTableHead)
        {
            let newKey = key;
            let newClass = DataTableHead[key];
            try
            {
                let sdata = fs.readFileSync(format_table_url(newKey));
                if (sdata.length < 3)
                {
                    return false;
                }
                
                if ( sdata[0] === 0xEF && sdata[1] === 0xBB && sdata[2] === 0xBF)
                {
                    sdata = sdata.slice(3);
                }

                let data = JSON.parse(sdata.toString('utf-8'));
                this.datableMap[newKey]= { 'cls': newClass, 'data': data };
            }
            catch(e)
            {
                console.log(e);
                return false;
            }
        }

        return true;
    }

    get(tableName, primaryKey)
	{
        if ( tableName && primaryKey)
		{
            let config = this.datableMap[tableName];
            if (config)
            {
                let line = config.data[primaryKey];
                if (line)
                {
                    return new config.cls(line);
                }
            }
        }
    }
    
    get_table(tableName)
    {
        let config = this.datableMap[tableName];
        if (config)
        {
            return new Table(config);
        }
    }
    
    for_each_line(tableName, callback)
    {
		let config = this.datableMap[tableName];
		if (config)
		{
            let it = new config.cls(null);
            let datas = config.data;
            for(let k in datas)
            {
                it._assign(datas[k]);
                callback(it);
            }
        }
    }

    for_each_clone_line(tableName, callback)
    {
		let config = this.datableMap[tableName];
		if (config)
		{           
            let datas = config.data;
            for(let k in datas)
            {
                callback(new config.cls(datas[k]));
            }
        }
    }

    ge_table_len(tableName)
    {
        let config = this.datableMap[tableName];
		if (config)
		{
            return Object.keys(config.data).length;
        }
        return 0;
    }
}

module.exports = new DataTable();

/**
 * 

// 遍历每一行
DataTable.ForEachLine('prop', function(line)
{
})
// 获得一行数据
let item = DataTable.Get('prop', 7001);
 */