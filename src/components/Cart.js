import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function Cart() {
  const [cart, setCart] = useState(null); // Initialize cart to null

  // Fetch cart from server or localStorage
  useEffect(() => {
    // Function to load cart
    const loadCart = async () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        // Load cart from local storage
        setCart(JSON.parse(savedCart));
      } else {
        try {
          // Fetch cart from server
          const response = await axios.get("http://localhost:8000/cartitems");
          setCart(response.data);
          localStorage.setItem("cart", JSON.stringify(response.data)); // Save fetched cart to local storage
        } catch (error) {
          console.error("Error fetching data:", error);
          setCart([]); // Set cart to empty array in case of error
        }
      }
    };

    loadCart();
  }, []);

  // Update local storage when the cart changes
  useEffect(() => {
    if (cart !== null) { // Only update local storage if cart is not null
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const updateQuantity = (index, newQuantity) => {
    setCart(currentCart => currentCart.map((item, idx) => 
      idx === index ? { ...item, quantity: newQuantity } : item
    ));
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
              <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
              {item.quantity}
              <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
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
    </div>
  );
}

export default Cart;
