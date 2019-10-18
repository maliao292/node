const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

/*中间件*/
/*app.use( async (ctx)=>{
   ctx.body = '你好 ， koa'
});*/


/* ctx 上下文 包含了 request 和response 等信息 */
router.get('/home',async (ctx) =>{
    ctx.body = '首页2d';
}).get('/new',async (ctx)=>{
   ctx.body = '新闻页'
});
app.use(router.routes())/* todo 启动路由 */
    .use(router.allowedMethods());/* todo 可以配置 设置响应头 */
app.listen(8888);