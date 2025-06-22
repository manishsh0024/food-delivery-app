import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const FoodDisplay = ({ category }) => {

  const { food_list , increaseCount, decreaseCount, cartItem , url} = useContext(StoreContext);



  // Filter by category 
  const filteredList =
    category.toLowerCase() === "all"
      ? food_list
      : food_list.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#E45D1F]">
        Top Dishes Near You
      </h1>
      {/* FOOD CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredList.map((item, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Image + Add/Remove Icons */}
      <div className="relative">
        <img
          src={`${url}/images/${item.image}`}
          alt={item.name}
          className="w-full h-48 object-cover rounded-t-2xl"
        />

        {/* Add/Remove Buttons */}
        <div className="absolute bottom-3 right-3">
          {cartItem[item._id] > 0 ? (
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-md">
              <img
                src={assets.remove_icon_red}
                className="w-6 h-6 cursor-pointer"
                alt="remove"
                onClick={() => decreaseCount(item._id)}
              />
              <p className="px-2 text-sm font-bold">{cartItem[item._id]}</p>
              <img
                src={assets.add_icon_green}
                className="w-6 h-6 cursor-pointer"
                alt="add"
                onClick={() => increaseCount(item._id)}
              />
            </div>
          ) : (
            <img
              src={assets.add_icon_white}
              className="w-8 h-8 cursor-pointer"
              alt="add"
              onClick={() => increaseCount(item._id)}
            />
          )}
        </div>
      </div>

      {/* Food Details */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#E45D1F] truncate">{item.name}</h2>
            <img
              src={assets.rating_starts}
              alt="Rating"
              className="w-20 h-auto"
            />
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
        </div>

        {/* Price + Go to Cart */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-gray-800">₹{item.price}</span>
          <Link to="/cart">
            <button className="px-4 py-2 bg-[#E45D1F] text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
              Go to cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default FoodDisplay;
