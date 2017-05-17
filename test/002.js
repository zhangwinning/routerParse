/**
 * Created by zhangwenning on 17/5/16.
 */

var http = require('http');
var url = require('url');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var pathname = url.parse(req.url).pathname;
    var paths = pathname.split('/');
    var controller = paths[1] || 'index';
    var action = paths[2] || 'index';
    var args = paths.slice(3);
    var module;
    try {
        //require 的缓存机制只有第一次是阻塞的
        module = require('./controller/' + controller);
    } catch (ex) {
        handle500(req, res);
        return;
    }
    var method = module[action];
    if (method) {
        console.log([req, res].concat(args));
        method.apply(null, [req, res].concat(args));
    } else {
        handle500(req, res);
    }
}).listen(9001, 'localhost');

console.log("App Started on PORT 9001");

var handle500 = (req, res) => {
    console.log('this is 500 state');
}
