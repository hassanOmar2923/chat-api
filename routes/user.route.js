const express=require('express')
const route=express.Router()
const { get, Post ,updateStatus,Put,getaById,Delete,}=require('../controllers/users.ctrl')
const { authorize } = require('./middleware/middleware')
//get user data
route.get('/',authorize(['users-read']),get)
route.get('/:id',getaById)
//post
route.post('/',authorize(['users-write']),Post)

route.put('/:id',authorize(['users-write']),Put)
route.put('/status/:id',authorize(['users-write']),updateStatus)

route.delete('/:id',authorize(['users-delete']),Delete)
module.exports = route