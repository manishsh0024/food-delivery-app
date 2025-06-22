import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItem,
    food_list_WithDetails,
    decreaseCount,
    increaseCount,
    removeFromCart,
    totalAmount,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-[#E45D1F] text-center">
        Your Cart
      </h2>

      {food_list_WithDetails.length > 0 ? (
        <>
          <div className="hidden md:grid grid-cols-6 text-center font-semibold text-gray-700 border-b pb-3 mb-4">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Action</p>
          </div>

          <div className="flex flex-col gap-6">
            {food_list_WithDetails.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-2 md:grid-cols-6 items-center gap-4 bg-white p-4 rounded-lg shadow-md"
              >
                {/* Image */}
                <div className="flex justify-center">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>

                {/* Title */}
                <p className="text-center text-sm md:text-base font-medium">
                  {item.name}
                </p>

                {/* Price */}
                <p className="text-center text-gray-700 font-medium">
                  ₹{item.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                  <img
                    src={assets.remove_icon_red}
                    className="w-6 h-6 cursor-pointer"
                    alt="Remove"
                    onClick={() => decreaseCount(item._id)}
                  />
                  <span className="text-sm font-bold">
                    {cartItem[item._id]}
                  </span>
                  <img
                    src={assets.add_icon_green}
                    className="w-6 h-6 cursor-pointer"
                    alt="Add"
                    onClick={() => increaseCount(item._id)}
                  />
                </div>

                {/* Total for item */}
                <p className="text-center font-semibold">
                  ₹{item.price * cartItem[item._id]}
                </p>

                {/* Remove single item (X icon) */}
                <div className="flex justify-center">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-black text-sm px-5 py-1 rounded-md bg-[#E45D1F] font-bold hover:scale-110 transition"
                    title="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center flex flex-col md:flex-row justify-between items-center">
            <div className=" flex gap-2  justify-center">
              <input
                className="border-1 border-black rounded-md px-2"
                type="text"
                placeholder="Promo Code"
              />
              <button className="rounded-md bg-gray-400 text-md px-3 py-1">
                Submit
              </button>
            </div>

            {/* Grand Total */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-96">
              <h2 className="text-2xl font-bold text-[#E45D1F] mb-4">
                Cart Summary
              </h2>

              <div className="flex justify-between text-gray-800 mb-2">
                <span className="font-medium">Cart Total:</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between text-gray-800 mb-4">
                <span className="font-medium">Delivery Charges:</span>
                <span>₹2</span>
              </div>

              <hr className="mb-4 border-gray-300" />

              <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
                <span>Total Payable:</span>
                <span>₹{totalAmount + 2}</span>
              </div>

              <button
                onClick={() => navigate("/order")}
                className="w-full bg-[#E45D1F] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className=" text-gray-600 text-center mt-10 text-lg">
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default Cart;
