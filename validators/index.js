exports.createPostValidator=(req,res,next)=>{

        req.check("title" , "write a title").notEmpty();
        req.check("title", "title must be between 4 to 150 chaaracter").isLength({
          min:4,
          max:150  
        })

        req.check("body" , "write a body").notEmpty();
        req.check("body", "body must be between 4 to 150 chaaracter").isLength({
          min:4,
          max:150  
        })

        const errors = req.validationErrors();
        if(errors){
            const firstError = errors.map( error => error.msg)[0];
            return res.status(400).json(({error:firstError}));
        }
  next();
}