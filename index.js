//automatically load env file to our app
require('dotenv').config()

//import express
const express = require('express')

//import cors
const cors = require('cors')

//import router
const router = require('./routes/router')

//import connection file
require('./db/connection')
//create server application using express
const server = express()

//use in server app
server.use(cors())
server.use(express.json())
server.use(router)


//route
// server.get('/',(req,res)=>{
//     res.status(200).json('E cart Server Started!!!!!')
// })

//to store port number
const PORT = 3000
//run server
server.listen(PORT,()=>{
    console.log('E cart server started at port',PORT);
})