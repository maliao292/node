var http = require('http');
var url = require('url');
var ejs = require('ejs');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    var quer = url.parse(req.url, true).pathname;
    if (quer === '/favicon.ico') {
        return;
    }
    if (quer === '/login') {
        console.log(url.parse(req.url, true).pathname);
        var datas = '这是模拟数据';
        var list = ['111', '222', '333'];
        ejs.renderFile('login.ejs', {msg: datas, list}, function (err, data) {
            res.end(data)
        })
    }
    // res.end(url.parse(req.url, true).pathname);
});
server.listen(8888);