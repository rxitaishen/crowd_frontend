const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

users = require('./models/users');
projects = require('./models/projects');
suportrecords = require('./models/suportrecords');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//===============链接到mongodb==================//

mongoose.connect('mongodb://localhost/prostore');
var db = mongoose.connection;

//监听事件
mongoose.connection.once("open", function () {
	console.log("数据库连接成功~~~");
});

mongoose.connection.once("close", function () {
	console.log("数据库连接已经断开~~~");
});


//===============用户相关==================//

app.get('/', (req, res) => {
	res.send('Please use /api/plotS or /api/genres');
});

//登录
app.post(`/api/login`, (req, res) => {
	var t = req.body;
	users.findOne({ "name": t.userName, "pass": t.passWord }, (err, user) => {
		if (err) {
			//console.log(err);
			throw err;
		}
		if (user) {
			res.send("登录成功");
		}
		else {
			res.send("登录失败")
		}
	});
})

//注册
app.post(`/api/register`, (req, res) => {
	var t = req.body;
	users.create({ "name": t.userName, "pass": t.passWord }, (err, user) => {
		if (err) {
			//console.log(err);
			throw err;
		}
		if (user) {
			res.send("注册成功");
		}
		else {
			res.send("注册失败")
		}
	});
})

//删除用户信息
app.delete('/api/userDelete/:_id', (req, res) => {
	var query = { _id: req.params._id };
	users.deleteOne(query, (err, user) => {
		if (err) {
			throw err;
		}
		res.json(user);
	});
});

//===============支持记录==================//

//查询支持记录
app.get('/api/projects/suportRecord/:projectName', (req, res, next) => {
	console.log('搜索项目的支持记录')
	suportrecords.find({ "proName": req.params.projectName }, (err, projectRc) => {
		console.log(projectRc)
		if (err) {
			throw err;
		}
		if (projectRc) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			console.log('proName不为null');
			res.json(projectRc);
		}
		else {
			console.log('proName为null');
			res.send("未找到相关信息")
		}
	});
});

//添加用户支持记录
app.post('/api/projects/suportRecord/add', (req, res, next) => {
	console.log('添加用户支持记录,即用户支持了事情')
	//req.body test {"proName":"hahaha","userName":"wu","suportTime":"","suportMoney":131}
	suportrecords.create(req.body, (err, userSuport) => {
		console.log(userSuport)
		if (err) {
			throw err;
		}
		if (userSuport) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			console.log('用户支持');
			res.json('支持成功');
		}
		else {
			console.log('用户支持失败');
			res.send("支持失败")
		}
	});
});


//===============项目==================//

//查询所有项目
app.get('/api/projects/search/all', (req, res, next) => {
	console.log('搜索所有项目')
	projects.find((err, project) => {
		if (err) {
			throw err;
		}
		res.json(project);
	});
});

//按项目名查询单个项目
app.post('/api/projects/search/name', (req, res, next) => {
	console.log('搜索单个项目')
	let t = req.body
	projects.findOne({ "name": t.proName }, (err, project) => {
		if (err) {
			throw err;
		}
		if (project.length != 0) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			console.log('proName不为null');
			res.json(project);
		}
		else {
			console.log('proName为null');
			res.send("未找到相关信息")
		}
	});
});


//按用户名查询项目
app.post('/api/projects/search/owner', (req, res, next) => {
	console.log('搜索单个项目')
	let t = req.body
	projects.find({ "owner": t.owner }, (err, project) => {
		if (err) {
			throw err;
		}
		if (project.length != 0) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			console.log('proName不为null');
			res.json(project);
		}
		else {
			console.log('proName为null');
			res.send("未找到相关信息")
		}
	});
});

//添加用户项目
app.post('/api/projects/addproject', (req, res, next) => {
	console.log('添加用户支持记录,即用户支持了事情')
	//req.body test {"name":"hahaha","description":"真的好啊錒","owner":"wu","moneyHave":1386,"moneyTarget":389260,"timeStart":"","timeEnd":"","suportNum":131,"suportBaseNum":786,"viewNum":699}
	projects.create(req.body, (err, userSuport) => {
		console.log(userSuport)
		if (err) {
			throw err;
		}
		if (userSuport) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			console.log('项目添加成功');
			res.json('添加成功');
		}
		else {
			console.log('项目添加失败');
			res.send("添加失败")
		}
	});

	// //接收前台POST过来的base64
	// var imgData = req.body.imgData; //第一张图片为封面
	// var name = req.body.name;
	// //过滤data:URL
	// for (let i = 0; i < imgData.length; i++) {
	// 	var base64Data = imgData[i].replace(/^data:image\/\w+;base64,/, "");
	// 	var dataBuffer = Buffer.from(base64Data, 'base64');
	// 	fs.writeFile(`./image/${name}/image${i}.png`, dataBuffer, function (err) {
	// 		if (err) {
	// 			res.send(err);
	// 		} else {
	// 			console.log('保存成功！')
	// 			continue
	// 		}
	// 	});
	// }

});

//删除用户项目
app.delete('/api/projects/:name', (req, res) => {
	var query = { name: req.params.name };
	projects.deleteOne(query, (err, project) => {
		if (err) {
			throw err;
		}
		res.json(project);
	});
});


app.listen(5000)
console.log('Running on port 5000...');
