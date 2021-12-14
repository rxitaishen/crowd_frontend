const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const mineType = require("mime-types");
var multiparty = require("multiparty");

users = require('./models/users');
projects = require('./models/projects');
suportrecords = require('./models/suportrecords');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


function imgToBase64(url) {
	try {
		let imgurl = url;
		let imageData = fs.readFileSync(imgurl); //从根目录访问
		if (!imageData) return "";
		let bufferData = Buffer.from(imageData).toString("base64");
		let base64 = "data:" + mineType.lookup(imgurl) + ";base64," + bufferData;
		return base64;
	} catch (error) {
		return "";
	}
}



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

function readFiles(pathName, obj) {
	return new Promise(resolve => {
		fs.readdir(pathName, (err, files) => {
			var dirs = files
			obj.firstImg = dirs
			console.log('promise中');
			resolve('done');
		})
	})
}

async function addImgUrl(list,res) {
	for (let j = 0; j < list.length; j++) {
		let pathName = './public/test/' + list[j].name
		console.log('promise前');
		await readFiles(pathName, list[j].name)
		console.log('promise后');
	}
	console.log('发送请求',list[0]);
	res.send(list)
}


//查询所有项目
app.get('/api/projects/search/all', (req, res, next) => {
	console.log('搜索所有项目')
	var resp = {}
	projects.find((err, project) => {
		if (err) {
			throw err;
		}
		// addImgUrl(project,res)
		res.send(project)
	})

});

