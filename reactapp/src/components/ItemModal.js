import React, { useEffect, useState } from "react";
import SendMessage from "./Messages";

 // Import the CSS file

const ItemModal = ({ item, onClose,onPlaceBid }) => {
  const [bidAmount,setBidAmount]=useState('');

  const handleBidChange=(e)=>{
    setBidAmount(e.target.value);
  };
  const handlePlaceBid=()=>{
    onPlaceBid(item._id,bidAmount);
    <SendMessage itemId={item._id} />
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h1>{item.name}</h1>
        <img src={`http://localhost:5000/${item.imagePath}`} alt="" />
        <h3>{item.description}</h3>
        <h4>Starting Price: <span >${item.startingPrice}</span></h4>
        <h4>End Date: {new Date(item.endDate).toLocaleDateString("en-GB")}</h4>
        <h4>Highest Bid: {item.highestBid}</h4>
        <h4>Highest Bidder: {item.highestBidder}</h4>
        
        {!item.itemSold && (
          <div>
            <input 
              type="number" 
              value={bidAmount} 
              onChange={handleBidChange} 
              placeholder="Enter bid amount" 
            />
            <button onClick={handlePlaceBid}>Place Bid</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemModal;
