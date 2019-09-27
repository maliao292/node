var express = require('express');
var app = new express();
app.get('/', function (req, res) {
    res.send('你好Express')
});
app.get('/news', function (req, res) {
    res.send('news模块')
});
app.get('/newscontent/:aid', function (req, res) {
    // 获取动态路由传值
    console.log(req.params);
    res.send('news模块'+req.params.aid)
});
app.get('/product', function (req, res) {
    console.log(req.query);
    res.send('product模块')
});
app.get('/login', function (req, res) {
    res.send('login模块')
});
app.get('/register', function (req, res) {
    res.send('register模块')
});
app.listen(8888);