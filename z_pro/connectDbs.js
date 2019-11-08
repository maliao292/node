let express = require('express');
let app = new express();
let MongoClient = require('mongodb').MongoClient;
let Dburl = 'mongodb://127.0.0.1:27017/z_pro';
app.get('/api/list', function (req, res) {
    MongoClient.connect(Dburl, function (err, db) {


        var list = [];
        var dataarr = db.collection('user').find()
        dataarr.each(function (err, doc) {
            if (err) {
                console.log('ERR')
            } else {
                if (doc != null) {
                    list.push(doc)
                } else {
                    console.log('callback(' + list + ')');
                    // res.end('callback('+list+')');
                    // res.end('callback(' + JSON.stringify(list) + ')');
                    res.end(JSON.stringify(list));
                }
            }
        })
    })
});
app.listen('7000');
