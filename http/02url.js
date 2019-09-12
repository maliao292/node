var http = require('http');
var url = require('url');
http.createServer(function (require, response) {
    response.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
   // console.log(require.url);

    if (require.url != '/favicon.ico'){
        console.log(url.parse(require.url, true).query);
    }
    response.end();
}).listen(8003);
