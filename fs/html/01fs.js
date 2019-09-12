var fs = require('fs');

/*
* fs.stat 检测是文件 还是目录(文件夹)
* fs.mkdir  创建目录
* fs.writeFile 写入数据
* fs.appendFile 追加文件
* fs.readdir 读取目录
* fs.readFile 读取文件
* fs.readname 重命名
* */

// fs.stat 检测是文件 还是目录(文件夹)
fs.stat('html', function (err, stats) {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('文件：' + stats.isFile());
    console.log('目录(文件夹)：' + stats.isDirectory());
});

/* fs.mkdir  创建目录
* ***参数：
*  path：  将创建的目录路径
*  mode 目录权限（读写权限）.默认0777
*  callback  回调韩式 ，传递异常参数err
* */
// fs.mkdir('css', function (err) {
//     if (err) {
//         console.log('创建失败:' + err);
//         return false;
//     }
//     console.log('创建成功');
// });

/*fs.writeFile 写入数据
* filename 文件名称
* data  将要写入的内容，可以是字符串或者buffer 数据
* option 参数（数组对象）
*   ** encoding(string) 可选，默认 ‘uf-8’ ,当 data使buffer时，该值应该为 ignored.
*   ** mode (Num) 读写权限 默认 438
*   ** flag (String) 默认 ‘w’
* callback 回调 传递一个异常参数err
* */
// fs.writeFile('css/style.css','*{padding:0;margin:0}',function(err){
//     if(err){
//         console.log('写入失败:'+err);
//         return false;
//     }
//     console.log('写入成功');
// });

/* fs.appendFile 追加文件 */
fs.appendFile('css/style.css', 'span{}', function (err) {
    if (err) {
        console.log('追加失败：' + err);
    }
    console.log('追加成功')
});

/* fs.readFile 读取文件 */
fs.readFile('css/style.css', function (err, filecon) {
    if (err) {
        console.log('读取失败：' + err);
        return false;
    }
    console.log(filecon.toString())  // 16进制转换成 字符串
});


/* fs.readdir 读取目录 */
fs.readdir('html', function (err, dir) {
    if (err) {
        console.log('读取失败');
        return false;
    }
    console.log('读取目录成功：' + dir);
    console.log(dir);

    dir.forEach(function(v,i){
        fs.stat('html/'+v, function (err, stats) {
            if (err) {
                console.log(err);
                return false;
            }
            if(stats.isFile()){
                console.log('html/'+v+'：是文件')
            }else{
                console.log('html/'+v+'：是文件夹')
            }

        });
    })

});

/* fs.readname 重命名 */
fs.rename('html/jquerys.js','css/jquery.js',function (err) {
    if(err){
        console.log('改名失败：',err);
        return false;
    }
    console.log('改名成功');
});
/* fs.unlink删除文件 */
fs.unlink('canvas/canvas.html',function (err) {
    if(err){
        console.log('删除失败');
        return false;
    }
    console.log('删除成功');

});


/* fs.rmdir删除目录 */
fs.rmdir('canvas',function (err) {
 if(err){
     console.log('删除失败');
     return false;
 }
    console.log('删除成功');

});

