var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.listen(8080);

// 连接数据库
mongoose.connect('mongodb://127.0.0.1/leave');
// 定义骨架模型
var MsgSchema = new mongoose.Schema({
    title: String,
    content: String,
    createAt: { type: Date, default: Date.now }
}, { collection: 'msg' });
// 定义数据模型
var MsgModel = mongoose.model('Msg', MsgSchema);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('6.留言板.html', {root: __dirname});
});

app.get('/getAllLeaves', function (req, res) {
    MsgModel.find({}, function (err, docs) {
        res.send(docs);
    });
});

app.get('/clear', function (req, res) {
    MsgModel.remove({}, function (err, result) {
        res.send(result.result);
    });
});

app.post('/addLeave', function (req, res) {
    var data = req.body;
    MsgModel.create(data, function (err, doc) {
        res.send(doc);
    });
});