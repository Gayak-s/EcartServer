//define mongodb connection

//import mongoose
const mongoose = require('mongoose')
const DB = process.env.DATABASE

//connnection def
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('Mongodb atlas connected Successfully');
}).catch((err)=>{
    console.log(err);
})

