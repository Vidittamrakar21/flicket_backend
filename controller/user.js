const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const cookieparser = require('cookie-parser');
require('dotenv').config();

// app.use(cookieparser())

const createuser = async (req,res) =>{
    const data = req.body;
    const {email,name} = data
    const existing  = await User.findOne({email});
   
   

    if(existing){


      const token = jwt.sign(
         {id: existing._id, email: existing.email ,name: existing.name , city: existing.city, },
         process.env.SECKEY,
        {
          expiresIn: "3h"
        }
       )

      

          const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
          }

          res.status(200).cookie("flickettoken" , token, options).json({
            success: true,
            token,
            existing,
            message: "Signed in  Successfully !"
          })


     }
     else{
        const newuser = await User.create(data);
        const token = jwt.sign(
         {id: newuser._id, email: newuser.email ,name: newuser.name , city: newuser.city, },
         process.env.SECKEY,
        {
          expiresIn: "3h"
        }
       )

      

          const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
          }

          res.status(200).cookie("flickettoken" , token, options).json({
            success: true,
            token,
            newuser,
            message: "Signed in  Successfully !"
          })
     }

   }

   const changename = async (req,res) =>{
      const {name,uid} = req.body;

      const updatename = await User.findByIdAndUpdate({_id:uid},{name: name});
      res.status(201).json({message: "Changes Saved !", data: updatename})
   }

   const changemobile = async (req,res) =>{
      const {mobileno,uid} = req.body;

      const updatename = await User.findByIdAndUpdate({_id:uid},{mobileno: mobileno});
      res.status(201).json({message: "Changes Saved !", data: updatename})
   }

   const changecity = async (req,res) =>{
      const {city,uid} = req.body;

      const updatename = await User.findByIdAndUpdate({_id:uid},{city: city});
      res.status(201).json({message: "Changes Saved !", data: updatename})
   }

   const changemail = async (req,res) =>{
      const {email,uid} = req.body;

      const updatename = await User.findByIdAndUpdate({_id:uid},{email: email});
      res.status(201).json({message: "Changes Saved !", data: updatename})
   }

   const deleteacc = async (req,res) =>{
      const {uid} = req.body;

      const updatename = await User.findOneAndDelete(uid);
      res.status(201).json({message: "Account Deleted Successfully !", data: updatename})
   }

   const logout = async (req,res)=>{
      try {

         const {flickettoken} = req.cookies;
     
         if(flickettoken){
     
           
         await res.clearCookie("flickettoken",{
           httpOnly: true,
           secure: true,
           sameSite: 'none',
         //   domain: 'blognes7.vercel.app',
           path: '/',
           expires: new Date(Date.now()),
           
           
         });
     
         
           
           res.json({ message: 'Logged out successfully !' });
         }
     
         else{
           res.json({ message: 'Kindly, login first to continue.' });
         }
         
       } catch (error) {
         console.log(error);
         res.status(400).json(error);
       }
   }

   const oneuser = async (req,res)=>{
    try {
      const id = req.params.id
      const data = await User.findById(id);
      res.status(200).json(data)
      
    } catch (error) {
      console.log(error);
         res.status(400).json(error);
    }
   }

   


module.exports = {createuser,changename,changemobile,oneuser, changecity, changemail, deleteacc,logout}