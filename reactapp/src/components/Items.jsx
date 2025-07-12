import React, { useEffect, useState } from "react";
import { FaClock, FaHeart, FaSearch } from "react-icons/fa";
import Timer from "./Timer";
// import io from 'socket.io-client';
import ItemModal from './ItemModal.js';
import SendMessage from "./Messages";

// const socket=io('http://localhost:5000');



export default function Items(){
  const [items,setItems]=useState([]);
  const [searchItem,setSearchItem]=useState('');
  const [itemSold,setItemSold]=useState(false);
  const [addedItem,setAddedItem]=useState(false);
  
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(()=>{
    fetch('http://localhost:5000/get-items')
    .then((res)=> res.json())
    .then((data)=>{
      if(data.success){
        setItems(data.items);
      }else{
        console.error(data.error);
      }
    })
    .catch((err)=>console.error(err))
  },[items])

  // useEffect(() => {
  //   socket.on('itemAdded', () => {
  //     setAddedItem(true);
  //   });

  //   return ()=>{
  //     socket.off('itemAdded')
  //   }
  // },[])

  const handleTimerFinish = (itemId) => {
    setItemSold(prev => ({
      ...prev,
      [itemId]: true
    }));
    
  };

  const handleSearchInputChange=(e)=>{
    setSearchItem(e.target.value);
  };
  const filteredItems=searchItem?items.filter((item)=>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  ):items;

  const handleNotificationClose = () => {
    setAddedItem(false);
  };

  const handleItemClick = (item) => {
    console.log('item clicked',item.name);
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handlePlaceBid = (itemId, amount) => {
    fetch(`http://localhost:5000/place-bid/${itemId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log('Bid placed successfully');
        <SendMessage itemId={itemId} />
      } else {
        console.error(data.error);
        alert(data.error);
      }
    })
    .catch((error) => console.error(error));
  };

  return(
    <div className="items_cont">
      <div className="items_text">
        <h2>Discover Hot Auction Picks</h2>
        <div className="search_bar">
        <input type="text" placeholder="Search here" value={searchItem} onChange={handleSearchInputChange}></input><FaSearch/>
        </div>
      </div>

      <div className="items_all_cont">
        {filteredItems.map((item)=>(
          <div key={item._id} className="items_akela_cont" onClick={() => handleItemClick(item)}>
            <div className="item_imgg">
              <img src={`http://localhost:5000/${item.imagePath}`}alt="" />
            </div>
            <div className="item_des">
              <div className="samay">
                <p><FaClock/> Ends on : {new Date(item.endDate).toLocaleDateString("en-GB")}</p>
                <FaHeart/>
              </div>
              <hr />
              <div className="asli_info">
                <div className="naam">
                  <h5>{item.name}</h5>
                  <h4>$ {item.startingPrice}</h4>
                </div>
                <button>Bid Now</button>
              </div>   
            </div>
            <Timer 
                    endDate={item.endDate} 
                    onTimerFinish={() => handleTimerFinish(item._id)} 
                    itemSold={itemSold[item._id]}
              />
          </div>
        ))  
        }
        {selectedItem && (
        <ItemModal item={selectedItem} onClose={handleCloseModal} onPlaceBid={handlePlaceBid} />
      )}
      </div>

      {addedItem && (
        <div className="notification-container">
          <div className="notification">
            Item Added
            <span className="notification-close" onClick={handleNotificationClose}>X</span>
          </div>
          <div className="notification-message">
            New item has been added to the auction.
          </div>
        </div>
      )}


    </div>

  )
}