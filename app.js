var mqtt = require('mqtt');
var opt = {
  port:1883,
  clientId: 'nodejs'
};
var io = require("socket.io");
// var express = require("express");
// var app = express();
// app.use(express.static('www'));
// var server = app.listen(5438);

var http = require("http");
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response) {
  console.log('Connection');
  var path = url.parse(request.url).pathname;

  switch (path) {
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();
      break;
    case '/socket.html':
      fs.readFile(__dirname + path, function(error, data) {
        if (error){
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
        }
        response.end();
      });
      break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }
});
server.listen(8001);
 
var client  = mqtt.connect({
    host: '140.115.52.100',
    port: 1883,
    username: 'student',
    password: 'lora_experiment'
});

var sio = io.listen(server);
 
client.on('connect', function () {
  console.log('已連接至MQTT伺服器');
  client.subscribe({"application/2/node/008000000000f30f/rx":2});
});
 
sio.on('connection', function(socket){
	console.log('socket here');
  client.on('message', function (topic, msg) { 
      console.log('收到 ' + topic + ' 主題，訊息：' + msg.toString());
      socket.emit('mqtt', { 'msg': msg.toString() });
  });
});

// source:
// https://blog.gtwang.org/programming/socket-io-node-js-realtime-app/
// http://www.runoob.com/nodejs/nodejs-module-system.html
// https://swf.com.tw/?p=1023
