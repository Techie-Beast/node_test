const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const orderModel = mongoose.model("Order");
const userModel = mongoose.model("User");

//insert given orders
router.get("/insert",(req,res)=>{
    var orders = new orderModel();

    var order_arr =  [ 
        {
            orderId : 1,
            userId : 1,
            subtotal : 500,
            date : "23/01/2019"
        },{
            orderId : 2,
            userId : 2,
            subtotal : 400,
            date : "16/03/2019"
        },{
            orderId : 3,
            userId : 1,
            subtotal : 150,
            date : "20/03/2019"
        },{
            orderId : 4,
            userId : 1,
            subtotal : 700,
            date : "25/03/2019"
        },{
            orderId : 5,
            userId : 3,
            subtotal : 200,
            date : "21/02/2019"
        },{
            orderId : 5,
            userId : 3,
            subtotal : 1500,
            date : "22/02/2019"
        },{
            orderId : 7,
            userId : 1,
            subtotal : 1200,
            date : "16/04/2019"
        },{
            orderId : 8,
            userId : 2,
            subtotal : 1600,
            date : "01/05/2019"
        },{
            orderId : 9,
            userId : 2,
            subtotal : 900,
            date : "23/05/2019"
        },{
            orderId : 10,
            userId : 1,
            subtotal : 700,
            date : "13/04/2019"
        }
    ]

    orders.collection.insert(order_arr,(err,rec)=>{
        if(!err){
            res.send("Orders Inserted successfully");
        }else{
            res.send("Error while inserting records");
        }
    });
});

//get order details
router.get("/details",(req,res)=>{

    orderModel.find((err,suc)=>{
        if(!err){
            res.send(suc);
        }else{
            res.send(err);
        }
    });
});

//get user wise orders
router.get("/user-orders",(req,res)=>{

    orderModel.aggregate([
        { 
            $lookup : {
                "from": "users",
                "localField": 'userId',
                "foreignField": 'userId',
                "as": 'user'
            }
        },{
            $group : {
                _id  : "$userId",
                name :  { $first : "$user.name"},
                noOfOrders : { $sum : 1},
                averageBillValue : { $avg : '$subtotal'},
            }
        },{
            $project : {
                _id : 0,
                userId : "$_id",
                name : "$name",
                noOfOrders : "$noOfOrders",
                averageBillValue : "$averageBillValue"
            }
        },
        {
            $sort: {
                "userId": 1
            }
        }
    ]).exec((err,suc)=>{
        if(!err){
            res.send(suc);
        }else{
            res.send(err);
        }
    })
});

//update no of orders for each user
router.get("/update-orders",(req,res)=>{

    orderModel.aggregate([
        {
            $group : {
                _id  : "$userId",
                noOfOrders : { $sum : 1},
                averageBillValue : { $avg : '$subtotal'},
            }
        },{
            $project : {
                _id : 0,
                userId : "$_id",
                noOfOrders : "$noOfOrders",
                averageBillValue : "$averageBillValue"
            }
        },
        {
            $sort: {
                "_id": 1
            }
        }
    ]).exec((err,suc)=>{
        if(!err){
            var updateOrders;
            suc.forEach((ele)=>{
               updateOrders = userModel.updateOne({userId : ele.userId},{noOfOrders : ele.noOfOrders});
            });
            
            if(updateOrders){
                res.json({success : true, message : "Successfully updated"});
            }else{
                res.json({success : false, message : "Error while updating"});
            }            
        }else{
            res.send(err);
        }
    })
});

module.exports = router;
