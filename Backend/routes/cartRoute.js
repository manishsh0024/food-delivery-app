const express = require('express');
const { addToCart, removeFromCart, getCartItems, removeItemQuantity } = require('../controllers/cartController.js');
const authMiddleware = require('../middleware/auth.js');


const cartRouter = express.Router();


// Route to add an item to the cart

cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/addquantity', authMiddleware, removeItemQuantity);
cartRouter.post('/remove', authMiddleware, removeFromCart);
cartRouter.post('/items', authMiddleware, getCartItems);


module.exports = cartRouter;