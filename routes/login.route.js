const express=require('express')
const route=express.Router()
const {login}=require('../controllers/login.ctrl')
//login
route.post('/',login)


module.exports = route