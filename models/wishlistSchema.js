//import mongoose
const mongoose = require('mongoose')

//define schema for wishlist collection to store data
const wwishlistSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
})

//create model to store wishlist
const wishlists = new mongoose.model('wishlists',wwishlistSchema)

//export model
module.exports = wishlists