const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017");

const userSchema=mongoose.Schema({
name:{
    type:String,
    required:true
},
userId:{
    type:Number,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
    minlength:8
},
email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
    minlength:10,
    isEmail:true,
},
createdAt:{
    type:Date,
    immutable:true,
    default:()=>Date.now()
},
updatedAt:{
    type:Date,
    default:()=>Date.now()
},
userType:{
    type:String,
    required:true,
    default:"Customer"
},
userStatus:{
    type:String,
    required:true,
    default:"approved"
}
})
module.exports=mongoose.model("User",userSchema)