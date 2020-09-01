const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const userModel = mongoose.model("User");

//Insert the given users
router.get("/insert",(req,res)=>{
    var users = new userModel();
    var user_arr = [{
        userId : 1,
        name : "Rahul"
    },{
        userId : 2,
        name : "Ramesh"
    },{
        userId : 3,
        name : "Ankita"
    }]

    users.collection.insert(user_arr,(err,rec)=>{
        if(!err){
            res.send("users inserted successfully.")
        }else{
            res.send("error while inserting a records.")
        }
    });
});

router.get("/",(req,res)=>{
    userModel.find((err,suc)=>{
        if(suc){
            // console.log(suc)
            res.send('User controller working fine')
        }else{
            res.send('Some error occurred.')
        }
    })
});

module.exports = router;