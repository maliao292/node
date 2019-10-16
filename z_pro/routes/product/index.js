let express = require('express');
let router = express.Router();
let app = new express();
let url = require('url');
let fs = require('fs');

let multiparty = require('multiparty');
var DB = require('../../model/db.js');
// app.use('/upload', express.static('upload'));
// 商品 新增
router.get('/productadd', function (req, res) {
    res.render('product/productadd');
});
// 商品 编辑页面
router.get('/productedit/:pid', function (req, res) {
    // let pid = req.query.pid;
    let pid = req.params.pid;
    DB.find('product', {pid}, function (data) {
        res.render('product/productedit', {data: data[0]});
    });
});
// 生成随机ID
var lastUuid = 0;

function uuid() {
    return '' + ((new Date()).getTime() + (lastUuid++) % 1000);
}


/* 新增商品 */
router.post('/doProductAdd', function (req, res) {
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
            res.redirect('/');
        })
    })
});
// 商品 编辑
router.post('/doCom/:pid', function (req, res) {
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
            res.redirect('/');
        })

    })
});

// 商品 搜索
router.post('/search', function (req, res) {
    let title = req.body.proname;
  
    DB.find('product', {title}, function (data) {
        console.log(data);
        res.render('index/index', {list:data,search:title});

    });
});
// 商品 删除
router.get('/delete/:pid', function (req, res) {
    let pid = req.params.pid;
    DB.find('product',{pid},function (data) {
        fs.unlink(data[0].pic,function(err,data){
            if(err){
                console.log('图片删除失败');
                return false;
            }
            console.log('图片删除成功');
        })
    });
    DB.deleteOne('product', {pid}, function () {


        res.redirect('/');
    });
});
module.exports = router;