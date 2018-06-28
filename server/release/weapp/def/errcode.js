
const e={}

// OK
e.OK = 0;

// 以下内容为错误，需要仔细检查请求的参数
e.INTERNAL_ERROR = -50; // 服务器内部错误
e.REQUEST_CONTEXT_INVALID4 = -64; // 错误的上下文内容请求
e.REQUEST_CONTEXT_INVALID3 = -63; // 错误的上下文内容请求
e.REQUEST_CONTEXT_INVALID2 = -62; // 错误的上下文内容请求
e.REQUEST_CONTEXT_INVALID = -61;  // 错误的上下文内容请求
e.REQUEST_ARGS_INVALID = -50; // 错误的请求参数

// 以下内容为严重错误，游戏无法进行下去
e.DATABASE_ERROR = -1001; // 数据库错误
e.REQUEST_WECHAR_FAIL = -1002; // 微信请求失败

// 以下内容为正常的业务警告，游戏可正常继续
e.NEED_MORE_POWER = 1001; // 体力不足
e.STAGE_LOCK = 1002; // 关卡未开放
e.HERO_CONFIG_ERROR = 1003; //英雄配置不合法
e.HERO_NOT_EXIST = 1004; // 英雄不存在
e.STAGE_ID_INVALID = 1005; // 关卡ID非法
e.HERO_CFG_LVLUP_FAIL= 1006; // 使用当前配置，无法进行升级
e.NEED_MORE_ASSET = 1007; // 需要更多的资产道具
e.ADD_ITEM_FAIL_IDERR = 1008; // 添加道具失败，道具ID非法
e.BATTLE_INS_ID_INVALID1 = 2001; // 关卡实例ID非法
e.BATTLE_INS_ID_INVALID2 = 2002; // 之前未在关卡内，请求失败

e.UNLOCK_EXIST_HERO = 3001; // 不能解锁已存在的英雄
e.UNLOCK_NEED_MORE_FRAGMENT = 3002; // 碎片不足

e.REQUEST_SO_FAST = 4001; // 请求过快

module.exports= e;
