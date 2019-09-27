var http = require('http');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var urls = 'mongodb://127.0.0.1:27017/mario';
var app = require('./02_1router');
var ejs = require('ejs');
http.createServer(app).listen(3000);

function genID() {
    return ((new Date()).getTime() + Math.random().toString().substr(2, 5));
}


app.get('', function (req, res) {
    var msg = '连接数据库测试';
    ejs.renderFile('form.ejs', {msg}, function (err, data) {
        res.end(data);
    })
});
app.post('add', function (req, res) {
    var postdata = '';
    var obj = {};
    req.on('data', function (chunk) {
        postdata += chunk;
    });
    req.on('end', function () {
        console.log('post接收成功');

        // postdata = postdata.replace('&',',').replace(/=/g,':');

        var postdataarr = postdata.split('&');

        postdataarr.forEach((v, i) => {
            var shotarr = v.split('=');
            obj[shotarr[0]] = shotarr[1];
        });

        console.log(decodeURIComponent(obj['username']));
    });
    // 增加数据
    MongoClient.connect(urls, function (err, db) {
        if (err) {
            console.log('数据库连接失败', err);
        } else {
            console.log('数据库连接成功');
        }
        // db.collection('mariodata').insertOne({username:decodeURIComponent(obj['username'])}, function (err, result) {
        db.collection('mariodata').insertMany([{
            id: genID(),
            username: decodeURIComponent(obj['username'])
        }], function (err, result) {

            if (err) {
                console.log('新增失败')
            } else {
                console.log('成功');
            }
            db.close();
            res.end('login2')

        })
    });


});
/* 编辑 */

app.get('edit', function (req, res) {
    MongoClient.connect(urls, function (err, db) {
        db.collection('mariodata').updateOne({name: 'mm'}, {$set: {'age': 50}}, function (err, data) {

        })
    });
    res.end('修改数据成功')
    db.close();
});

/* 删除 */
app.get('delete', function (req, res) {
    var delquery = url.parse(req.url, true).query;
    console.log(delquery);
    MongoClient.connect(urls, function (err, db) {
        db.collection('mariodata').deleteOne({username: delquery['username']}, function (err, data) {
            if (err) {
                res.end('删除数据失败')
            } else {
                res.end('删除数据成功')
            }
        })
    });

});
/* 查询数据 */
app.get('query',function(req,res){
    MongoClient.connect(urls,function (err,db) {
        if(err){
            console.log('ERR',err);
        }
        var list =[];
        var dataarr = db.collection('mariodata').find();
        dataarr.each(function (err,doc) {
            if(err){
                console.log('ERR')
            } else {
                if(doc != null){
                    list.push(doc)
                }else{
                    console.log('callback('+list+')');
                    // res.end('callback('+list+')');
                    res.end('callback(' + JSON.stringify(list) + ')');
                }
            }
        })
    })
});