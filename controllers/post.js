const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')




exports.postFindById = (req,res , next , id)=>{
    Post.findById(id)
    .populate("postedBy" , "_id name")
    .exec( (err , post)=>{
             if(err || !post){
                 return res.status(400).json({
                     error:err
                 })
             }
      req.post = post;
      next();
    } )
}


exports.getRoutes=(req,res)=>{
    const post = Post.find()
    .populate( "postedBy","_id name")
    .select("_id title body")
    .then(posts=>{
        return res.status(200).json({
            posts:posts
        });
    }).catch(err=>{
        console.log(err); 
    })
}

exports.createPost=(req,res,next)=>{

  let form = new formidable.IncomingForm()
  form.keepExtensions=true;

  form.parse( req , (err,fields , files)=>{
      if(err){
          return res.status(400).json({
              err
          })
      }

      let post = new Post(fields);
      post.postedBy = req.profile;
         
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }

        post.save( (err,result)=>{
            if(err){
                return res.status(400).json({
                    err
                })    
            }
            return res.status(200).json(result);
        } )

  } )
}

exports.postByUser =(req,res)=>{

  Post.find({ postedBy: req.profile._id })
  .populate("postedBy","_id name")
  .sort("_created")
  .exec((err,posts)=>{

      if(err){
          return res.status(400).json({
              error:err
          })
        }
        return res.status(200).json(posts);
  })
}

exports.isPoster = (req,res)=>{

let isPoster= req.post && req.auth && req.post.postedBy._id === req.auth._id;
 
   if(!isPoster){
       return res.staus(403).json({
           msg:'user not authorized',
       })
   }
  next();
}


exports.deletePost = (req,res)=>{

   let post= req.post;

   post.remove((err,post)=>{
       if(err){
           return res.status(400).json({
              error:err
           })
       }

       return res.json({
           msg:"post deleted succesfully"
       })

   })


}











