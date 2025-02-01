"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./page.module.css";

export default function Home() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "sunidhi",
    email: "sunidhi@gmail.com",
    phone: "9973203577",
  });

  const profile = { 
    name: "sunidhi",
    email: "sunidhi@gmail.com",
    gender: "female",
    phone: "9973203577",
  };
  const foodItems = {
    pizza: [
      { name: "Margherita", price: "₹100" },
      { name: "Pepperoni", price: "₹210" },
    ],
    momo: [
      { name: "Steamed Momo", price: "₹85" },
      { name: "Fried Momo", price: "₹66" },
    ],
    chickenCurry: [
      { name: "Spicy Chicken Curry", price: "₹120" },
      { name: "Mild Chicken Curry", price: "₹110" },
    ],
    burger: [
      { name: "Cheese Burger", price: "₹70" },
      { name: "Veggie Burger", price: "₹60" },
    ],
  };


  const getGenderEmoji = (gender) => (gender === "Male" ? "👨" : "👩");
    const handleOrder = (e) => {
    e.preventDefault();

    if (!selectedOption || !customerDetails.email || !customerDetails.name) {
      alert("Please fill in all details and select an option!");
      return;
    }
    
   
   /* const orderDetails = selectedOption
    .map((item) => `${item.name} - ${item.price}`)
    .join("\n");

    const totalPrice = selectedOption
    .reduce((acc, curr) => acc + parseFloat(curr.price.replace("₹", "")), 0)
    .toFixed(2);
*/const handleAddToCart = () => {
  if (selectedOption.length === 0) {
    alert("Please select food before adding to the cart.");
    return;
  }
  
  setCart([...cart, ...selectedOption]); // 🛒 Add selected food to cart
  setSelectedOption([]); // Clear current selection
  setSelectedFood(null);
  alert("Added to cart successfully!");
};

const handlePlaceOrder = (e) => {
  e.preventDefault();
  
  const orderItems = cart.length > 0 ? cart : selectedOption;
  if (orderItems.length === 0) {
    alert("Your cart is empty! Please add items.");
    return;
  }

  const orderDetails = orderItems.map((item) => `${item.name} - ${item.price}`).join("\n");
  const totalPrice = orderItems.reduce((acc, curr) => acc + parseFloat(curr.price.replace("₹", "")), 0).toFixed(2);


  // Prepare the templateParams object
  const templateParams = {
    customer_name: customerDetails.name,
    customer_email: customerDetails.email,
    customer_phone: customerDetails.phone,
    order_details: orderDetails,
    total_price: `₹${totalPrice}`,
  };



    emailjs
      .send(
        "1cd22cs157", // Replace with your EmailJS service ID
        "1cd22cs158", // Replace with your EmailJS template ID
        templateParams,
        "nGYfLUS8jVnqSL_2R" // Replace with your EmailJS user ID
      )
      .then(() => {
        alert("Order placed successfully!");
        setSelectedOption(null);
        setSelectedFood(null);
        setCustomerDetails({ name: "", email: "", phone: "" });
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        alert("Failed to place order. Please try again.");
      });
  };


  return (
    <div className={styles.mainContainer}>
       {/* Profile Section */}
      <div className={styles.profileContainer}>
        <h2 className={styles.profileTitle}>
          My Profile {getGenderEmoji(profile.gender)}
        </h2>
        <div className={styles.profileDetails}>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Gender:</strong> {profile.gender}
          </p>
          <p>
            <strong>Phone Number:</strong> {profile.phone}
          </p>
        </div>
      </div>
      

      {/* Welcome Section */}
      <div className={styles.welcomeContainer}>
        <h1 className={styles.restaurantName}>Welcome to Riva</h1>
      </div>

      {/* Menu Section */}
      <div className={styles.menuContainer}>
        <h2 className={styles.menuTitle}>Our Menu</h2>
        <div className={styles.foodItems}>
          {Object.keys(foodItems).map((food) => (
            <div
              key={food}
              className={styles.foodCard}
              onClick={() => setSelectedFood(food)}
            >
              <img
                src={`/${food}.jpg`}
                alt={`Image of ${food}`}
                className={styles.foodImage}
              />
              <p className={styles.foodName}>
                {food.charAt(0).toUpperCase() + food.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>

    {/* Food Options Section */}
{selectedFood && (
  <div className={styles.foodDetailsContainer}>
    <h2 className={styles.detailsTitle}>
      {selectedFood.charAt(0).toUpperCase() + selectedFood.slice(1)} Options
    </h2>
    <ul className={styles.foodOptions}>
      {foodItems[selectedFood].map((item, index) => (
        <li
          key={index}
          className={`${styles.foodOption} ${
            selectedOption?.find((option) => option.name === item.name)
              ? styles.selectedOption
              : ""
          }`}
          onClick={() => {
            const isAlreadySelected = selectedOption?.some(
              (option) => option.name === item.name
            );
            if (isAlreadySelected) {
              // Remove item if already selected
              setSelectedOption(
                selectedOption.filter((option) => option.name !== item.name)
              );
            } else {
              // Add item to selected options
              setSelectedOption((prev) => [...(prev || []), item]);
            }
          }}
        >
          {item.name} - <span className={styles.foodPrice}>{item.price}</span>
        </li>
      ))}
    </ul>
    {selectedOption && selectedOption.length > 0 && (
      <div className={styles.totalPriceContainer}>
        <h3>Total Price:</h3>
        <p>
        ₹
          {selectedOption
            .reduce((acc, curr) => acc + parseFloat(curr.price.slice(1)), 0)
            .toFixed(2)}
        </p>
      </div>
    )}
  </div>
)}


      {/* Order Form */}
      {selectedOption && (
        <form className={styles.orderForm} onSubmit={handleOrder}>
          <h3>Order Details</h3>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={customerDetails.email}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, email: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone:</label>
            <input
              type="text"
              value={customerDetails.phone}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, phone: e.target.value })
              }
            />
          </div>
          <button type="submit" className={styles.orderButton}>
            Place Order
          </button>
        </form>
      )}
        {/* Video Section */}
        <div className={styles.videoContainer}>
        <h2 className={styles.videoTitle}>Watch Our Story</h2>
        <video className={styles.videoPlayer} controls>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3>Riva Restaurant</h3>
          <p>
            Owned by <strong>Sunidhi Pathak</strong>
          </p>
          <p>Contact us: +91 9876543210 | email@riva.com</p>
          <div className={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
          </div>
        </div>
        <p className={styles.footerNote}>
          &copy; {new Date().getFullYear()} Riva Restaurant. All rights reserved.
        </p>
      </footer>
    </div>
  );
        }}
