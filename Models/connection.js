const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test_db",{ useNewUrlParser: true }, (err)=>{
	if(!err){
		console.log('Mongo DB Connected successfully.');
	}else{
		console.log(err)
	}
});

const User  = require('./user.js');
const Order  = require('./order.js');
