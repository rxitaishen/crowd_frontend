const mongoose = require('mongoose');

// Book Schema
const userSchema = mongoose.Schema({
	"name":{
		type: String,
		
	},
	"pass":{
		type: String,
		
	}
});

const Users = module.exports = mongoose.model('users', userSchema);