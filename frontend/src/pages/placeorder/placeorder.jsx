import React, { useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Placeorder = () => {
  const { totalAmount, token, food_list, cartItem, url } =
    useContext(StoreContext);

    const navigate = useNavigate();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Place Order SubmitHandler
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"]= cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount + 2,
    };
    try {
      let res = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (res.data.success) {
        const { sessionUrl } = res.data;
        window.location.replace(sessionUrl);
      } else {
        alert("Something went wrong while placing order.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Server error. Please try again later.");
    }
  };

  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if (totalAmount === 0){
      navigate('/');
    }
  },[token,navigate,totalAmount]);

  return (
    <div className="container">
      <form
        onSubmit={placeOrder}
        className="flex flex-col items-center lg:flex-row gap-8 mt-5 border-t-1 border-black bg-gray-50 p-5"
      >
        {/* Left Part: Delivery Info */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#E45D1F] mb-6">
            Delivery Information
          </h2>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              name="firstname"
              onChange={onChangeHandler}
              value={data.firstname}
              type="text"
              placeholder="First Name"
              className="input-field"
              required
            />
            <input
              name="lastname"
              onChange={onChangeHandler}
              value={data.lastname}
              type="text"
              placeholder="Last Name"
              className="input-field"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email"
              className="input-field"
              required
            />
          </div>

          {/* Street & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              type="text"
              placeholder="Street"
              className="input-field"
              required
            />
            <input
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              className="input-field"
              required
            />
          </div>

          {/* State & Zip Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
              className="input-field"
              required
            />
            <input
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Zip Code"
              className="input-field"
              required
            />
          </div>

          {/* Country & Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
              className="input-field"
              required
            />
            <input
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="text"
              placeholder="Phone Number"
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Right Part: Summary */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#E45D1F] mb-4">
              Cart Summary
            </h2>

            <div className="flex justify-between text-gray-800 mb-2">
              <span className="font-medium">Cart Total:</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex justify-between text-gray-800 mb-4">
              <span className="font-medium">Delivery Charges:</span>
              <span>₹{totalAmount === 0 ? 0 : totalAmount + 2}</span>
            </div>

            <hr className="mb-4 border-gray-300" />

            <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
              <span>Total Payable:</span>
              <span>₹{totalAmount + totalAmount === 0 ? 0 : 2}</span>
            </div>

            <button type="submit" className="w-full bg-[#E45D1F] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300">
              Proceed to Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Placeorder;
