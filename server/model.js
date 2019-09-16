var fs = require('fs');

function getext(extname) {
    // return new Promise(function(resolve, reject){
    //     fs.readFile('../static/mime.json',function (err,data) {
    //         var filesTypeList =  JSON.parse(data.toString());
    //         resolve(filesTypeList[extname]);
    //     });
    // });
    var datas = fs.readFileSync('../static/mime.json');
    var filesTypeList =  JSON.parse(datas.toString());
    return filesTypeList[extname] || 'text/html';
}

module.exports = getext;