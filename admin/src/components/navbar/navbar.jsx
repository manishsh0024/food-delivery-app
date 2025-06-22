import { Link } from "react-router-dom";
import { assets } from "../../assets/admin_assets/assets";

const Navbar = () => {
    return (
    <div className="container outfit-font">
        <div className="flex justify-between items-center ">
            <img className="" src={assets.logo} alt="" />
                <img
                    className="w-10 h-10 rounded-full object-cover object-center border-2 border-[#FF4C24]"
                    src={assets.profile}
                    alt=""
                />
        </div>
    </div>
    );
};

export default Navbar;
