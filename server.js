const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
require('dotenv').config();
const movie_router = require('./router/movie')
const status_router = require('./router/status')
const ticket_router = require('./router/ticket')
const user_router = require('./router/user')
const app = express();

module.exports = app;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(cookieparser())
app.use(express.static('build'));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://vidit:3OI8NfjQQUVCgmRZ@cluster0.beevlkl.mongodb.net/flicket?retryWrites=true&w=majority');
  console.log("Database Connected");
}

const auth = (req,res,next) => {
  try {
   const {flickettoken} = req.cookies;
   if(flickettoken){
    const user = jwt.verify(flickettoken,process.env.SECKEY);
    req.userID = user.id;
    req.mail = user.email;
    req.name = user.name;
    req.city = user.city;
    res.json(user);
   next();
   }
 
   else{
     res.status(201).json({message: "declined"});
     console.log("Kindly login first, to continue!")
   }
 
   
  } catch (error) {
   console.log(error);
   res.send(error);
  }
   
 }

 

app.get('/check',auth);
app.use('/api/movie', movie_router);
app.use('/api/status', status_router);
app.use('/api/ticket',ticket_router);
app.use('/api/user', user_router);

app.get('/', (req,res)=>{
    res.json("backend work started !")
})



app.listen(8080, ()=>{
    console.log("server started")
})