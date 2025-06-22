const express = require('express');
const authMiddleware = require('../middleware/auth.js');
const { placeOrder, verifyOrder, usersOrders, listOrders, updateStatus } = require('../controllers/orderController.js');

const orderRouter = express.Router();



// Place Order Route
orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware,usersOrders);
orderRouter.get('/list',listOrders);
orderRouter.post('/status',updateStatus);



module.exports = orderRouter;


