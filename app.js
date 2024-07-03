const express = require('express');
const { mongoDB } = require('./helpers/DBconnection');
const app = express();
require('dotenv').config();
const cors = require('cors');


// routes exported
const userRouter = require('./routes/user.route');
const loginRoute = require('./routes/login.route');
const messageRouter = require('./routes/message.route');

// const { Authentication } = require('./middlewares/Auth');
app.use(express.json());


app.use(cors());
require('dotenv').config()
mongoDB();

app.get('/', async function (req, res) {
  res.send('EndPoint');
});
app.use('/login',loginRoute)

// app.use(Authentication())

app.use('/user', userRouter);
app.use('/message', messageRouter);

app.listen(process.env.PORT,()=>{
    console.log(`listining on Port ${process.env.PORT}`);
});
