const mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
	orderId : {
		type : Number,
		required : "required"
	},
	userId : {
		type : Number,
		required : "required"
	},
	subtotal : {
		type : Number,
		required : "required"
    },
    date : {
		type : String,
		required : "required"
	}
});

mongoose.model("Order", OrderSchema);