var fs = require('fs');

var data = '123456';
var writeStream = fs.createWriteStream('liu.xls');

for (var i = 1;i<=1000;i++)
writeStream.write(i+" ",'utf-8');
writeStream.end();
writeStream.on('finish',function () {
    console.log('写入完成');
})

writeStream.on('err',function () {
    console.log('错误');
})