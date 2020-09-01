const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	userId : {
		type : Number,
		required : "required"
	},
	name : {
		type : String,
		required : "required"
	},
	noOfOrders : {
		type : Number,
		required : "required",
		default : 0
	}
});

mongoose.model("User", UserSchema);