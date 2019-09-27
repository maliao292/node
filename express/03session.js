var express = require('express');
var session = require('express-session');
var app = new express();

/* 配置express-session */
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true只有在https 才能访问
}));
app.get('/',function (req,res) {
    req.session.userinfo = 'zhangsan';
   res.send('index')
});


app.listen(8888);