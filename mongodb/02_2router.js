var http = require('http');
var app = require('./02_1router');

http.createServer(app).listen(3000);
// 'login' 为 patnname
app.get('/',function (req,res) {
    var msg = '连接数据库测试';
    ejs.renderFile('form.ejs',{msg},function (err,data) {
        res.send(data);
    })
});
 app.get('login',function (req,res) {
    res.end('login2')
});
app.post('add',function (req,res) {
    // 增加数据


    res.end('login2')
});
