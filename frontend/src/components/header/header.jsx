import { motion as Motion } from 'framer-motion';

const Header = () => {
  return (
    <div className="container">
      <div className="relative bg-[url('/headerimg/header_img.png')] bg-cover bg-center md:py-0 md:h-[60vh] rounded-lg overflow-hidden">

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-lg z-0"></div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full p-10">
          {/* Animated h1 */}
          <Motion.h1
            className="text-4xl font-bold mb-4 text-white w-[90%] md:w-[50%]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Order your favourite food here
          </Motion.h1>

          {/* Animated p */}
          <Motion.p
            className="font-serif text-lg text-white w-[100%] md:w-[70%]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Experience deliciousness at your doorstep with our all-new food delivery
            app! Whether you're craving rich North Indian curries, sizzling
            starters, freshly baked bread, or refreshing beverages — our app brings
            the full Shree Ram Pavitra Bhojnalaya experience right to your home.
            Designed for speed and simplicity, you can explore our complete menu,
            customize your order, track your delivery in real-time, and enjoy
            exclusive app-only discounts.
          </Motion.p>

          <button className="text-base font-medium bg-white text-[#E45D1F] px-5 py-2 mt-6 rounded-lg hover:bg-gray-100 transition">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
