const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
require('dotenv').config();
const Razorpay = require('razorpay')
const crypto = require('crypto');
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

 const instance = new Razorpay({
  key_id: process.env.RAZORPAYKEY,
  key_secret: process.env.RAZORPAYSECRET,
});


const checkout = async (req,res) =>{
  const options = {
    amount: 1100,  // amount in the smallest currency unit
    currency: "INR",
   
  };
 const order = await instance.orders.create(options);
 const key = process.env.RAZORPAYKEY
 res.status(200).json({success: true, order , key})
}

const paymentverification = async (req,res) =>{
  // console.log(req.body)
  // const {order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // const body =   order_id + "|" + razorpay_payment_id ;

  // const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAYSECRET).update(body.toString()).digest('hex');

  
  res.redirect('/success') //change the url to only /success
  res.status(200).json({success: true})

  // if (generated_signature === razorpay_signature) {
  //   res.redirect('http://localhost:8080/success')
  //   res.status(200).json({success: true,})
  // }

  // else{
  //   res.status(200).json({success: false,})
  // }
  
}
 

app.get('/check',auth);
app.post('/api/payment/checkout',checkout);
app.post('/api/payment/verify',paymentverification);
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