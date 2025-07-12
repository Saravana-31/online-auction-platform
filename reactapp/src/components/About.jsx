import React from "react";
import { FaClock, FaHeart } from "react-icons/fa";
import i1 from "../imgs/i1.png";
import i2 from "../imgs/i2.png";
import i3 from "../imgs/i3.png";

export default function About(){
  return(
  <div className="about_cont">
    <div className="about_imgs_cont">

      <div className="about_akela_img_cont">
            <div className="item_imgg">
              <img src={i1} alt="" />
            </div>
            <div className="item_des">
              <div className="samay">
                <p><FaClock/> 11h : 03m : 01s</p>
                <FaHeart/>
              </div>
              <hr />
              <div className="asli_info">
                <div className="naam">
                  <h5>Teddy Bear</h5>
                  <h4>$ 450</h4>
                </div>
                <button>Bid Now</button>
              </div>
            </div>
      </div>

      <div className="about_akela_img_cont">
            <div className="item_imgg">
              <img src={i2} alt="" />
            </div>
            <div className="item_des">
              <div className="samay">
                <p><FaClock/> 11h : 03m : 01s</p>
                <FaHeart/>
              </div>
              <hr />
              <div className="asli_info">
                <div className="naam">
                  <h5>Teddy Bear</h5>
                  <h4>$ 450</h4>
                </div>
                <button>Bid Now</button>
              </div>
            </div>
        </div>
    </div>

    <div className="about_txt_cont">
      <h1>About Us</h1>
      <hr />
      <h4>Your Trusted Auction Destination. We're dedicated to providing a secure and user-friendly platform, making auctions accessible to all. Join us and experience the thrill of winning in a seamless and exciting journey!</h4>
      <button className="small-btn">Explore Now</button>
    </div>
  </div>
  );
}