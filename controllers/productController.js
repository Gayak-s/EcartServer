//import products collection/model
const products = require('../models/productSchema')

// get all-products api
exports.getallproducts = async (req,res)=>{
    //logic
    try {
         //get all product from products collection in mongodb
        allproducts = await products.find()
        res.status(200).json(allproducts)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

// get a purticular product by id
exports.viewproduct = async (req,res) =>{
    //get product id from req
    const id = req.params.id

    //logic
    try{
        //check id in present in mongodb
        const product = await products.findOne({id:id})
        if (product) {
            //send to client
            res.status(200).json(product)
        } else {
            res.status(401).json("Product Not Found")
        }
    }
    catch(err){
        res.status(401).json(error)
    }
}