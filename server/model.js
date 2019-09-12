var fs = require('fs');

function getext(extname) {
    return new Promise(function(resolve, reject){
        fs.readFile('../static/mime.json',function (err,data) {
            var filesTypeList =  JSON.parse(data.toString());
            resolve(filesTypeList[extname]);
        });
    });

}
module.exports = getext;