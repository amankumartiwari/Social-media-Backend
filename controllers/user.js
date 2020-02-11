const User = require('../models/user');

exports.userFindById =(req,res,next,id)=>{

     User.findById(id).exec( (err,user)=>{

          if(err || !user){
              return res.status(400).json({
                  "err":"User not found"
              })
          }

         req.profile =user;  // add profile information into user object
         next();
     } )
}

exports.hasAutherization = (req,res,next)=>{

 const authorized = req.profile && req.auth && req.profile._id===req.auth._id;

   if(!authorized){
       return res.status(403).json({
           error:'user not authorized'
       })
   }
}

exports.getAllUsers = (req,res)=>{

    User.find((err,users)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        return res.status(200).json({users})
    }).select("name email created updated")
}