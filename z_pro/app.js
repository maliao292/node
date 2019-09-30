let express = require('express');
let url = require('url');
let app = new express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
/* MD5 */
let md5 = require('md5-node');
/*body-parser*/
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



/* 中间件 express-session */
let session = require('express-session');
app.use(session({
    secret:'mario',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*10*30
    },
    rolling:true
}));

app.use(function (req,res,next) {
    let uesrurl = url.parse(req.url).pathname;
    if(uesrurl === '/login'|| uesrurl === '/dologin'){
        next()
    }else {
        if (req.session.userinfo&&req.session.userinfo.username!==''){
            next();
        }else{
            res.redirect('/login')

        }
    }

});
// 登录
app.get('/login', function (req, res) {
    let msg = '你好吗';
    let uesrquery = url.parse(req.url,true).query;
    res.render('login', {msg});
});

// 退出登录
app.get('/loginOut', function (req, res) {
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
        }else{
            res.redirect('/login')
        }
    });

});
app.post('/dologin', function (req, res) {
    MongoClient.connect(Dburl, function (err, db) {
        if (err) {
            console.log('连接数据失败', err)
        } else {
// 方法二
            let msg = req.body;
            let {username,password} = msg;
            app.locals['username'] = username;  // 全局
            let result = db.collection('user').find({username,password:md5(password)});

            result.toArray(function (err,data) {  // 遍历数据的方法
                db.close();
                if(data.length === 0){
                    //   res.send({msg:1})
                    res.redirect('/login')
                }else{
                    req.session.userinfo = data[0];
                    res.redirect('/product')

                }
            });
        }
    })

});
// 商品
app.get('/product', function (req, res) {
    // 连接数据库
    var list = [];
    MongoClient.connect(Dburl,function (err,db) {
       let result = db.collection('product').find();
       result.toArray(function (err,data) {
          if(err){
              console.log('查询product数据失败')
          }else{
              console.log(data);
              list = data;
              res.render('product',{list});
          }
       });

    });

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

app.use(function (req, res) {
    res.redirect('product');
});
app.listen(8000, '127.0.0.1');