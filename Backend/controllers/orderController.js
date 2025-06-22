const orderModel = require("../models/orderModel.js");
const userModel = require("../models/userModel.js");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing The order
const placeOrder = async (req, res) => {
  
  //  front Url IN .ENV file as Client URL

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert to smallest currency unit
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: 2 * 100, // Convert to smallest currency unit
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Verify the order
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (success) {
      // Prevent double-update
      if (order.payment) {
        return res.json({ success: true, message: "Already Paid" });
      }

      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(
        order.userId,
        { cartData: {} }
      );
      res.json({
        success: true,
        message: "Payment verified",
      });
    } else {
      // Delete only if payment wasn't done
      if (!order.payment) {
        await orderModel.findByIdAndDelete(orderId);
      }
      res.json({
        success: false,
        message: "Payment Cancelled",
      });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// users Order
const usersOrders = async (req, res) => {
    
    try {
        const orders = await orderModel.find({
        userId: req.body.userId
    });
    res.json({
        success: true,
        data: orders
    })
    } catch (error) {
        console.log(error);
        res.json({
        success: false,
        message: "Error"
    })
    }


}

// Listing Orders for Admin Panal
const listOrders = async ( req, res ) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success:true,
      data:orders
    })
  } catch (error) {
    console.log(error)
    res.json({
      success:false,
      message:"Error"
    })
  }
}

//Update Status on Admin Panel
const updateStatus = async ( req, res ) => {
  try {
    
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({
      success:true,
      message:"Status Updated"
    })

  } catch(error) {
    console.log(error);
    res.json({
      success:false,
      message:"Error"
    })
  }
}



module.exports = {
  placeOrder,
  verifyOrder,
  usersOrders,
  listOrders,
  updateStatus
};
