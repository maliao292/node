let express = require('express');
let url = require('url');
let app = new express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.get('/', function (req, res) {
    let msg = '你好';
    res.send('index');
});
let willpath = '';
/*body-parser*/
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* 连接数据库 */
let MongoClient = require('mongodb').MongoClient;
let Dburl = 'mongodb://127.0.0.1:27017/z_pro';


app.use(function (req,res,next) {
   let uesrurl = url.parse(req.url).pathname;
    console.log(uesrurl);
    let uname = uesrurl.substr(1);
    if(uesrurl === '/login'|| uesrurl === '/dologin'){
        next()
    }else {
        if (session.userinfo&&session.userinfo.username!==''){
            next();
        }else{
        //    res.redirect('/login')

             res.redirect('/login?redirect='+uname)
        }
    }

});

/* 中间件 express-session */
let session = require('express-session');
app.use(session({
    secret:'mario',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*10
    },
    rolling:true
}));

// 登录

app.get('/login', function (req, res) {
    let msg = '你好吗';
    let uesrquery = url.parse(req.url,true).query;
    willpath = uesrquery.redirect||'product';
    res.render('login', {msg});
});
app.post('/dologin', function (req, res) {
    MongoClient.connect(Dburl, function (err, db) {
        if (err) {
            console.log('连接数据失败', err)
        } else {
// 方法二
            let msg = req.body;
            let {username,password} = msg;
            app.locals['username'] = username;
            let result = db.collection('user').find({username,password});

            result.toArray(function (err,data) {  // 遍历数据的方法
                db.close();
                if(data.length === 0){
                 //   res.send({msg:1})
                   res.send('<script>location.href="/login";alert("登陆失败");</script>')
                }else{
                    session.userinfo = data[0];
                    // res.redirect('/product')
                    console.log(willpath);
                    res.redirect('/'+willpath)

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