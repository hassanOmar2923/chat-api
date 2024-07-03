
const jwt=require('jsonwebtoken');
const { usersModel, permissionsModel } = require('../../models/allmodels');
require('dotenv').config()

function authorize(requiredPermissions) {
    return async function(req, res, next) {
        let token = req.headers['authorization'];
        // if (!token) return res.status(403).send({ status: false, message: 'No access token provided' });
        
        // token = token.split(' ')[1];
        
        // let tokenVerify;
        // try {
        //     tokenVerify = jwt.verify(token, process.env.token);
        // } catch (err) {
        //     return res.status(403).send({ status: false, message: 'Invalid token' });
        // }

        // if (!tokenVerify) return res.status(403).send({ status: false, message: 'Invalid token' });
        
        // const isValidUser = await usersModel.findById(tokenVerify.id);
        // if (!isValidUser) return res.status(403).send({ status: false, message: 'Invalid user' });
        // if(isValidUser.status !== 'active') return res.status(401).send({status:false,message:'inactive user,please contact administrator'})
            next()
        // req.user = isValidUser?._id;
        // if (isValidUser.role === 'admin') {
        //     // console.log('hiiiiiii')
        //     return next(); 
        // }else{
        //     const userPermissions=await permissionsModel.findOne({userid:isValidUser._id})
        //     if(!userPermissions) return res.status(401).send({message:'un-authorized'})
        //     // console.log(userPermissions.permissions);
            
        //     const userPermissionsArray = userPermissions.permissions.map(permissionObj => permissionObj.permission);
        //     const userPermissionsSet = new Set(userPermissionsArray); 
    
        //     const hasPermission = requiredPermissions.every(permission => userPermissionsSet.has(permission));
    
        //     if (hasPermission) {
        //         next(); 
        //     }
        //      else {
        //         return res.status(403).json({ message: 'you have no access for this part' });
        //     }
        // }
        // const userPermissions = req.user.permissions;
        
    };
}

module.exports ={authorize}

