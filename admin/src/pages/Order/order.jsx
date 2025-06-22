import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets";
import { useCallback } from "react";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      const paidOrders = res.data.data.filter((item) => item.payment === true);

      if (res.data.success) {
        setOrders(paidOrders.reverse());
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [url]);

  const statusHandler = async (event, orderId) => {
    const res = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });

    if (res.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-6 text-center">Recent Orders</h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={assets.parcel_icon}
                alt="parcel icon"
                className="w-10 h-10"
              />
              <p className="text-sm font-medium text-gray-700">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i < order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-gray-800">
                {order.address.firstname} {order.address.lastname}
              </p>
              <p className="text-gray-600 text-sm">
                {order.address.street}
              </p>
              <p className="text-gray-600 text-sm">
                {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
              </p>
              <p className="text-gray-600 text-sm">
                Phone: {order.address.phone}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
              <p>Items: {order.items.length}</p>
              <p className="font-semibold text-green-600"> <span className="text-black">Total amount :</span> {`₹${order.amount}`}</p>
            </div>
          
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="w-full mt-3 px-3 py-2 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
