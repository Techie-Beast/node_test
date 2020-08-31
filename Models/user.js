const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	userId : {
		type : Number,
		required : "required"
	},
	name : {
		type : String,
		required : "required"
	}
});

mongoose.model("User", UserSchema);