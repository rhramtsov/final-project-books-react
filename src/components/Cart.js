import React, { useEffect, useState } from "react";
import axios from "axios";
import back from "../assets/images/back.jpeg";
import "./styles.css";
import { Modal, Button } from 'react-bootstrap'; 

import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const updateQuantity = (itemId, newQuantity) => {
    setCart(currentCart => {
      return currentCart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
    const addedItem = cart.find(item => item.id === itemId);
    setLastAddedItem(addedItem);
    setTimeout(() => {
      setLastAddedItem(null);
    }, 3000); 
  };

  const deleteItem = (indexToDelete) => {
    setCart(currentCart => currentCart.filter((_, index) => index !== indexToDelete));
  };

  const handleClick = (itemId) => {
    setClicked(itemId);
  };

  const handleClose = () => {
    setClicked(null);
  };

  if (cart === null) {
    return <div>Loading cart...</div>;
  }

  const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price) * (item.quantity || 1), 0);
  const itemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="cart-page">
        <h2>Your Shopping Cart</h2>
        <div className="cart-items-container">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price}</span>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}>-</button>
              </div>
              <button onClick={() => deleteItem(index)} className="delete-button">Delete</button>
              <button onClick={() => handleClick(item.id)} className="view-details-button">View Details</button>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {itemCount}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <button className="back-shopping-button"><Link to={"/home"}> Back to Shopping</Link></button>
      </div>
      {cart.map((item, index) => (
        <Modal key={index} show={clicked === item.id} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{item.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {lastAddedItem && lastAddedItem.id === item.id && (
              <div className="item-added-message">Item was added to your Cart</div>
            )}
            {/* Other modal content goes here */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            {/* Other footer content */}
          </Modal.Footer>
        </Modal>
      ))}
    </div> 
  );
}

export default Cart;
