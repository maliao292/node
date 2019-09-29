let express = require('express');
let app = new express();
let session = require('express-session');

/* 连接服务器模块 */
let MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'mario',  //生成加密字符串的‘秘钥’
    resave: false, // 强制保存
    saveUninitialized: true, // 即使他并没有什么变化
    cookie: {
        maxAge: 1000 * 60 * 30, // 过期时间
    },
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/mario',
        touchAction: 60 * 1000 //
    }),
    rolling: true // 在每次请求时强行设置cookie 将重置cookie 过期时间（默认 false）
}));
app.get('/set', function (req, res) {
    req.session.userInfo = '李四';
    res.send('登录成功')
});

app.get('/dologin', function (req, res) {
    req.session.userInfo = '张三';
    res.send('登录成功')
});
app.get('/home', function (req, res) {
    if (req.session.userInfo) {
        res.send('你好，' + req.session.userInfo + '欢迎回来')
    } else {
        res.send('未登录');
    }
});

// 退出登录 销毁session
app.get('/logOut', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('已经退出')
        }
    })
});
app.get('/', function (req, res) {
    if (req.session.userInfo) {
        res.send('你好，' + req.session.userInfo + '欢迎回来')
    } else {
        res.send('未登录');
    }
});


app.listen(8888, '127.0.0.1');
