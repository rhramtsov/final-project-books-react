import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate=useNavigate()
  const [cart, setCart] = useState(null); // Initialize cart to null

  // Fetch cart from server or localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        // Optional: Clear or reset the cart in localStorage if it's corrupt
        // localStorage.setItem('cart', JSON.stringify([]));
      }
    }
  }, []);

  // Update local storage when the cart changes
  useEffect(() => {
    if (cart !== null) { // Only update local storage if cart is not null
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const updateQuantity = (itemId, newQuantity) => {
  
    setCart(currentCart => {
      return currentCart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const deleteItem = (indexToDelete) => {
    setCart(currentCart => currentCart.filter((_, index) => index !== indexToDelete));
  };

  // Avoid computation if cart is not loaded
  if (cart === null) {
    return <div>Loading cart...</div>;
  }

  const totalPrice = cart.reduce((acc, item) => 
    acc + parseFloat(item.price) * (item.quantity || 1), 0
  );
  const itemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <ul className="cart-items">
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
            Name: {item.name}, Price: {item.price}$
            <div>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              {item.quantity}
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => deleteItem(index)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Items in Cart: {itemCount}</p>
        <p>Total Price: {totalPrice.toFixed(2)}$</p>
      </div>
      <br/>
      <button><Link to={"/home"}> Back to shopping</Link></button>
    </div>
  );
}

export default Cart;
