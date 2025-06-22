// import React from 'react';
// import { menu_list } from '../../assets/frontend_assets/assets';

// const ExploreMenu = ({ category, setCategory }) => {
//   return (
//     <div className='container pt-5'>
//       <h1 className='text-3xl font-bold pb-2 text-[#E45D1F]'>Explore Menu</h1>
//       <p className='text-lg pb-2'>
//         Choose from a diverse menu featuring a delectable array of food category
//       </p>

//       {/* Scrollable Container */}
//       <div className="mt-3 flex items-center justify-between overflow-x-auto scrollbar-thin scrollbar-thumb-[#E45D1F]/70 scrollbar-track-gray-200 pt-2 px-1">
//         {
//           menu_list.map((item, index) => {
//             return (
//               <div
//                 onClick={() => setCategory(prev => prev === item.menu_name ? "ALL" : item.menu_name)}
//                 className={`flex flex-col justify-center items-center cursor-pointer shrink-0`} // shrink-0 so flex items don't shrink
//                 key={index}
//               >
//                 <img
//                   src={item.menu_image}
//                   alt={item.menu_name}
//                   className={`p-1 ${category === item.menu_name ? "border-3 rounded-full border-[#E45D1F]" : ""} bg-cover bg-center w-28 h-28`}
//                 />
//                 <h3 className="explore-menu-title">{item.menu_name}</h3>
//               </div>
//             );
//           })
//         }
//       </div>
//     </div>
//   );
// };

// export default ExploreMenu;



import { menu_list } from '../../assets/frontend_assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="container">
      <h1 className="text-3xl font-extrabold text-[#E45D1F] mb-2">Explore Menu</h1>
      <p className="text-gray-700 text-base mb-4">
        Choose from a diverse menu featuring a delectable array of food categories
      </p>

      <div className="flex justify-between overflow-x-auto scrollbar-thin scrollbar-thumb-[#E45D1F]/70 scrollbar-track-gray-100 pb-3 px-1">
        {/* All Card with Image */}
        <div
          onClick={() => setCategory("All")}
          className={`flex flex-col items-center justify-center cursor-pointer rounded-xl p-3 min-w-[100px] transition-all duration-200 ease-in-out
            ${category === "All" ? 'bg-[#E45D1F]/10 text-[#E45D1F]' : 'bg-white hover:bg-gray-100'}
          `}
        >
          <img
            src="https://img.freepik.com/premium-photo/indian-hindu-veg-thali-food-platter-selective-focus_466689-35665.jpg?ga=GA1.1.91909313.1750503445&semt=ais_hybrid&w=740"
            alt="All"
            className={`w-20 h-20 rounded-full object-cover border 
              ${category === "All" ? 'border-[#E45D1F] border-2' : 'border-gray-300'}`}
          />
          <h3 className="mt-2 font-medium text-sm">All</h3>
        </div>

        {/* Other Categories */}
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))
              }
              className={`flex flex-col items-center justify-center cursor-pointer rounded-xl p-3 min-w-[100px] transition-all duration-200 ease-in-out
                ${isActive ? 'bg-[#E45D1F]/10 text-[#E45D1F]' : 'bg-white hover:bg-gray-100'}
              `}
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={`w-20 h-20 rounded-full object-cover border 
                  ${isActive ? 'border-[#E45D1F] border-2' : 'border-gray-300'}`}
              />
              <h3 className="mt-2 font-medium text-sm">{item.menu_name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;


