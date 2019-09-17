var fs = require('fs');
var url = require('url');
var path = require('path');
var events = require('events');
var EventsEmitter = new events.EventEmitter();
function mime(extname) {  // 获取文件类型
    fs.readFile('../static/mime.json', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var mimes = JSON.parse(data.toString())[extname] || 'text/html';
        EventsEmitter.emit('file_type', mimes);
    })
}

exports.statics = function (req, res, staticpath) {


    if (req.url === '/favicon.ico') {
        return;
    }
    var pathname = url.parse(req.url, true).pathname;
    if (pathname === '/') {
        pathname = '/index.html'
    }
    var extname = path.extname(pathname); // 获取请求后缀  例如 .html .css .js

    mime(extname);
    fs.readFile(staticpath + '/' + pathname, function (err, backdata) {
        if (err) {
            fs.readFile(staticpath + '/404.html', function (err, data404) {
                res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
                res.write(data404);
                res.end();
            });
        } else {
            EventsEmitter.on('file_type', function (edata) {
                console.log(edata);
                res.writeHead(200, {"Content-Type": edata + ";charset=utf-8"});
                res.end(backdata);
            });//
        }
    })

};
