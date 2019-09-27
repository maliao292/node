// var ejs = require('ejs');  // 不需要
var express = require('express');
var app = new express();
// 配置express的ejs模板引擎
app.set('view engine','ejs');
 // 文件重定向 （默认在本页面的views 文件夹）
app.set('views','../static');

// 静态文件托管(内置中间件)
app.use(express.static('../static'));

/* 中间件 */
// 应用级中间件
// 表示匹配任何路由
app.use(function (req,res,next) {
    // next() 继续匹配
    console.log(new Date());
    next();
});
// 表示匹配指定路由
app.use('/new',function (req,res,next) {
    
});

/*第三方中间件（也叫模块）*/
var bodyParser = require('body-parser');
// 配置bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* 第三方中间件 cookie-parser */
var cookieParser = require('cookie-parser');
app.use(cookieParser('123456'));




app.get('/',function (req,res) {
    res.render('form',{msg:'ejs测试'});
   // res.send('ejs')
});

app.get('/setCookie',function (req,res) {
    res.cookie('username','cookieVal',{maxAge:60000,signed:true }); // 设置cookie maxAge:过期时间
    res.send('设置cookie成功')
});
app.get('/getCookie',function (req,res) {
    var cookieval = req.signedCookies; // 设置cookie maxAge:过期时间
    console.log(cookieval);
    res.send('SUCCESS');
});
app.get('/login',function (req,res) {
    res.render('login',{msg:'ejs测试'});
});

app.post('/userlogin',function (req,res) {
    console.log('req',req.body);
    res.send(req.body)
});
/* 404 */
app.use(function (req,res) {
    res.status(404).send('404')
});
app.listen(8888,'127.0.0.1');
