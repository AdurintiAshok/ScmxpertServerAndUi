import React, { useState } from "react";
import "../Components/Sidebar.css";
import ExfLogo from "../assets/exf-png.png";
import { IoIosClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate=useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    // Close the menu when a menu item is clicked
    setIsMenuOpen(false);
  };
  return (
  <div>
      <div className="d-none d-md-block" >
      <div className={`sidebar ${isMenuOpen ? "" : "close"}`} >
        <div className="logo-details">
          <img src={ExfLogo} style={{ width: "40px", height: "40px" }} />
          {isMenuOpen && <span className="project-name">Exafluence</span>}
        </div>
        <ul className="nav-links ">
          <li>
          <a href="dash" title="dashboard">
              <i class="bx bxs-dashboard"></i>
              {isMenuOpen && <span className="link-name">DashBord</span>}
            </a>

          </li>
          <li>
            <a href="myaccount" title="myaccount">
              <i class="bx bxs-user-pin"></i>
              {isMenuOpen && <span className="link-name">My Account</span>}
            </a>
          </li>
          <li>
            <a href="myshipment" title="myshipment">
              <i class="bx bxs-ship"></i>
              {isMenuOpen && <span className="link-name">My Shipment</span>}
            </a>
          </li>
        
          <li>
            <a href="newshipment" title="newshipment">
              <i class="bx bxs-train bx-rotate-90"></i>
              {isMenuOpen && <span className="link-name">New Shipment</span>}
            </a>
          </li>
          <li>
            <a href="datastream" title="datastream">
              <i class="bx bx-data"></i>
              {isMenuOpen && <span className="link-name">Device Stream</span>}
            </a>
          </li>
          <div className="endclass">
            <li>
              <a   onClick={()=>{
                navigate('/login')
              }} title="logout">
                <i class="bx bx-log-out-circle"></i>
                {isMenuOpen && <span className="link-name">Logout</span>}
              </a>
            </li>
          </div>
        </ul>
      </div>
      <div className={`home-section ${isMenuOpen ? "" : "close"}`}>
        <div
          className="home-content"
          onClick={handleMenuToggle}
          style={{ marginLeft: "10px" }}
        >
          {isMenuOpen ? (
            <IoIosClose size={35} color="white" />
          ) : (
            <TbMenuDeep size={25} color="white" />
          )}
          <span className="text welcomeText">
          Welcome to ScmXpertLite 
          </span>
        </div>
      </div>
    </div>
    <div className="d-md-none" >
    
        <div 
          style={{height:'60px',    background: "#17243f" }} className="d-flex flex-row  align-items-center"
        >

            <TbMenuDeep size={28} color="white" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"/>

          <span className="text welcomeText">
            Welcome to ScmXpertLite Ashok Adurinti
          </span>
        </div>



<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" style={{backgroundColor:'#E4E9F7'}}>
  <div class="offcanvas-header" >
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">EXAFLUENCE</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body" >
    <p>Welcome To ScmXpertLite</p>
    <ul className="nav-links" style={{listStyleType:'none'}}>
          <li >
          <a href="dash" className="anchor" style={{color:'black'}}>
              <i class="bx bxs-dashboard" ></i>
<span className="link-name ms-2">DashBord</span>
            </a>
          </li>
          <li>
            <a href="myaccount" className="anchor" style={{color:'black'}}>
              <i class="bx bxs-user-pin"></i>
 <span className="link-name ms-2">My Account</span>
            </a>
          </li>
          <li>
            <a href="myshipment" className="anchor" style={{color:'black'}}>
              <i class="bx bxs-ship"></i>
 <span className="link-name ms-2">My Shipment</span>
            </a>
          </li>
        
          <li>
            <a href="newshipment" className="anchor" style={{color:'black'}}>
              <i class="bx bxs-train bx-rotate-90"></i>
       <span className="link-name ms-2">New Shipment</span>
            </a>
          </li>
          <li>
            <a href="datastream" className="anchor" style={{color:'black'}}>
              <i class="bx bx-data"></i>
 <span className="link-name ms-2">Data Stream</span>
            </a>
          </li>
          <div className="endclass">
            <li  onClick={()=>{
                navigate('/login')
              }}>
              <a className="anchor" style={{color:'black'}} >
                <i class="bx bx-log-out-circle"></i>
<span className="link-name ms-2">Logout</span>
              </a>
            </li>
          </div>
        </ul>
  </div>

</div>
      </div>
  </div>
  );
};

export default Sidebar;
