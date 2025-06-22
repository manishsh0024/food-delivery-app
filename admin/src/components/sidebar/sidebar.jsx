import { NavLink } from "react-router-dom";
import { assets } from "../../assets/admin_assets/assets";



const Sidebar = () => {
  const menuItems = [
    { icon: assets.add_icon, label: "Add Items", path: "/add" },
    { icon: assets.order_icon, label: "List Items", path: "/list" },
    { icon: assets.order_icon, label: "Orders", path: "/orders" },
  ];

  return (
    <div className="mt-5 h-full min-h-screen bg-white shadow-xl px-4 py-8 flex flex-col gap-4 border-r border-t rounded-tr-2xl">
      {menuItems.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group cursor-pointer ${
              isActive
                ? "bg-orange-50 border-l-4 border-[#E45D1F]"
                : "hover:bg-orange-50 hover:border-l-4 hover:border-[#E45D1F]"
            }`
          }
        >
          <img
            src={item.icon}
            alt={item.label}
            className="w-6 h-6 opacity-80 group-hover:scale-110 transition"
          />
          <p className="text-gray-800 font-semibold group-hover:text-[#E45D1F]">
            {item.label}
          </p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
