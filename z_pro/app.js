let express = require('express');
let app = new express();
let url = require('url');
let admin = require('./routes/admin/');
let index = require('./routes/index');
let product = require('./routes/product');
/* 中间件 express-session */
let session = require('express-session');
var DB = require('./model/db.js');

/* MD5 */
let md5 = require('md5-node');
/* multiparty */
let multiparty = require('multiparty');
/* ejs */
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use('/upload', express.static('upload'));


/*body-parser*/  // 不适合图片上传
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(session({
    secret: 'mario',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 10 * 30
    },
    rolling: true
}));
app.use(function (req, res, next) {
    let uesrurl = url.parse(req.url).pathname;
    if (uesrurl === '/admin/login' || uesrurl === '/admin/dologin') {
        next()
    } else {
        if (req.session.userinfo && req.session.userinfo.username !== '') {
            next();
        } else {
            res.redirect('/admin/login')
        }
    }
});


app.use('/',index);
app.use('/admin',admin);
app.use('/product',product);

app.listen(8000, '127.0.0.1');