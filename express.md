* 获取url动态传值（/newscontent/:aid）
    >req.params
* url获取get动态传值（/product?id=123）
    >req.query
* express 给变ejs模板加载路径
    > app.set('views','相对路径')
    
* express 静态文件托管
    >app.use(express.static('static'))
* express 静态文件托管 -- 虚拟目录
    >app.use('/static',express.static('static'))

### 第三方中间件（也叫模块）
#### 配置bodyParser 
##### 获取post传值
1. var bodyParser = require('body-parser');
2. app.use(bodyParser.urlencoded({ extended: false }));
3. app.use(bodyParser.json());
* 直接获取 post传递数据 req.body


#### 配置cookie-parser
##### 存储/获取cookie 
1. npm i cookie-parser --save 
2. var cookieParser = require('cookie-parser')
3. app.use(cookieParser());
4. 设置cookie:
    > res.cookie('username','cookie的值'，{maxAge:60000}) // maxAge:过期时间
 5. 获取 req.cookies.cookiename; 
 
 
 #### express-session
 1. npm install express-session
 2. app.set('trust proxy', 1) // trust first proxy
 3. > app.use(session({
     secret: 'keyboard cat',
     resave: false,
     saveUninitialized: true,
     cookie: { secure: true }
   }))
  4. 设置session
   > req.session.sessionname = 'string'
  5. 获取 
   > req.session.sessionname
  6. 销毁
   > req.session.destroy(funciton(err){}) 
   
   
   #### ejs 配置全局数据
   > app.locals['str'] = 'val'
   > 页面使用 <%= str%>