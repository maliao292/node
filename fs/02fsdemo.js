// 判断服务器上有没有upload 目录，没有创建目录（图片上传存储图片）
var fs = require('fs');
var http = require('http');
http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});

// fs.stat('upload',function(err,data){
//     if(err||!data.isDirectory()){
//         fs.mkdir('upload',function(err,data){
//             if(err){
//                 console.log(err);
//                 return false;
//             }
//             console.log('创建upload成功')
//             fs.writeFile('upload/index.css',`*{margin:0}`,function(err,data){
//                 if(err){
//                     console.log('写入文件index.css失败');
//                     return false;
//                 }
//                 console.log('写入index.css成功');
//             })
//         });
//         return false;
//     }else{
//         console.log('upload存在');
//         fs.writeFile('upload/index.css',`*{margin:0}`,function(err,data){
//             if(err){
//                 console.log('写入文件index.css失败');
//                 return false;
//             }
//             console.log('写入index.css成功');
//         })
//     }
//     console.log(data.isDirectory());
// });

/* 找出html目录下所有文件，然后打印 */


var showArr = [];
function Dir(beginDir) {
    this.beginDir = beginDir;
    let thisDir = beginDir;
    this.eachdir = function (namedir = this.beginDir) {
        if(namedir.length === 0){
            showArr.push('目录：' + namedir);
            console.log(showArr)
        }
        fs.readdir(namedir, (err, datas) => {  // 读取目录下的 目录和文件
            if (err) {
                console.log('循环失败')
            }
            datas = datas.map((v, i) => {
                return namedir + '/' + v;
            });
            datas.forEach((v, i) => {
                ((v) => {
                    fs.stat(v, (err, data) => { // 判断 是文件还是目录
                        if (data.isDirectory()) {    // 是目录
                            showArr.push('目录：' + v);
                            this.eachdir(v)
                            //console.log(v + '是目录！');
                        } else {  // 是文件
                            thisDir = this.beginDir;
                            showArr.push('文件：' + v);
                           // console.log(v + '是文件！');
                        }


                    });
                })(v);
            })
        });
    }
    setTimeout(function () {
        console.log(showArr);
        res.write(JSON.stringify(showArr));
        res.end()
    },2000)
}

var dirs = new Dir('html');
dirs.eachdir();
}).listen(8088);