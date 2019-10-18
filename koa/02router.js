let Koa = require('koa');
let app = new Koa();
let router = require('koa-router')();  // 引用和实例化路由
let url = require('url');

/* get 传值  */
router.get('/',async function(ctx){
    // console.log(url.parse(ctx.request.url,true).query);
    console.log(ctx.query);
    console.log(ctx.querystring);
    ctx.body = '首页';
});


/* 动态路由 */
router.get('/new/:aid/:bid',async function(ctx){
    // console.log(url.parse(ctx.request.url,true).query);
    console.log(ctx.params);
    ctx.body = '新闻';
});

app.use(router.routes())
.use(router.allowedMethods());
app.listen(8888);