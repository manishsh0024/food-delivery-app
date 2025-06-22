import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemList = ({url}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const listData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/food/list`);
      setList(res.data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.post(`${url}/api/food/remove`, { id });
      if (res.data.success) {
        toast.success(res.data.message);
        await listData(); // refresh list
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Something went wrong while deleting");
    }
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4">
            <img
              src={`http://localhost:4000/images/${item.image}`}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>{item.category}</span>
              <span>₹{item.price}</span>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-gray-600 text-red-600 px-2 py-1 rounded-md hover:bg-gray-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default ItemList;
