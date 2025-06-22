import React from "react";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-14">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <img
            src={assets.Zaika}
            alt="logo"
            className="h-9 w-auto mb-4 transition-transform duration-300 hover:scale-105"
          />
          <p className="text-sm text-gray-400">
            Delicious food at your doorstep. Fresh. Fast. Reliable.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[#E45D1F] font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Delivery</a></li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-[#E45D1F] font-semibold mb-3">Get In Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 123 Street, YourCity</li>
            <li>✉️ support@example.com</li>
            <li>📞 +91 98765 43210</li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-[#E45D1F] font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
