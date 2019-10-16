let express = require('express');
let url = require('url');
let app = new express();
let fs = require('fs');
/* 导入封装的数据库连接方法 */
var DB = require('./model/db.js');
/* ejs */
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use('/upload', express.static('upload'));

/* MD5 */
let md5 = require('md5-node');
/*body-parser*/  // 不适合图片上传
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* multiparty 图片上传模块*/
let multiparty = require('multiparty');

/* 中间件 express-session */
let session = require('express-session');
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
    if (uesrurl === '/login' || uesrurl === '/dologin') {
        next()
    } else {
        if (req.session.userinfo && req.session.userinfo.username !== '') {
            next();
        } else {
            res.redirect('/login')

        }
    }
});
// 登录
app.get('/login', function (req, res) {
    let msg = '你好吗';
    let uesrquery = url.parse(req.url, true).query;
    res.render('login', {msg});
});

// 退出登录
app.get('/loginOut', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login')
        }
    });
});
app.post('/dologin', function (req, res) {
    let msg = req.body;
    let {username, password} = msg;
    DB.find('user', {username, password: md5(password)}, function (data) {
        if (data.length === 0) {
            res.redirect('/login')
        } else {
            req.session.userinfo = data[0];
            app.locals['username'] = username;  // 全局
            res.redirect('/product')
        }
    });
});


/* 新增商品 */
app.post('/doProductAdd', function (req, res) {
// 获取表单数据
    let form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('添加商品：', err);
            return
        }
        let title = fields.title[0];
        let price = fields.price[0];
        let fee = fields.fee[0];
        let description = fields.description[0];
        let pic = files.pic[0].path;
        let pid = uuid();
        DB.insert('product', {title, price, fee, description, pic, pid}, function (data) {
            res.redirect('/product');
        })
    })
});
// 商品 新增
app.get('/productadd', function (req, res) {
    res.render('productadd');
});
// 商品 编辑页面
app.get('/productedit/:pid', function (req, res) {
    // let pid = req.query.pid;
    let pid = req.params.pid;
    DB.find('product', {pid}, function (data) {
        res.render('productedit', {data: data[0]});
    });
});

// 商品 编辑
app.post('/doCom/:pid', function (req, res) {
    let pid = req.params.pid;
    // let pid = req.query.pid;
    console.log(pid);
    let form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('添加商品：', err);
            return
        }
        let title = fields.title[0];
        let price = fields.price[0];
        let fee = fields.fee[0];
        let description = fields.description[0];
        let pic = files.pic[0].path;
        let change = {};
        if (!!files.pic[0].originalFilename) {
            change = {title, price, fee, description, pic}
        } else {
            change = {title, price, fee, description};
                fs.unlink(pic,function (err,data) {
                    if(err){
                        console.log('删除失败');
                        return false;
                    }
                    console.log('删除成功');
                })

        }

        DB.updata('product', {pid}, change, function (data) {
            res.redirect('/product');
        })

    })
});
// 商品 搜索
app.post('/search', function (req, res) {
    let title = req.body.proname;
        DB.find('product', {title}, function (data) {
            res.render('product', {list:data,search:title});
    });
});

// 商品 删除
app.get('/delete/:pid', function (req, res) {
    let pid = req.params.pid;
    DB.find('product',{pid},function (data) {
        console.log(data);
        fs.unlink(data[0].pic,function(err,data){
            if(err){
                console.log('图片删除失败');
                return false;
            }
            console.log('图片删除成功');
        })
    });
    DB.deleteOne('product', {pid}, function () {
        
        
        res.redirect('/product');
    });
});

app.use(function (req, res) {
    res.redirect('/product');
});
app.listen(8000, '127.0.0.1');