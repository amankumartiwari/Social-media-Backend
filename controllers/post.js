const Post = require('../models/post')

exports.getRoutes=(req,res)=>{
    res.send(' hello from node js  :) : ):))');
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