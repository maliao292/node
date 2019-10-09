let express = require('express');
let url = require('url');
let app = new express();
/* 导入封装的数据库连接方法 */
var DB = require('./model/db.js');
/* ejs */
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use('/upload',express.static('upload'));

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
    let msg = req.body;
    let {username,password} = msg;
    DB.find('user',{username,password:md5(password)},function (data) {
        if(data.length === 0){
            res.redirect('/login')
        }else{
            req.session.userinfo = data[0];
            app.locals['username'] = username;  // 全局
            res.redirect('/product')

        }
    });
});
// 商品
app.get('/product', function (req, res) {
    // 连接数据库
    var list = [];
    
    DB.find('product',{},function (data) {
        list = data;
        res.render('product',{list});
    });
});
// 生成随机ID
var lastUuid = 0;

function uuid() {
    return ''+((new Date()).getTime() + (lastUuid++) % 1000);
}
/* 新增商品 */
app.post('/doProductAdd',function (req,res) {
// 获取表单数据
    let form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req,function (err,fields,files) {
        if(err){
            console.log('添加商品：',err);
            return
        }
  /*      console.log(fields);
        console.log(files);*/
        let title = fields.title[0];
        let price = fields.price[0];
        let fee = fields.fee[0];
        let description = fields.description[0];
        let pic = files.pic[0].path;
        let pid = uuid();
        DB.insert('product',{title,price,fee,description,pic,pid},function (data) {
            res.redirect('/product');
        })
    })
});
// 商品 新增
app.get('/productadd', function (req, res) {
    res.render('productadd');
});
// 商品 编辑
app.get('/productedit/:pid', function (req, res) {

    let pid = req.params.pid;
    DB.find('product',{ pid },function (data) {
        console.log(data[0]);
        res.render('productedit',{data:data[0]});
    });

});
// 商品 删除
app.get('/delete', function (req, res) {
    res.send('productdelete');
});

app.use(function (req, res) {
    res.redirect('product');
});
app.listen(8000, '127.0.0.1');