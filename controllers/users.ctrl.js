
const bcrypt=require('bcrypt');
const { usersValidation,  } = require("../validations/allValidations");
const { usersModel,  } = require('../models/allmodels');
//get data
const get = async (req, res) => {
  try {
    const userData = await usersModel.find()
    res.status(200).send(userData);
  } catch (error) {
    res.status(400).send({status: false, message: error.message});
  }
};

//getById
const getaById = async (req, res) => {
    try {
      const {id}=req.params
      // console.log("id",id)
      const PersonaldData = await usersModel.findById(id);
      res.status(200).send(PersonaldData);
    } catch (error) {
      res.status(400).send({status: false, message: error.message});
    }
  };
//post data
const Post = async (req, res) => {
  try {
    //validation
    const { error } = usersValidation(req.body);
    if (error) return res.status(400).send({status: false, message: error.message});
    //post data
    const postData = new usersModel({
      email:req.body.email,
      name:req.body.name,
      password:req.body.password
    });
    postData.password=await bcrypt.hash(postData.password,10)
    //if user is already exit
    const allUsers=await usersModel.find({email:req.body.email})
    if(allUsers.length>0) return res.status(409).send({status:false,message:'this user allready exit'})
    //save post data
  // console.log("postData._id",postData._id)
    //  new permissionsModel({
    //   userid:postData._id,
    //   permissions:req.body.permissions
    //  }).save();
    await postData.save();
    res.status(201).send({
        status:true,
        message:'successfuly inserted',
        data:postData
    });
  } catch (error) {
    res.status(400).send({status: false, message: error.message});
  }
};

//put
const Put = async (req, res) => {
    try {
      const {id}=req.params
    //validation
    const { error } = usersValidation(req.body);
    if (error) return res.status(400).send({status: false, message: error.message});
       //if user is already exit
       const allUsers=await usersModel.find({email:req.body.email})
    if(!allUsers) return res.status(409).send({status:false,message:'this user is not exit'})
    //put data
    req.body.password=await bcrypt.hash(req.body.password,10)
    const putdate =await usersModel.findByIdAndUpdate(id,req.body,{new:true});
      res.status(200).send({
        status:true,
        message:'successfuly Updated',
        data:putdate

    });
     
    } catch (error) {
      res.status(400).send({status: false, message: error.message});
    }
  };

  const updateStatus = async (req, res) => {
    try {
      const {id}=req.params
    const putdate =await usersModel.findByIdAndUpdate(id,{status:req.body.status},{new:true});
      res.status(200).send({
        status:true,
        message:'successfuly Updated',
        data:putdate

    });
     
    } catch (error) {
      res.status(400).send({status: false, message: error.message});
    }
  };
  //dalete specific databyId
  const Delete=async(req,res)=>{
    try {
      const {id}=req.params
        //delete specific databyId
        const deletedata=await usersModel.findByIdAndDelete(id)
        res.status(200).send({
            status:true,
            message:'successfuly deleted',
            data:deletedata
        });
    } catch (error) {
        res.status(400).send({status: false, message: error.message});
    }
   

  }
module.exports = { get, Post,updateStatus ,Put,getaById,Delete,};