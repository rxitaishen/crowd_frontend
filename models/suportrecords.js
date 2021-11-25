const mongoose = require('mongoose');

// Book Schema
const suportRecordsSchema = mongoose.Schema({
	"proName":{
		type: String,
		
	},
	"userName":{
		type: String,
		
	},
    "suportTime":{
        type: String,
    },
    "suportMoney":{
        type: Number,
    },
});

const SuportRecords = module.exports = mongoose.model('suportrecords', suportRecordsSchema);