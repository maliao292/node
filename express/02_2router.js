var http = require('http');
var app = require('./02_1router');
http.createServer(app).listen(3000);
// 'login' 为 patnname
 app.get('login',function (req,res) {
    res.end('login2')
});