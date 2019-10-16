let express = require('express');
let router = express.Router();
let app = new express();
let url = require('url');

var DB = require('../../model/db.js');

/* MD5 */
let md5 = require('md5-node');
// app.use('/upload', express.static('upload'));
router.get('/login',function (req,res) {
    let msg = '你好吗';
    let uesrquery = url.parse(req.url, true).query;
    res.render('admin/login', {msg});
});
router.post('/dologin', function (req, res) {
    let msg = req.body;
    let {username, password} = msg;
    DB.find('user', {username, password: md5(password)}, function (data) {
        if (data.length === 0) {
            res.redirect('/login')
        } else {
            req.session.userinfo = data[0];
            app.locals['username'] = username;  // 全局
            res.redirect('/')
        }
    });
});
module.exports = router;