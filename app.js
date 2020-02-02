const express =require('express');
const app= express();
const morgan=require('morgan')
const mongoose =require('mongoose')
const bodyparser = require('body-parser')
const expressValidator = require('express-validator')
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true , useUnifiedTopology: true }).then( ()=>{console.log('CONNECTED  to DB')} );

mongoose.connection.on("error",(err)=>{ 
     console.log(`error in connecting db ${err.message}`);
}) 

const port = process.env.PORT || 8080

app.use(bodyparser.json());
app.use(expressValidator());

const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');


app.use(morgan('dev'))
app.use('/', postRoutes);
app.use('/',authRoutes);

app.listen(port , ()=>{
    console.log(`server is running at port:${port} `);
})