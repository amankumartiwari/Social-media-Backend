const User = require('../models/user');
const _= require('lodash');
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

exports.getUser  = (req,res)=>{
   // console.log("asd");
    //console.log(req.profile);
    return res.status(200).json(req.profile)
}

exports.updateUser = (req,res)=>{
   let user= req.profile;

   user= _.extend(user,req.body)  // it will change value of user after coomparing with req.body

   user.updated= Date.now();
   user.save((err)=>{
       if(err){
           return res.status(401).json({
               err:'unauthorized'
           })
       }
       return res.status(200).json({user});
   })
}

exports.deleteUser = (req,res)=>{
    let user = req.profile;

    user.delete((err)=>{
        if(err){
            return res.status(401).json({
                err:'unauthorized'
            })
        }
        return res.status(200).json({
            msg:'user successfully deleted'
        });
    })
}


