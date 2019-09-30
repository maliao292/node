/* 连接数据库 */
let MongoClient = require('mongodb').MongoClient;
let Dburl = 'mongodb://127.0.0.1:27017/z_pro';

function _connectDb() {
    MongoClient.connect(Dburl,function(err,db){
        if(err){
            console.log('数据库连接失败');
        }
        db.collection('')
    })
}