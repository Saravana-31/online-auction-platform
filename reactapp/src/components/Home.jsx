import React from "react";
import { FaArrowRight } from "react-icons/fa";
import J from "../imgs/j.png";

export default function Home(){
  return(
    <div className="home_cont">
      <div className="home_txt">
        <h1>Elevate your auction experience like never before.</h1>
        <h3>BID. WIN. ENJOY!</h3>
        <div className="btns_cont">
          <button>Explore</button>
          <p>Go to Bidding Arena!</p>
          <FaArrowRight className="arrow"/>
        </div>
      </div>

      <div className="home_img">
        {/* <div className="home_img_cont"> */}
          <img src={J} alt="" />
        {/* </div> */}
      </div>
    </div>
  )
}