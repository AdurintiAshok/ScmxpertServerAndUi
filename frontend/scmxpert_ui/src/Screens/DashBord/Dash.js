import React, { useState } from "react";
import ExfLogo from "../../assets/exf-png.png";
import "../DashBord/Dash.css";
import { IoIosClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import Metrics from "../Metrics/Metrics";
import MyAccount from "../MyAccount/MyAccount";
import Sidebar from "../../Components/Sidebar";
import { TbMenuDeep } from "react-icons/tb";
const Dash = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    // Close the menu when a menu item is clicked
    setIsMenuOpen(false);
  };
  return (
    <div style={{ background:'#E4E9F7', height: "100%",overflowX:'hidden'}}>
 <Sidebar/>
<div>
<Metrics/>
</div>



    </div>
  );
};

export default Dash;
