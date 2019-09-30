let express = require('express');
let url = require('url');
let app = new express();
app.set('view engine', 'ejs');
app.use(express.static('static'));

/*body-parser*/
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* 连接数据库 */
let MongoClient = require('mongodb').MongoClient;
let Dburl = 'mongodb://127.0.0.1:27017/z_pro';



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
            console.log('30',req.session);
            next();
        }else{
            console.log('32',req.session);
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
    req.session.destory(function (err) {
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
            let result = db.collection('user').find({username,password});

            result.toArray(function (err,data) {  // 遍历数据的方法
                db.close();
                if(data.length === 0){
                    //   res.send({msg:1})
                    res.redirect('/login')
                }else{
                    req.session.userinfo = data[0];
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
// 退出登录
// app.get('/loginOut', function (req, res) {
//     req.session.destroy(function (err) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.redirect('/login')
//         }
//     })
// });
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

app.use(function (req, res) {
    res.redirect('product');
});
app.listen(8000, '127.0.0.1');