let express = require('express');
let app = new express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.get('/', function (req, res) {
    let msg = '你好';
    res.send('index');
});

/*body-parser*/
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* 连接数据库 */
let MongoClient = require('mongodb').MongoClient;
let Dburl = 'mongodb://127.0.0.1:27017/z_pro';
app.use(function (req,res,next) {
    next();
});


// 登录
app.get('/login', function (req, res) {
    let msg = '你好吗';
    res.render('login', {msg});
});
app.post('/dologin', function (req, res) {

    MongoClient.connect(Dburl, function (err, db) {
        if (err) {
            console.log('连接数据失败', err)
        } else {
// 方法二
            let msg = req.body;
            console.log(msg);
            let {username,password} = msg;
            let result = db.collection('user').find({username,password});
            result.toArray(function (err,data) {  // 遍历数据的方法
                console.log(data);
                db.close();
                if(data.length === 0){
                 //   res.send({msg:1})
                   res.send('<script>location.href="/login";alert("登陆失败");</script>')
                }else{
                    res.redirect('/product')
                }
            })

            /*   方法一、
                let list = [];
                   let msg = req.body;
                   let {username,password} = msg;
                   let result = db.collection('user').find({username});
                   result.each(function (error,doc) {
                       if(error){
                           console.log('查询user数据失败',err)
                       }else{
                           if(doc != null){
                               list.push(doc)
                           }else {
                               let isNext = '0';
                               if(list[0].password === password){
                                   isNext = '1';
                               }else{
                                   isNext = '0';
                               }
                               res.send(isNext);
                           }
                       }
                   });*/

        }
    })

});
// 商品
app.get('/product', function (req, res) {
    res.render('product');
});
// 商品 新增
app.get('/productadd', function (req, res) {
    res.render('productadd');
});
// 商品 编辑
app.get('/productedit', function (req, res) {
    res.render('productedit');
});
// 商品 删除
app.get('/productdelete', function (req, res) {
    res.send('productdelete');
});
app.listen(8000, '127.0.0.1');