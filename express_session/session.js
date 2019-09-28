let express = require('express');
let app = new express();
let session = require('express-session');
session.use(session({
    secret:'mario',  //生成加密字符串的‘秘钥’
    resave:false, // 强制保存
    saveUninitialized:true, // 即使他并没有什么变化
    cookie:{
        maxAge:1000*60*30, // 过期时间
    },
    rolling:true // 在每次请求时强行设置cookie 将重置cookie 过期时间（默认 false）
}));
app.set('/set',function(req,res){
    req.session.userInfo = '张三';
});
app.get('/login',function (req,res) {
   if(req.session.userInfo){
       res.send('你好，'+req.session.userInfo+'欢迎回来')
   } else {
       res.send('未登录');
       window.location.href = '127.0.0.1:8888/set'
   }
});
app.get('/',function (req,res) {
    res.send('res');
});


app.listen(8888,'127.0.0.1');
