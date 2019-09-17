var fs = require('fs');
var events = require('events');
var EventsEmitter = new events.EventEmitter();
fs.readFile('../static/mime.json',function (err,data) {
    if(err){
        console.log(err);
        return;
    }mieyou
   EventsEmitter.emit('data',data.toString())
});
// EventsEmitter.on('data',function (res) {
//     console.log(res);
// });