import React from "react";
import { FaArrowRight, FaDesktop, FaLaptop, FaLock, FaSearch } from "react-icons/fa";
import Bg from "../imgs/1.png";


export default function Features(){
  return(
    <div className="features_cont">
      <div className="features_box">
        <FaLaptop className="features_icon"/>
        <h3>User-friendly Interface</h3>
        <p> Our intuitive interface ensures a seamless and enjoyable auction experience for all users, from beginners to seasoned bidders.</p> 
      </div>

      <div className="features_box">
        <FaLock className="features_icon"/>
        <h3>Secure Payment Integration</h3>
        <p>Bid with confidence knowing that our platform employs a robust payment system to safeguard your transactions.</p> 
      </div>

      <div className="features_box">
        <FaSearch className="features_icon"/>
        <h3>Item Discovery and Search</h3>
        <p>Easily find your desired items with our efficient search and filtering tools, enabling effortless exploration of the auction inventory.</p> 
      </div>

      {/* <div className="features_box">
        <FaDesktop className="features_icon"/>
        <h3>Seller Dashboard</h3>
        <p>Sellers benefit from a dedicated dashboard for effortless item management and monitoring their auction progress.</p> 
      </div> */}
    </div>
  )
}