var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
/* 自定义模块 */
var mime = require('./model.js');
http.createServer(function (req, res) {
    // res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    var paths = url.parse(req.url, true);
    if (paths.pathname === '/favicon.ico') {
        return false;
    }
    var reqUrlType = path.extname(req.url);
    fs.readFile('../static' + paths.pathname, function (err, data) {
        if (err) {
            fs.readFile('../static/404.html', function (err, data404) {
                res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
                res.write(data404);
                res.end();
            });
            return;
        }else{
             mime(reqUrlType).then((res)=>{
                res.writeHead(200, {"Content-Type": res+";charset=utf-8"});
            })

        }
        res.write(data);
        res.end();
    });
}).listen(292);

