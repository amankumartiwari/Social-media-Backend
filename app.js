const express =require('express');
const app= express();
const morgan=require('morgan')
//const mongoose =require('mongoose')
const fs = require('fs')
const cors = require('cors')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const expressValidator = require('express-validator')
const dotenv = require('dotenv');
dotenv.config();

// mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true , useUnifiedTopology: true }).then( ()=>{console.log('CONNECTED  to DB')} );

// mongoose.connection.on("error",(err)=>{ 
//      console.log(`error in connecting db ${err.message}`);
// }) 

const port = process.env.PORT || 8080

app.use(bodyparser.json());
app.use(cookieparser());
app.use(expressValidator());
app.use(cors());

// const postRoutes = require('./routes/posts');
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user')

app.get('/',  (req,res)=>{

    fs.readFile('./docs/apiDocs.json' , (err,Data)=>{

          if(err){
              return res.status(400).json({
                  error:err
              })
          }
     const docs = JSON.parse(Data);
     return res.json(docs);

    } )

})

app.use(morgan('dev'))
// app.use('/', postRoutes);
// app.use('/',authRoutes);
// app.use('/',userRoutes);
app.use( (err,req,res,next)=>{
    if(err.name == 'UnauthorizedError'){
        res.status(401).json({err:'token error'})
    }
} )

app.listen(port , ()=>{
    console.log(`server is running at port:${port} `);
})