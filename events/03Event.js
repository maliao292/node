var http = require('http');
var router = require('./03_1router');
http.createServer(function (req, res) {
    router.statics(req, res,'../static')
}).listen(292);

/* 备注 使用nodejs 广播功能  返回数据次数有问题  callback 不存在 */
