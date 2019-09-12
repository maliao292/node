var fs = require('fs');

var readStream = fs.createReadStream('liu.xls');
var str = ''
readStream.on('data',function(chunk){
    str += chunk
});

readStream.on('end',function (chunk) {
    console.log(str);
});

readStream.on('err',function(err){
    console.log(err);
})