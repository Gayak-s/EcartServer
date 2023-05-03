//import cart collection
const cartItems = require('../models/cartSchema')


//add to cart
exports.addtocart = async (req,res) =>{
    //get product details from req.body by destructuring
    const {id,title,image,price,quantity} = req.body

    //logic
    try {
        //check product is in cart collection
        const product = await cartItems.findOne({id})

        if (product) {
            //product is in collection so increment its quantity
            product.quantity +=1
            //then update grantTotal
            product.grantTotal = product.price * product.quantity
            //then save changer is mongodb
            product.save()
            //send response to client
            res.status(200).json('Product Quantity incremented in Your Cart...') 
        }
        else{
            //product is not present so add to collection
            const newProduct = new cartItems({
                id,
                title,
                price,
                image,
                quantity,
                grantTotal:price
            })
            //save nre product to mongodb
            await newProduct.save()
            //send response to client
            res.status(200).json("Product Added To Your Cart..")
        }
    }
    catch (error) {
     res.status(401).json(error)   
    }
    
}



//get cart
exports.getCart = async (req,res) =>{
    //get all items in cart collection
    try {
        const allitems = await cartItems.find()
        res.status(200).json(allitems)
    }
    catch (error) {
        res.status(401).json(error)
    }
}




//remove cart item
exports.removeItem = async (req,res) =>{
     const {id} = req.params
     try {
        const deleteitem = await cartItems.deleteOne({id})
        if (deleteitem) {
            //get all cartitems, after removing the particular item
            const allitems = await cartItems.find()
            res.status(200).json(allitems)
        }
        else{
            res.status(404).json('Item Not Present in Your Cart')
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}


//empty cart
exports.emptyCart = async (req,res) =>{
    try {
        await cartItems.deleteMany({})
        res.status(200).json('Your Cart is Empty')
    }
    catch (error) {
        res.status(401).json(error)
    }
}

// cart item increment quantity
exports.incrementQuantity = async (req,res) =>{
    const {id} = req.params
    try {
        const item = await cartItems.findOne({id})
        if (item) {
            item.quantity += 1
            item.grantTotal = item.quantity * item.price
            await item.save()
            const products = await cartItems.find()
            res.status(200).json(products)
        }
        else{
            res.status(401).json('item is not present in your cart')
        }
    }
    catch(error) {
        res.status(401).json(error)   
    }
}


// cart item decrement quantity
exports.decrementQuantity = async (req,res) =>{
    const {id} = req.params
    try {
        const item = await cartItems.findOne({id})
        if (item) {
            item.quantity -= 1
            if (item.quantity==0) {
                //remove item from cart collection
                await cartItems.deleteOne({id})
                //get all cart collection item after removing
                const allitems = await cartItems.find()
                res.status(200).json(allitems)
            }
            else {
                item.grantTotal = item.quantity * item.price
                await item.save()
                const allitems = await cartItems.find()
                res.status(200).json(allitems)
            }
        }
        else{
            res.status(401).json('item is not present in your cart')
        }
    }
    catch(error) {
        res.status(401).json(error)   
    }
}