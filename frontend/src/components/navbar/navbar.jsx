import React, { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalAmount, token, setToken } = useContext(StoreContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsMenuOpen(false);
  };


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="container py-4 px-4 flex justify-between items-center bg-white relative">
      {/* Logo */}
      <Link to={"/"}>
        <img
          src={assets.Zaika}
          alt="logo"
          className="h-9 w-auto transition-transform duration-300 hover:scale-105"
        />
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="hidden lg:flex gap-8 text-gray-800 font-medium text-lg">
        <Link to={"/"}>
          <li className="cursor-pointer transition-colors duration-200 hover:text-red-500">
            Home
          </li>
        </Link>
        <li className="cursor-pointer transition-colors duration-200 hover:text-red-500">
          Menu
        </li>
        <li className="cursor-pointer transition-colors duration-200 hover:text-red-500">
          Mobile-App
        </li>
        <li className="cursor-pointer transition-colors duration-200 hover:text-red-500">
          Contact Us
        </li>
      </ul>

      {/* Right Section: Search, Cart, Sign In, Menu Icon */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <img
          src={assets.search_icon}
          alt="search"
          className="h-6 w-6 cursor-pointer hidden lg:block"
        />

        {/* Cart */}
        <Link to={"/cart"}>
          <div className="relative">
            {/* DOT ON CART */}
            <h1
              className={
                totalAmount === 0
                  ? ""
                  : "hidden md:flex absolute -top-1 right-1 p-[2px] bg-red-500 w-[8px] h-[8px] rounded-full"
              }
            ></h1>
            <img
              src={assets.basket_icon}
              alt="basket"
              className="h-6 w-6 cursor-pointer hidden lg:block"
            />
          </div>
        </Link>

        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="cursor-pointer hidden md:block bg-[#FF4C24] text-white px-4 py-2 rounded-md transition-all duration-300 hover:border-black hover:bg-white border hover:text-[#FF4C24]"
          >
            Sign In
          </button>
        ) : (
          <div className="relative">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-9 h-9 rounded-full cursor-pointer border-2 border-[#E45D1F] p-[2px] hover:scale-105 transition-transform duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <ul
              className={`absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl transition-all duration-200 z-50 overflow-hidden ${
                isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <Link to={"/myorder"}>
              <li className="flex items-center px-4 py-3 hover:bg-[#FFF4EF] cursor-pointer transition-colors duration-150">
                <img
                  src={assets.bag_icon}
                  alt="Orders"
                  className="w-5 h-5 mr-3"
                />
                <p className="text-[#333] font-medium">My Orders</p>
              </li>
              </Link>
              <hr className="border-t border-[#f2f2f2]" />
              <li
                onClick={logout}
                className="flex items-center px-4 py-3 hover:bg-[#FFF4EF] cursor-pointer transition-colors duration-150"
              >
                <img
                  src={assets.logout_icon}
                  alt="Logout"
                  className="w-5 h-5 mr-3"
                />
                <p className="text-[#E45D1F] font-medium">Logout</p>
              </li>
            </ul>
          </div>
        )}

        {/* Hamburger Icon on Mobile */}
        <button className="lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoClose className="text-2xl text-gray-800" />
          ) : (
            <IoIosMenu className="text-2xl text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 flex flex-col gap-4 z-50 lg:hidden">
          <Link to={"/"} onClick={() => handleClick()}>
            <li className="cursor-pointer transition-colors duration-200 hover:text-red-500 list-none">
              Home
            </li>
          </Link>
          <li className="cursor-pointer transition-colors duration-200 hover:text-red-500 list-none">
            Menu
          </li>
          <li className="cursor-pointer transition-colors duration-200 hover:text-red-500 list-none">
            Mobile-App
          </li>
          <li className="cursor-pointer transition-colors duration-200 hover:text-red-500 list-none">
            Contact Us
          </li>
          <Link to={"/cart"} onClick={() => handleClick()}>
            <li className="cursor-pointer transition-colors duration-200 hover:text-red-500 list-none">
              Cart
            </li>
          </Link>
          {!token ? (
            <button
              onClick={() => {
                setShowLogin(true), handleClick();
              }}
              className="cursor-pointer bg-[#FF4C24] text-white px-4 py-2 rounded-md transition-all duration-300 hover:border-black hover:bg-white border hover:text-[#FF4C24]"
            >
              Sign In
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
