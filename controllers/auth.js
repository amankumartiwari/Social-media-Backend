const User = require('../models/user');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.signup =  async (req,res)=>{
     const userExist = await User.findOne({email:req.body.email});
     if(userExist){
         return res.status(403).json({
             error: 'email is already taken'
         })
     }

    const user = await new User(req.body);
    await user.save();
     res.status(200).json({user})
}; 

exports.signin = (req,res)=>{

    const {email,password} = req.body;

    User.findOne({email} , (err,user)=>{
        if(err || !user){
            return res.status(401).json({
                err:'user with email not found'
            })
        }
  
         if(!user.authenticate(password)){
             return res.status(401).json({
                 err:"password doesn't match"
             })
         }

         const token = jwt.sign({_id:user._id},process.env.secret_key);
         res.cookie("t",token , {expire: new Date()+9999});

         const {_id , email , name} =user ; 
         return res.json({
               token ,
               user:{_id,name ,email}
         })

    } )

}

exports.signout = (req,res)=>{
  
  res.clearCookie("t");
  return res.json({
      msg:'signout successful'
  })
}

