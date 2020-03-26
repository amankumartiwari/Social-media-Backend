const User = require('../models/user');
const _= require('lodash');
const formidable = require('formidable')
const fs = require('fs')

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
   
  let form = new formidable.IncomingForm();
  form.keepExtensions=true;
 
  form.parse( req , (err,fields,files) =>{
      if(err){
          return res.status(400).json({
              error:"photo caould not be uploaded"
          })
      }
   let user = req.profile
   user = _.extend(user,fields)
   user.updated = Date.now();

   if(files.photo){
       user.photo.data=fs.readFileSync(files.photo.path)
       user.photo.contentType= files.photo.type 
   }

    user.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        user.hashed_password=undefined;
        user.salt =undefined
        res.json(user);
    })

  })

}

exports.userPhoto = (req,res,next)=>{

   if(req.profile.photo.data){
       res.set(("content-type",req.profile.photo.contentType));
       return res.send(req.profile.photo.data)
   }
   next();

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


