var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
app.listen(8080, ()=>console.log('ok'));

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('5.vue-resource.html', {root: __dirname});
});

app.get('/getUser', function (req, res) {
    res.send({ msg: '获取数据成功' });
});

app.post('/postUser', function (req, res) {
    var data = req.body;
    console.log(data);
    res.send(data);
});