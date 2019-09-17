/* 引入 events 模块 */
var events = require('events');

var EventEmitter = new events.EventEmitter(); // 广播 和接收 广播

//监听 to_parent 的广播
EventEmitter.on('to_parent',function (res) {
    console.log('接收到了这个广播事件',res)

});

setTimeout(function () {
    var nums = Math.random();
    EventEmitter.emit('to_parent','发送的数据' + nums)
},10);