const User = require('../models/user');

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