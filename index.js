const connection = require('./Models/connection');

const express = require('express');
const app = express();
const path  = require('path');
const expressHandleBars = require('express-handlebars');
const bodyParser = require('body-parser');

const userController = require("./controllers/users");
const orderController = require("./controllers/orders");


app.use(bodyParser.urlencoded({
	extended : true
}));

app.get("/",(req,res)=>{
	res.send("Hello")
});

app.listen("2000",()=>{
	console.log("Node js server is up and running on port 2000");
});

app.use("/user",userController);
app.use("/order",orderController);