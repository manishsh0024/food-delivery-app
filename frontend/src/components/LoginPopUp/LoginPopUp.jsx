import React, { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const res = await axios.post(newUrl, data);
    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message, {
        position: "top-right",
      });
      setShowLogin(false);
      
    } else {
      toast.error(res.data.message, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white w-[90%] sm:w-[70%] md:w-[40%] rounded-xl p-8 shadow-xl">
        {/* Close Icon */}
        <img
          src={assets.cross_icon}
          alt="cross_icon"
          className="w-7 h-7 bg-[#E45D1F] absolute top-4 right-4 cursor-pointer transition-transform duration-300 hover:scale-110 p-[2px] rounded-full"
          onClick={() => setShowLogin(false)}
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6 text-[#E45D1F]">
          {currState}
        </h1>

        {/* Form */}
        <form onSubmit={onLogin} className="flex flex-col space-y-4">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E45D1F]"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter Email"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E45D1F]"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter Password"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E45D1F]"
          />

          <div className="flex items-center gap-2">
            <input
              className="w-4 h-4 accent-[#E45D1F] cursor-pointer"
              type="checkbox"
              required
            />
            <p>By continuing , I agree to the Terms and Policy</p>
          </div>

          <button
            type="submit"
            className="bg-[#E45D1F] text-white py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 font-semibold"
          >
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Toggle Sign In / Up */}
        <p className="mt-4 text-sm text-center text-gray-600">
          {currState === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            onClick={() =>
              setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")
            }
            className="text-[#E45D1F] cursor-pointer font-medium ml-1 hover:underline"
          >
            {currState === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPopUp;
