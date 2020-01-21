const Post = require('../models/post')

exports.getRoutes=(req,res)=>{
    const post = Post.find().then(posts=>{
        return res.status(200).json({
            posts:posts
        });
    }).catch(err=>{
        console.log(err); 
    })
}

exports.createPost=(req,res)=>{
  const post= new Post(req.body);
  //console.log(" req body is ", req.body);

   post.save().then(result=>{
    res.status(200).json({
        post:result
   });
   })      
   

}