import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaRupeeSign,
  FaMapMarkerAlt,
} from "react-icons/fa";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      const paidOrders = res.data.data.filter(
        (order) => order.payment === true
      );
      setData(paidOrders.reverse());
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  }, [url, token]);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token, url, fetchOrders]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaBoxOpen className="text-orange-500" /> My Orders
      </h1>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-md shadow-sm border">
          <p className="text-gray-600 text-lg font-medium">
            No paid orders found
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Browse our menu and place your first order today!
          </p>
          <a
            href="/menu"
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Browse Menu
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-md border p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                {order.items.length > 0 && (
                  <img
                    src={`${url}/images/${order.items[0].image}`}
                    alt={order.items[0].name}
                    className="w-10 h-10 rounded border object-cover"
                  />
                )}
                <p className="text-sm font-medium text-gray-700 flex-1">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} x {item.quantity}
                      {i < order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>

              {/* Address Info */}
              <div className="mb-2 text-sm text-gray-700">
                <p className="font-semibold text-gray-800">
                  {order.address.firstname} {order.address.lastname}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p>Phone: {order.address.phone}</p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4 pt-2 border-t text-sm text-gray-700">
                <p>Items: {order.items.length}</p>
                <p className="font-semibold text-green-600">
                  <span className="text-black">Total amount:</span> ₹
                  {order.amount}
                </p>
              </div>

              {/* Track button */}
              <div className="flex justify-between items-center mt-4">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <FaCalendarAlt className="text-orange-400" />
                  {new Date(order.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Food Processing"
                      ? "bg-orange-100 text-black"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
