//import wishlists collection/model
const wishlists = require('../models/wishlistSchema')

//add to wishlist
exports.addtowishlist = async (req,res) =>{
    //get product details from request

    //using destructuring ---- used to access the data easily from request body otherwise eg- we have to use like req.body.id
    const {id,title,price,image} = req.body

    //logic
    try {
        //check product already in wishlists
        const item = await wishlists.findOne({id})
        if (item) {
            res.status(402).json('Product Aleary in Your Wishlist')
        }
        else{
            //add product into wishlists by creating a new object
            const newproduct = new wishlists({
                id,
                title,
                price,
                image
            })
            //to store in db
            newproduct.save()
            //send response to front end
            res.status(200).json('Product Added To Your Wishlist')
        }
    }   
    catch (error) {
        res.status(401).json(error)    
    }
}

//get wishlist
exports.getwishlist = async (req,res) =>{
     //logic
     try {
       //get all product from wishlists collection in mongodb
       allproducts = await wishlists.find()
       res.status(200).json(allproducts)
   }
   catch (error) {
       res.status(401).json(error)
   }
}

//remove item from wishlist
exports.deletefromwishlist = async (req,res) =>{
    //get id from req
    const {id} = req.params

    //remove id from wishlist collection
    try {
        const removeItem = await wishlists.deleteOne({id})
        if (removeItem) {
            //get all wishlists item after removing the particular item
            const allitems = await wishlists.find()
            res.status(200).json(allitems)
        }
        else{
            res.status(404).json('Item Not Present in Your Wishlist')
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}