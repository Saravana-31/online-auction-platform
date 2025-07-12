import React, { useState } from "react";
import "../App.css";
import { FaRegWindowClose } from "react-icons/fa";

function Card({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    date: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now access the form data in the formData state object.
    console.log(formData);
    // Perform any additional actions, like sending the data to a server.
  };

  return (
    <div className="card_container">
      <div className="card_header">
        <button className="close-button" onClick={onClose}>
          <FaRegWindowClose />
        </button>
      
      <div >
        <form className="card_form" onSubmit={handleSubmit}>
          <div className="card_ip_label_line">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="card_ip_label_line">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="card_ip_label_line">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="card_ip_label_line">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="card_ip_label_line">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
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
}

export default Card;