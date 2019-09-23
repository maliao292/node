var http = require('http');
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    var quer = url.parse(req.url, true).pathname;
    if (quer === '/favicon.ico') {
        return;
    }
    // console.log(quer);
    if (quer === '/favicon.ico') {
        return;
    }
    if (quer === '/login') {
        ejs.renderFile('form.ejs', {}, function (err, data) {
            res.end(data)
        })
    } else if (quer === '/dologin') { // 执行登陆
        // ejs.renderFile('../ejs/dologin.ejs', {}, function (err,data) {
        //     res.end(data)
        // })
        var poststr = '';
        req.on('data', function (chunk) {
            poststr += chunk;
        });
        req.on('end', function (data) {
            fs.appendFile('../static/logindata.json',poststr,function (err,data) {
                if(err){
                    console.log(err);
                    return
                }
                console.log('写入数据成功');
            });
            res.end("<script>alert('登录成功');window.location.href='https://www.baidu.com'</script>>")

        })
    } else {
        ejs.renderFile('../ejs/1.ejs', {}, function (err, data) {
            res.end(data)
        })
    }
});
server.listen(8888);