/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})


const controllers = require('../controllers')
/*
// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')
// --- 登录与授权 Demo --- //
// 登录接口
router.get('/v2login', authorizationMiddleware, controllers.v2login)
// 用户信息接口（可以用来验证登录态）
router.get('/v2user', validationMiddleware, controllers.v2user);
// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/v2upload', controllers.v2upload)
// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/v2tunnel', controllers.v2tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/v2tunnel', controllers.v2tunnel.post)
// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/v2message', controllers.v2message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/v2message', controllers.v2message.post)
*/

router.post('/login_wx', controllers.login_wx);
router.post('/login_dev', controllers.login_dev);
router.post('/get_user_info', controllers.get_user_info);
router.post('/battle_start', controllers.battle_start);
router.post('/battle_end', controllers.battle_end);
router.post('/hero_level_up', controllers.hero_level_up);
router.post('/debug', controllers.debug);
router.post('/report_wx', controllers.report_wx);
router.post('/unlock_hero', controllers.unlock_hero);

router.get('/gm', controllers.gm);

module.exports = router
