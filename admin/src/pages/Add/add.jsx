import React, { useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItems = ({url}) => {

    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        category: "Salad",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]: value}))
    }

    
    const onSubmitHandler = async(event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",data.price);
        formData.append("category",data.category);
        formData.append("image",image)
        const res = await axios.post(`${url}/api/food/add`, formData);
        if(res.data.success) {
            
            setData({
                name: "",
                description: "",
                price: 0,
                category: "Salad",
            })
            setImage(false)
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }
    }   

  return (
    <div className="container mt-5">
      <form onSubmit={onSubmitHandler} className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 flex flex-col gap-6">
        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <p className="text-gray-700 font-semibold">
            Upload Image
          </p>
          <label
            htmlFor="image"
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center hover:border-[#E45D1F] transition"
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area }
              alt="upload"
              className="w-32 h-32 object-contain"
            />
          </label>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" className="hidden" required/>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-semibold">Product Name</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter Item Name"
            className="border border-gray-300 rounded-lg p-2 outline-none focus:border-[#E45D1F] transition"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-semibold">
            Product Description
          </label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Enter Item Description"
            className="border border-gray-300 rounded-lg p-2 outline-none focus:border-[#E45D1F] transition"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Category & Price */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-gray-700 font-semibold">
              Product Category
            </label>
            <select
            onChange={onChangeHandler}
              name="category"
              className="border border-gray-300 rounded-lg p-2 outline-none focus:border-[#E45D1F] transition"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-gray-700 font-semibold">Product Price</label>
            <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="Enter Item Price"
                required
                className="border border-gray-300 rounded-lg p-2 outline-none focus:border-[#E45D1F] transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#E45D1F] hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition w-full"
        >
          Add Item
        </button>
          <ToastContainer />
      </form>
    </div>
  );
};

export default AddItems;
