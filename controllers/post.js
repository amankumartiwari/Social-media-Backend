const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')

exports.getRoutes=(req,res)=>{
    const post = Post.find().then(posts=>{
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