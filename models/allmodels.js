const mongoose = require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

const messageSchema=new mongoose.Schema({

    senderId:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true,
    },
    receiverId:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true,
    },
    
    message:{
        type:String,
        required:true,
    },
    

},{timestamps:true})




const usersModel=mongoose.model('users', userSchema)
const messageModel=mongoose.model("messages",messageSchema)


module.exports = {usersModel,messageModel,}