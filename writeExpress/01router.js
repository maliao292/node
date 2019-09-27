var  http = require('http');
var url = require('url');
var G = {};
var app = function (req,res) {
    var reqPath = url.parse(req.url,true).pathname.substr(1);
    console.log(reqPath);
    if(G[reqPath]){
        G[reqPath](req,res)
    }else{
        res.end('路由不存在')
    }
};
app.get = function (string,callback) {
    G[string] = callback

}
// 有请求 会触发app方法
http.createServer(app).listen(3000);

// 注册 login 这个路由
app.get('login',function (req,res) {
    console.log('login')
});