/**
 * Created by zhangwenning on 17/5/16.
 */

var http = require('http');
var url = require('url');

//函数声明才能提前,这里如果放到后面就错了.
exports.setting = (req, res) => {
    console.log('execute this action');
}

var routers = {};

var use = (path, action) => {
    routers[path] = action;
}

use("/user/setting", exports.setting);
use("/setting/user", exports.setting);

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var pathname = url.parse(req.url).pathname;
    if (routers[pathname]) {
        var action = routers[pathname];
        action(req, res);
        return;
    } else {
        console.log('handel 404 page');
    }

}).listen(9000, 'localhost');

console.log("App Started on PORT 9000");


