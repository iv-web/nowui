module.exports = {
    // 站点相关，项目名
    name: 'now',
    // 离线包发布先关配置
    ars: {
        // 以支持自定义拆单发布
        splitReceipt: [['webserver']]
    },
    // 请求重定向(限用于无线测试环境) 类似fiddler的willow插件的extentions
    extentions: [
        // {'match': 'http://qun.qq.com/qunpay/','action': 'wired.alloyproxy.com:8003'}
    ],
    distConfig: {
          // 设置环境变量
          environmentVariables: {
              //测试部署使用，NODE_ENV=development
              'development': 'jb',
              //发布部署使用，NODE_ENV=production
              'production': 'jb',
          }
    }
};

