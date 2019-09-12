var http = require('http');
var config = require('./config.js');
var tools = require('./03_2tools');

var app = http.createServer(function(requier,res){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.write('你好九月');
    res.write(config.str);


    console.log(tools.add(5,9));


    res.end();
})
app.listen(886,'127.0.0.1');