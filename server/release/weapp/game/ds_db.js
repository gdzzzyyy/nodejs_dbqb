const mysql = require('mysql');
const dbcfg = require('../../config/db_cfg');

class ds_db
{
    constructor()
    {
    }

    get query()
    {
        return this.fQuery;
    }

    connect()
    {
        console.log('mysql connect...');

        this.pool = mysql.createPool(dbcfg);

        let self = this;
        this.fQuery = function(sql, values) 
        {
            return new Promise( (resolve, reject) => 
            {
                self.pool.getConnection((e1, conn) =>
                {
                    if (e1)
                    {
                        return reject(e1);
                    }

                    conn.query(sql, values, (e2, rows) =>
                    {
                        if (e2)
                        {
                            reject(e2);
                        }
                        else
                        {
                            resolve(rows);
                        }

                        conn.release();
                    })
                })   
            })
        }
    }
}

module.exports = new ds_db();

