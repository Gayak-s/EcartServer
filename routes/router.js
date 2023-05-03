// define routes for client requests
//import express to create object for Router class inorder to setup path
const express = require('express')

//import product controller
const productController = require('../controllers/productController')

//import product controller
const wishlistController = require('../controllers/wishlistController')

// import cart conreoller
const cartController = require('../controllers/cartController')

const router = new express.Router()

//resolve client request in various server routes

// products api
//get-all products
router.get('/products/all-products',productController.getallproducts)
//view products/id
router.get('/products/view-product/:id',productController.viewproduct)



//wishlist api
//add to wishlist
router.post('/wishlist/add-product',wishlistController.addtowishlist)
//get-all wishlist products
router.get('/wishlist/view-products',wishlistController.getwishlist)
//remove wishlist product
router.delete('/wishlist/remove-item/:id',wishlistController.deletefromwishlist)

//cart api
//add to cart
router.post('/cart/add-product',cartController.addtocart)
//get cart items
router.get('/cart/get-all-product',cartController.getCart)
//remove cart item
router.delete('/cart/remove-item/:id',cartController.removeItem)
//empty cart
router.delete('/cart/remove-all',cartController.emptyCart)
//increment product quantity
router.get('/cart/item-increment/:id',cartController.incrementQuantity)
//decrement product quantity
router.get('/cart/item-decrement/:id',cartController.decrementQuantity)

//export router
module.exports = router