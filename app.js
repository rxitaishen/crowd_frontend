const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

users = require('./models/users');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//===============链接到mongodb==================//

mongoose.connect('mongodb://localhost/prostore');
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

app.post(`/api/login`,(req, res)=>{
    var t = req.body;
    users.findOne({"name": t.userName,"pass": t.passWord},(err,user)=>{
        if(err){
			//console.log(err);
			throw err;
		}
		if(user) {
			res.send("登录成功");
		}
		else{
			res.send("登录失败")
		} 
    });
})
app.listen(5000)
console.log('Running on port 3000...');
