const { jwtSign } = require("../helpers/jwt_generator");
const { usersModel } = require("../models/allmodels");
const {loginvalidtion } = require("../validations/allValidations")
const bcrypt=require('bcrypt')
require('dotenv').config();

//login function
const login = async (req, res) => {
    try {
        // validation
        const { error } = loginvalidtion(req.body);
        if (error) return res.status(400).send({status: false,message:error.message});
    
        // find user data
        const usergetdata = await usersModel.findOne({
            email: req.body.email,
        });
        if (!usergetdata)
          return res.status(401).send({
            status: false,
            message: 'username / password is incorrect',
          });
        // check password
        const checkpass = await bcrypt.compare(
          req.body.password,
          usergetdata.password
        );
        if (!checkpass)
          return res.status(401).send({
            status:false,
            message: 'username / password is incorrect',
          });
          // console.log(usergetdata);
        if(usergetdata.status === "pending") return res.status(401).send({status: false, message:'this user is already pending,pls contact the administrator'})

        
        // token using jwt
        const ourToken=jwtSign(usergetdata)
        
    
        res.status(200).header('authorization', ourToken).json({
          status: true,
          message: `successfuly logged in as [${usergetdata?.name}]`,
          user:usergetdata
          // token: ourToken,
        });
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {login};