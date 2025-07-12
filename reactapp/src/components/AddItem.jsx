import React,{useEffect, useState} from 'react';
import { FaRegWindowClose } from "react-icons/fa";

// import io from 'socket.io-client';
// const socket = io('http://localhost:5000');

function AddItem({loggedInUser}){

  const [formData,setFormData]=useState({
    name:'',
    description:'',
    startingPrice:'',
    endDate:'',
    itemImage:null
  });


  const handleAddInputChange=(e)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value
    });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      itemImage: file
    });
  };

  const handleFormSubmit=async(e)=>{
    e.preventDefault();

    const formDataToSend=new FormData();
    formDataToSend.append('name',formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('startingPrice', formData.startingPrice);
    formDataToSend.append('endDate', formData.endDate);
    formDataToSend.append('itemImage', formData.itemImage);

    const response = await fetch('http://localhost:5000/add-item', {
      method: 'POST',
      body: formDataToSend,
      credentials: 'include' // Include credentials
    });
    

    const data = await response.json();
    console.log(data);

    if(data.success){
      console.log('item added successfully');
    }else{
      console.log("error item dalne me");
    }
    setFormData({name:'',
    description:'',
    startingPrice:'',
    endDate:'',
    itemImage:null})
  };

  if(!loggedInUser){
    return <div className="card_container"><h1>Please log in first to add an item.</h1></div>;
  }
  return (
    <div className="card_container">
      <div className="card_header">
      
      <div>
      <h2>Add Item</h2>
      <form className="card_form" onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="card_ip_label_line">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleAddInputChange}
            required
          />
        </div>
        <div className="card_ip_label_line">
            <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleAddInputChange}
            required
          />
        </div>
        <div className="card_ip_label_line">
            <label htmlFor="price">Price</label>
          <input
            type="number"
            name="startingPrice"
            value={formData.startingPrice}
            onChange={handleAddInputChange}
            required
          />
        </div>
        <div className="card_ip_label_line">
            <label htmlFor="date">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleAddInputChange}
            required
          />
        </div>
        <div className="card_ip_label_line">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="itemImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        
        <div className="button-div">
          <button  className="Add" type="submit" >
            Submit
          </button>
        </div>
      </form>
      
    </div>
  </div>
  </div>
  );
};
export default AddItem;