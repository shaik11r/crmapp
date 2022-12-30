const user=require('../models/userModel');
const bcrypt=require('bcrypt')
const {userTypes}=require('../utils/authConstants')
const constant=require('../utils/authConstants')
const jwt=require('jsonwebtoken')
const config=require('../configs/authConfig')

exports.signup=async(req,res)=>{
    let currentStatus;
    console.log(req.body);
        if(req.body.userType==userTypes.engineer||
            req.body.userType==userTypes.admin){
            currentStatus=constant.userStatus.pending
        }
    else{
        currentStatus=constant.userStatus.approved
    }
    const userObj={
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
        userType:req.body.userType,
        password:bcrypt.hashSync(req.body.password,8),//hashsync asynchrnously happens
        userStatus:currentStatus
    }
    try{
        const userCreated=await user.create(userObj)
        res.status(201).send(userObj);
    }
    catch(err){
        console.log("something went wrong while saving to db",err.message)
        res.status(500).send({

            message:"some internal error while inserting the element"
        })
    }  
} 

exports.signIn=async(req,res)=>{
    const newUser=await user.findOne({
        name:req.body.name
    })
    if(!newUser){
        res.status(400).send({
            message:"failed username doesnt exits"
        })
        return
    }
    console.log(newUser);
    if(newUser.userStatus!=constant.userStatus.approved){
        res.status(400).send({
            message:"cant allow login your request is not approved please wait"
        })
        return;
    }
    let  isPassValid=bcrypt.compareSync(req.body.password,newUser.password)
    console.log(isPassValid)
    if(!isPassValid){
        res.status(400).send({
            message:"password is not valid"
        })
    }
    let token=jwt.sign({id:newUser.userId},config.secret,{
        expiresIn:86400
    })
    res.status(200).send({
        name:newUser.name,
        userId:newUser.userId,
        email:newUser.email,
        userTypes:newUser.userType,
        userStatus:newUser.userStatus,
        accessToken:token
    })

}