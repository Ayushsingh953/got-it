require('dotenv').config({path:"./config.env"});
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
//Give routes
const givefoodroute=require('./routes/give/giveFood')
const givebookroute=require('./routes/give/giveBook')
const givemedroute=require('./routes/give/giveMed')
const givetoyroute=require('./routes/give/giveToy')
const giveclothroute=require('./routes/give/giveCloth')


//Take routes
const takefoodroute=require('./routes/take/takeFood')
const takebookroute=require('./routes/take/takeBook')
const takemedroute=require('./routes/take/takeMed')
const taketoyroute=require('./routes/take/takeToy')
const takeclothroute=require('./routes/take/takeCloth')

//edit products
const editroute=require('./routes/Edit');

//auth route
const authroute=require("./routes/auth");

const userroute=require("./routes/user");
const { config } = require('dotenv');

//connecting to database
mongoose.connect('mongodb+srv://Ayush_21:Password_3000@cluster0.qf49u.mongodb.net/GOT_Database?retryWrites=true&w=majority',{
     useNewUrlParser: true, useUnifiedTopology: true 
})
    

const app=express();
app.use(express.static('./bookUploads/'))
app.use(express.static('./foodUploads/'))
app.use(express.static('./clothUploads/'))
app.use(express.static('./medUploads/'))
app.use(express.static('./toyUploads/'))
app.use(express.static('./userUploads/'))

app.use(cors());
app.use(express.json());

//Give middlewares
app.use('/give',givefoodroute);
app.use('/give',givebookroute);
app.use('/give',givemedroute);
app.use('/give',givetoyroute);
app.use('/give',giveclothroute);

//Take middlewares
app.use('/take',takefoodroute);
app.use('/take',takebookroute);
app.use('/take',takemedroute);
app.use('/take',taketoyroute);
app.use('/take',takeclothroute);

//edit middleware
app.use('/profile',editroute);
app.use('/profile',userroute);

//auth middleware
app.use('/auth',authroute);


const port=process.env.PORT||5500;
app.route('/').get((req,res)=>{
    res.json({
        "message":"Hello Ayush singh"
    });
});


app.route('/profile').get((req,res,next)=>{
    res.json({
        message:"user profile"
    });
});

app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
res.status(error.status||500);
res.json({
    error:{
        message:error.message
    }
});
});


app.listen(port,(req,res) => {
    console.log("server is running on port "+port);
})