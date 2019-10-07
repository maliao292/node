/* 连接数据库 */
let MongoClient = require('mongodb').MongoClient;
let Dburl = 'mongodb://127.0.0.1:27017/mario';

function _connectDb(callback) {
    MongoClient.connect(Dburl, function (err, db) {
        if (err) {
            console.log('数据库连接失败');
        } else {
            callback(err, db);
        }

    })
}

/* 查找数据 */
exports.find = function (collectionname, json, callback) {
    _connectDb(function (err, db) {
        let result = db.collection(collectionname).find(json);
        result.toArray(function (err, data) {
            db.close();
            callback(data);
        })
    })
}

// 添加数据
exports.insert = function (collectionname, json, callback) {
    _connectDb(function (err, db) {
        let result = db.collection(collectionname).insertOne(json, function (err, data) {
            db.close();
            if (err) {
                console.log('插入数据失败')
            } else {
                callback(data)
            }
        });
    })
}

// 修改数据
exports.updata = function (collectionname, json1,json2 ,callback) {
    _connectDb(function (err, db) {
        db.collection(collectionname).updateOne(json1,{$set:json2}, function (err, data) {
            db.close();
            if (err) {
                console.log('修改数据失败')
            } else {
                callback(data)
            }
        });
    })
}

/* 删除数据 */
exports.deleteOne = function (collectionname, json ,callback) {
    _connectDb(function (err, db) {
        db.collection(collectionname).deleteOne(json, function (err, data) {
            db.close();
            if (err) {
                console.log('删除数据失败')
            } else {
                callback(data)
            }
        });
    })
}