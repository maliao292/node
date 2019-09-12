 // 引入 http模块
 var http = require('http');
http.createServer(function (req,res) {
    //
    console.log('SUCCESS');
    res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
    res.write(`<head><meta charset='utf-8'></meta></head>`);
    res.write('你好 nodejs');
    res.end()
}).listen(8001);
