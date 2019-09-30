let express = require('express');
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

// 登录
app.get('/login', function (req, res) {
    let msg = '你好吗';
    let uesrquery = url.parse(req.url,true).query;
    res.render('login', {msg});
});
