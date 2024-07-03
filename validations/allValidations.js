const joi = require('joi')
//users validation
function usersValidation(user){
    const userVal=joi.object({
        name:joi.string().required(),
        email:joi.string().email({ tlds: { allow: false } }).required(),
        password:joi.string().required(),
    })
    return userVal.validate(user)
}


function messageValidation(body){
    const Val=joi.object({
        receiverId:joi.string().required(),
        senderId:joi.string().required(),
        message:joi.string().required(),
    })
    return Val.validate(body)
}

function loginvalidtion(userobj) {
    let userval = joi.object({
      email: joi.string().email({ tlds: { allow: false } }).required(),
      password: joi.string().required(),
    });
    return userval.validate(userobj);
  }

module.exports={usersValidation,messageValidation,loginvalidtion}