const CONF = {
    port: '5757',
    rootPathname: '/data/release/weapp',

    // 微信小游戏 App ID
    appId: 'wx49b432a186108311',

    // 微信小游戏 App Secret
    appSecret: '3dc3fd796ac54c29959eb0b884958e09',

    // 是否使用腾讯云代理登录小游戏
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小游戏解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小游戏 appid
     */
    mysql: {
        host: '172.21.0.11',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'mayday123456',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh',


    serverHost: 'dbqb.maydaygame.cn',
    tunnelServerUrl: 'wss://wkmk6s2l.ws.qcloud.la',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
      // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1256706877',
    qcloudSecretId: 'AKIDjaKtGR7O5ayDLXoN0XvDKoDQZu8g9QVO',
    qcloudSecretKey: 'qobGn9xd7Tedu6D60Tq155ygIk4EC7vY',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000
}

module.exports = CONF
