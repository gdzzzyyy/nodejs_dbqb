const ds_db = require('./game/ds_db');

const clear_db_sql=
[
    'delete from `account`',
    'delete from `player_data`',
];

async function main()
{   
    ds_db.connect();

    for(let i in clear_db_sql)
    {
        await ds_db.query(clear_db_sql[i]);
    }

    process.exit();
}

main();
