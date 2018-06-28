
const datadef = require('./datadef');

const e= {};

e.asset_fields=
[
    datadef.PBD_LEVEL,
    datadef.PBD_DIAMOND,
    datadef.PBD_EXP,
    datadef.PBD_POWER,
    datadef.PBD_POWER_RTIME
];

e.debug_mode = true; // 是否调试模式

e.MAX_POWER = 10; // 满格是10格体力
e.POWER_RECOVER_TIME = 1800; // 体力恢复时间（秒）

module.exports = e;
