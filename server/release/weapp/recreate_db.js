const ds_db = require('./game/ds_db');

const ENGINE_SETTING = " ENGINE = innodb DEFAULT CHARACTER SET = utf8";

const sqls=
[
    //  玩家帐号数据
    'DROP TABLE if exists `account`',
    'CREATE TABLE if not exists `account` ( `uid` int unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,`openid` varchar (64) NOT NULL ,`create_time` int unsigned not null ,`last_login_time` int unsigned not null, `login_count` int unsigned not null )' + ENGINE_SETTING,

    // 玩家游戏数据
    'DROP TABLE if exists `player_data`',
    'CREATE TABLE if not exists `player_data` ( `uid` int unsigned NOT NULL PRIMARY KEY, `fps_reward` varchar(1024) NOT NULL, `backpack` varchar(8192) NOT NULL, `top_stage_id` int unsigned not null, `heros` varchar(2048) NOT NULL, `basedata` varchar (256) NOT NULL )' + ENGINE_SETTING,
	
    // 微信用户信息
    'DROP TABLE if exists `wx_acc`',
    'CREATE TABLE if not exists `wx_acc` (`uid` int unsigned not null primary key, `nickname` varchar(32) not null, `gender` int unsigned not null, `city` varchar(32) not null, `province` varchar(32) not null, `country` varchar(16) not null)' + ENGINE_SETTING,
];

async function main()
{   
    ds_db.connect();

    for(let i in sqls)
    {
        await ds_db.query(sqls[i]);
    }

    process.exit(0);
}

main();