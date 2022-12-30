const bodyParser = require('body-parser');
const express=require('express');
const User=require('./models/userModel');
const app=express();
const bcrypt=require('bcrypt');
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.send("Yola it works").status(200);
})
require('./routes/authRoutes')(app);
var mongoose = require('mongoose');
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open",()=>{
    console.log("connected to mongodb")
    init();
});
async function init(){
    let user=await User.findOne({userId:100})
    if(user){
        console.log("admin user already present");
        return;
    }
    try{
        user=await User.create({
            name:"nadeenadmin",
            userId:100,
            email:"superadmin@gmail.com",
            password:bcrypt.hashSync("superadmin",8),
            userType:"ADMIN",
            userStatus:"APPROVED"
        })
        console.log(`super admin created : ${user}`);
    }
    catch(err){
     console.log(err);
    }
}
app.listen(3000,()=>{
    console.log("server is Online")
}) 