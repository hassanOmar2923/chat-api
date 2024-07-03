const { messageModel, usersModel } = require("../models/allmodels");
const { messageValidation,  } = require("../validations/allValidations");



//get data
const get = async (req, res) => {
  try {
    const userData = await messageModel.find()
    .populate({
      path: 'senderId',
      model: 'users',
      select: '_id name email',
    })
    .populate({
      path: 'receiverId',
      model: 'users',
      select: '_id name email',
    })
    .sort({createdAt:-1})
    res.status(200).send(userData);
  } catch (error) {
    res.status(400).send({status: false, message: error.message});
  }
};
//getById
const getSpecific = async (req, res) => {
    try {
      // const {id}=req.params
      const PersonaldData = await messageModel.find({receiverId:req.params.receiverId,senderId:req.params.senderId})
      .populate({
        path: 'senderId',
        model: 'users',
        select: '_id name email',
      })
      .populate({
        path: 'receiverId',
        model: 'users',
        select: '_id name email',
      })
      .sort({createdAt:-1})
      res.status(200).send(PersonaldData);
    } catch (error) {
      res.status(400).send({status: false, message: error.message});
    }
  };
  const getaById = async (req, res) => {
    try {
      const {id}=req.params
      const PersonaldData = await messageModel.findById(id)
      .populate({
        path: 'senderId',
        model: 'users',
        select: '_id name email',
      })
      .populate({
        path: 'receiverId',
        model: 'users',
        select: '_id name email',
      })
      .sort({createdAt:-1})
      res.status(200).send(PersonaldData);
    } catch (error) {
      res.status(400).send({status: false, message: error.message});
    }
  };
//post data
const Post = async (req, res) => {
  try {
    //validation
    const { error } = messageValidation(req.body);
    if (error) return res.status(400).send({status: false, message: error.message});
    if(req.body.senderId === req.body.receiverId) return res.status(409).send({status: false, message: "sender and receiver cannot be the same"});
    const checkSender=await usersModel.findById(req.body.senderId)

    if(!checkSender) return res.status(404).send({status: false, message:"sender not found"})
    const checkreciever=await usersModel.findById(req.body.receiverId)
    if(!checkreciever) return res.status(404).send({status: false, message:"receiver not found"})
    //post data
    const postData = new messageModel(req.body);
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
    const { error } = messageValidation(req.body);
      if (error) return res.status(400).send({status: false, message: error.message});

    const putdate =await messageModel.findByIdAndUpdate(id,req.body,{new:true});
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
        const deletedata=await messageModel.findByIdAndDelete(id)
        res.status(200).send({
            status:true,
            message:'successfuly deleted',
            data:deletedata
        });
    } catch (error) {
        res.status(400).send({status: false, message: error.message});
    }
   

  }


module.exports = { get, Post ,Put,getaById,Delete,getSpecific};