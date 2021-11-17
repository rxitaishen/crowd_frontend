const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

users = require('./models/users');


//===============链接到mongodb==================//

mongoose.connect('mongodb://localhost/mapstore33');
var db = mongoose.connection;

//监听事件
mongoose.connection.once("open",function(){
	console.log("数据库连接成功~~~");
});

mongoose.connection.once("close",function(){
	console.log("数据库连接已经断开~~~");
});

//===============配置后端路由==================//


app.get('/', (req, res) => {
	res.send('Please use /api/plotS or /api/genres');
});