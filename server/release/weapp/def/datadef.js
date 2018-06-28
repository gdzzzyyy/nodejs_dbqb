const e={}

// 玩家基本数据(PlayerBaseData)(int)， 金币不算资产
e.PBD_LEVEL = 0; // 等级
e.PBD_DIAMOND = 1; // 钻石
e.PBD_EXP = 2; // 经验
e.PBD_POWER = 3; // 体力
e.PBD_POWER_RTIME= 4; // 上一次体力恢复时间点

e.BATTLE_LOSE = 0; // 战斗失败
e.BATTLE_WIN = 1; // 战斗胜利

module.exports= e;
