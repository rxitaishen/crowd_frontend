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

// Get Locations
module.exports.getLocations = (callback, limit) => {

	Location.find(callback).limit(limit);
}

//Get Locations By Code
module.exports.getLocationByCode = (item, callback)=>{
	Location.findOne({"name": item.userName,"pass": item.passWord},callback);
	//console.log(title);
}