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


module.exports = {createuser}