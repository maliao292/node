let express = require('express');
let router = express.Router();
let app = new express();
let url = require('url');
var DB = require('../../model/db.js');

// app.use('/upload', express.static('upload'));







router.get('/',function (req,res) {
    // 连接数据库
    var list = [];

    DB.find('product', {}, function (data) {
        list = data;
        res.render('index/index', {list,search:''});
    });
});

module.exports = router;