const express=require('express')
const route=express.Router()
const { get, Post ,Put,getaById,Delete, getSpecific,}=require('../controllers/message.ctrl')
const { authorize } = require('./middleware/middleware')
//get user data
route.get('/',authorize(['course-regestrations-read']),get)
route.get('/:id',authorize(['course-regestrations-read']),getaById)
route.get('/specific/:senderId/:receiverId',authorize(['course-regestrations-read']),getSpecific)
//post
route.post('/',Post)
//put
route.put('/:id',authorize(['course-regestrations-write']),Put)

//delete
route.delete('/:id',authorize(['course-regestrations-delete']),Delete)


module.exports = route