//按项目名查询单个项目
app.post('/api/projects/search/name', (req, res, next) => {
	console.log('搜索单个项目')
	let t = req.body
	projects.findOne({ "name": t.proName }, (err, project) => {
		if (err) {
			throw err;
		}
		if (project) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
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

//按名字给项目添加支持，post
app.post('/api/projects/suport', (req, res, next) => {
	console.log('搜索单个项目')
	let t = req.body
	console.log(t);
	projects.findOne({ "name": t.name }, (err, project) => {
		if (err) {
			throw err;
		}
		if (project != null) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			let num = project.moneyHave + t.num
			projects.updateOne({'name': t.name},  {moneyHave: num},(err, docs)=>{
				if(err){
					res.json('支持失败')
				}
				/**更新数据成功，紧接着查询数据 */
				projects.findOne({ "name": t.name },(err, p)=>{
					if(err){
						res.json('支持失败')
					}
					res.json(p.moneyHave)
				})
			})
		}
		else {
			console.log('proName为null');
			res.send("未找到相关信息")
		}
	});
});

//按名字给项目添加支持
app.get('/api/projects/suport/:name', (req, res, next) => {
	console.log('用户添加支持')
	let t = req.params.name
	projects.findOne({ "name": t }, (err, project) => {
		if (err) {
			throw err;
		}
		if (project !== null) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			console.log('proName不为null');
			let num = project.suportNum + 1
			projects.updateOne({'name':t},  {suportNum: num},(err, docs)=>{
				if(err){
					res.json('支持失败')
				}
				/**更新数据成功，紧接着查询数据 */
				projects.findOne({ "name": t },(err, p)=>{
					if(err){
						res.json('支持失败')
					}
					res.json(p.suportNum)
				})
			})
			
		}
		else {
			console.log('proName为null');
			res.send("支持失败")
		}
	});
});

//按名字给项目添加访问量
app.get('/api/projects/view/:name', (req, res, next) => {
	console.log('用户添加支持')
	let t = req.params.name
	projects.findOne({ "name": t }, (err, project) => {
		if (err) {
			throw err;
		}
		if (project !== null) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			console.log('proName不为null');
			console.log('proName不为null');
			let num = project.viewNum + 1
			projects.updateOne({'name':t},  {viewNum: num},(err, docs)=>{
				if(err){
					res.json('访问失败')
				}
				/**更新数据成功，紧接着查询数据 */
				projects.findOne({ "name": t },(err, p)=>{
					if(err){
						res.json('访问失败')
					}
					res.json(p.viewNum)
				})
			})
			
		}
		else {
			console.log('proName为null');
			res.send("访问成功")
		}
	});
});

//添加用户项目
app.post('/api/projects/addproject', (req, res, next) => {
	console.log('添加用户支持记录,即用户支持了事情')
	//req.body test {"name":"hahaha","description":"真的好啊錒","owner":"wu","moneyHave":1386,"moneyTarget":389260,"timeStart":"","timeEnd":"","suportNum":131,"suportBaseNum":786,"viewNum":699}

	//生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({ uploadDir: './public/test' });
	form.parse(req, function (err, fields, files) {
		if (err) {
			res.send(err)
		}
		else {
			console.log(fields, 'fields');
			console.log(files, 'files');
			fs.mkdir("./public/test/" + fields.name[0], function (error) {
				if (error) {
					console.log(error);
					return false;
				}
				console.log('创建项目目录成功');
			})
			var j = 0
			//重命名文件
			if (Object.keys(files).length != 0) {
				console.log('文件为', files);
				files.file.map(item => {
					j++
					//分割字符
					var path_arr = item.path.split("\\");
					var path_save = path_arr[0] + "\\" + path_arr[1] + "\\" + fields.name[0] + "\\" + "(" + j + ")" + item.originalFilename
					//替换名字
					fs.renameSync(item.path, path_save)
				});
			}

			var obj = {}
			for (let key in fields) {
				console.log('key: ' + key + ',' + 'value: ' + obj[key])
				console.log(fields[key][0]);
				obj[key] = fields[key][0]
			}
			obj.moneyHave = 0
			obj.suportNum = 0
			obj.viewNum = 0

			console.log("obj", obj instanceof Object);

			projects.create(obj, (err, userSuport) => {
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
			// projects.create(fields, (err, userSuport) => {
			// 	console.log(userSuport)
			// 	if (err) {
			// 		throw err;
			// 	}
			// 	if (userSuport) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			// 		console.log('项目添加成功');
			// 		res.json('添加成功');
			// 	}
			// 	else {
			// 		console.log('项目添加失败');
			// 		res.send("添加失败")
			// 	}
			// });
		}
		//...将文件路径和标题存入数据库
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

//查看项目详情
app.get('/api/projects/detail/:name', (req, res) => {
	let pathName = './public/test/' + req.params.name;
	console.log('pathName: ', pathName);
	var resp = {}
	var dirs = []
	var img = []
	fs.readdir(pathName, (err, files) => {
		dirs = files
		if(dirs){
			for (let i = 0; i < dirs.length; i++) {
				var base = imgToBase64(pathName + '/' + dirs[i])
				img.push(base)
			}
		}
		
		
		projects.findOne({ "name": req.params.name }, (err, project) => {
			if (err) {
				throw err;
			}
			if (project) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
				console.log('proName不为null');
				resp.img = img
				resp.data = project
				res.send(resp)
			}
			else {
				console.log('proName为null');
				res.send("未找到相关信息")
			}
		});
	})

})

//获取图片base64
app.get('/api/projects/imgurl/:name', (req, res) => {
	let pathName = './public/test/' + req.params.name;
	console.log('pathName: ', pathName)
	var dirs = []
	var img = []
	fs.readdir(pathName, (err, files) => {
		dirs = files
		for (let i = 0; i < dirs.length; i++) {
			var base = imgToBase64(pathName + '/' + dirs[i])
			img.push(base)
		}
		res.send(img)
	})
})

//获取封面
app.get('/api/projects/firstimgurl/:name', (req, res) => {
	let pathName = './public/test/' + req.params.name;
	console.log('pathName: ', pathName)
	var dirs = []
	fs.readdir(pathName, (err, files) => {
		console.log('获取封面',files);
		if (files !== undefined){
			dirs = files
			var base = imgToBase64(pathName + '/' + dirs[0])
			res.send(base)
		}
		else{
			res.send('未找到对应封面')
		}
		//前台就给封面设置一个state变量好了，然后监听这个state变量
	})
})

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
