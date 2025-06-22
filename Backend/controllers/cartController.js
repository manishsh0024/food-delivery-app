const userModel = require('../models/userModel.js');


// Function to add an item to the cart

const addToCart = async (req, res) => { 
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.productId]){
            cartData[req.body.productId] = 1;
        }
        else {
            cartData[req.body.productId] += 1;
        }
        await userModel.findByIdAndUpdate(
            req.body.userId,
            { cartData: cartData },
        );
        res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cartData: cartData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// remove / add item quantity
const removeItemQuantity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;
    const user = await userModel.findById(userId);
    let cart = user.cartData || {};

    if (action === "increase") {
      cart[productId] = (cart[productId] || 0) + 1;
    } else if (action === "decrease") {
      if (cart[productId] > 1) {
        cart[productId] -= 1;
      } else {
        delete cart[productId]; // if qty becomes 0
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData: cart });
    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// Function to remove an item from the cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await userModel.findById(userId);
    let cart = user.cartData || {};

    if (cart[productId]) {
      delete cart[productId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData: cart });
    res.status(200).json({ success: true, cart:"Cart is Empty" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Function to get the cart items

const getCartItems = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let cart = user.cartData || {};
        return res.status(200).json({
            success: true,
            cart: cart
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


module.exports = {
    addToCart,
    removeFromCart,
    getCartItems,
    removeItemQuantity
}