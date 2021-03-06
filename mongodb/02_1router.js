// 暴露的模块
var url = require('url');
var Server = function () {
    var G = this;
    G.get = {};
    G.post = {};

    var app = function (req, res) {
        var reqPath = url.parse(req.url, true).pathname.substr(1);
        // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        // res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        // res.setHeader('X-Powered-By', '3.2.1');
        if(reqPath === 'favicon.ico') return;
        /* 获取路由 method */
        var methods = req.method.toLowerCase();
        if (G[methods][reqPath]) {
            G[methods][reqPath](req, res)
        }else{
            res.end('路由不存在')
        }
    };

    app.get = function (string, callback) {
        G['get'][string] = callback;
    };
    app.post = function (string, callback) {
        G['post'][string] = callback;
    };
    return app;
};

module.exports = Server();