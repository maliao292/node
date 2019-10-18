let Koa = require('koa');
let app = new Koa();
let router = require('koa-router')();  // 引用和实例化路由


router.get('/',async function(ctx){
    ctx.body = '首页';
});


app.use(router.routes())
.use(router.allowedMethods());
app.listen(8888);