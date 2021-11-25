const mongoose = require('mongoose');

// Book Schema
const projectSchema = mongoose.Schema({
	"name":{
		type: String,
	},
	"description":{
		type: String,
	},
    "owner":{
        type: String,
    },
    "moneyHave":{
        type: Number,
    },
    "moneyTarget":{
        type: Number,
    },
    "timeStart":{
        type:String,
    },
    "timeEnd":{
        type:String,
    },
    //支持人数
    "suportNum":{
        type: Number,
    },
    //最低支持金额
    "suportBaseNum":{
        type: Number,
    },
    //查看人数
    "viewNum":{
        type: Number,
    }
});

const Projects = module.exports = mongoose.model('projects', projectSchema);