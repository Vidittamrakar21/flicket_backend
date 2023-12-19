const User = require('../models/user');

const createuser = async (req,res) =>{
    const data = req.body;
    const {email} = data
    const existing  = await User.findOne({email});
   

    if(existing){

         res.status(200).json({message: "User already exists !"})
     }
     else{
        const newuser = await User.create(data);
        res.status(201).json({message: "Signed in successfully !", data: newuser})
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

   


module.exports = {createuser,changename,changemobile, changecity, changemail, deleteacc}