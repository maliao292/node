var http = require('http');
var text = require('bar');
var app = http.createServer(function (req,res) {
    console.log(text)
});
app.listen(866,'127.0.0.1');