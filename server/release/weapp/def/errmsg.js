const e = require('./errcode');
const s = {}

s[e.OK] = "成功";

s[e.INTERNAL_ERROR] = "服务器内部错误";
s[e.REQUEST_CONTEXT_INVALID4] = "错误的上下文内容请求4";
s[e.REQUEST_CONTEXT_INVALID3] = "错误的上下文内容请求3";
s[e.REQUEST_CONTEXT_INVALID2] = "错误的上下文内容请求2";
s[e.REQUEST_CONTEXT_INVALID] = "错误的上下文内容请求1";
s[e.REQUEST_ARGS_INVALID] = "错误的请求参数";

s[e.DATABASE_ERROR] = "严重错误，服务器数据异常";
s[e.REQUEST_WECHAR_FAI] = "严重错误，服务器微信请求失败";

s[e.NEED_MORE_POWER] = "体力不足！";
s[e.STAGE_LOCK] = "关卡未开放！";
s[e.HERO_CONFIG_ERROR] = "英雄配置不合法！";
s[e.HERO_NOT_EXIST] = "英雄不存在！";
s[e.STAGE_ID_INVALID] = "关卡ID非法！";
s[e.HERO_CFG_LVLUP_FAIL] = "使用当前配置，无法进行升级！";
s[e.NEED_MORE_ASSET] = "资源不足！";
s[e.ADD_ITEM_FAIL_IDERR] = "添加道具失败，道具ID非法";
s[e.BATTLE_INS_ID_INVALID1] = "关卡实例ID非法!";
s[e.BATTLE_INS_ID_INVALID2] = "未在关卡内，请求失败!";

s[e.UNLOCK_EXIST_HERO] = "不能解锁已存在的英雄";
s[e.UNLOCK_NEED_MORE_FRAGMENT] = "英雄碎片不足";

s[e.REQUEST_SO_FAST] = "请求速度过快，请慢一点";

module.exports = function(code)
{
    return s[code] || code.toString();
}
