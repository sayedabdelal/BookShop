import "./Navbar.scss";
import SearchIcon  from "../../../assets/imges/search.svg"; // Import SVG as React component
import AppIcon from "../../../assets/imges/app.svg";       // Import SVG as React component
import expandIcon from "../../../assets/imges/expand.svg";       // Static asset
import notificationsIcon from "../../../assets/imges/notifications.svg"; // Static asset
import settingsIcon from "../../../assets/imges/setting.svg"; 

import logo from "../../../assets/img/bookLogo.jpg";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";


const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <span>dashboard</span>
      </div>
      <div className="icons">
        {/* Use imported SVG components */}
        {/* <img src={settingsIcon} className="icon"  /> */}
        {/* <img src={AppIcon} className="icon" alt=""/>  */}
        {(isAuth || isAdmin) && (
          <Link to='/'>
                <i class="ri-home-2-line home"></i>
          </Link>
          
        )}

        {/* Use static image imports */}
        <img src={expandIcon} className="icon" alt="Expand" />

        <div className="notification">
          <img src={notificationsIcon} className="icon" alt="Notifications" />
          <span>1</span>
        </div>

        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt="User"
          />
          <span>Jane</span>
        </div>

        <img src={settingsIcon} className="icon" alt="Settings" />
      </div>
    </div>
  );
};

export default Navbar;
