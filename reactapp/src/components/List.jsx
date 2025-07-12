import React from "react";
import { FaClock, FaGavel, FaHeart, FaSign, FaUpload, FaUser } from "react-icons/fa";

export default function List(){
  return(
  <div className="list_cont">
    <div className="about_txt_cont list_txt_cont">
      <h1>List and Auction Your Exclusive Items</h1>
      <hr />
      <h4>Discover the joy of auctioning your exclusive items with BidNow. List and sell your digital creations to a global audience, making your mark in the dynamic world of auctions.</h4>
      <div className="btns_list">
        <button className="small-btn">Create New</button>
        <button className="small-btn">Learn More</button>
      </div>
    </div>
    <div className="cards_steps">
      <div className="single_card">
        <div className="shine"></div>
        <div className="icon_sym">
          <FaUser className="icon_steps"/>
        </div>

        <div className="single_card_des">
          <h3>1. Sign Up / Log In</h3>
          <p>Create an account or log in to your BidNow profile to start participating in auctions.</p>
        </div>
        <div className="shine-btm"></div>
      </div>
      
      <div className="single_card">
        <div className="shine"></div>
        <div className="icon_sym">
          <FaUpload className="icon_steps"/>
        </div>

        <div className="single_card_des">
          <h3>2. Choose your  Item</h3>
          <p>Browse the listings, find the item you desire, and click on it to enter the bidding page.</p>
        </div>
        <div className="shine-btm"></div>
      </div>

      <div className="single_card">
      <div className="shine"></div>
        <div className="icon_sym">
          <FaGavel className="icon_steps"/>
        </div>

        <div className="single_card_des">
          <h3>3. Place Your Bid</h3>
          <p>Enter your bid amount and click 'Place Bid' to engage in the auction and compete for the chance to win the item.</p>
        </div>
      <div className="shine-btm"></div>
      </div>
    </div>

  </div>
  );
}