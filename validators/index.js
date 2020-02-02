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

exports.userSignupValidator= (req,res,next)=>{
  // for name
  req.check('name',"write a name").notEmpty();

  // for email

  req.check("email" , "email must be 3 to 32 character")
  .matches(/.+\@.+\..+/)
  .withMessage('email ust contain @')
  .isLength({
    min:4,
    max:150
  })

  //check for password

  req.check( "password" , "password must not be empty").notEmpty();
  req.check("password")
  .isLength({
    min:6,
  })
  .withMessage('password must contain 6 character')
  .matches(/\d/)
  .withMessage('password must contain a number')

  const errors = req.validationErrors();
        if(errors){
            const firstError = errors.map( error => error.msg)[0];
            return res.status(400).json(({error:firstError}));
        }
  next();

}