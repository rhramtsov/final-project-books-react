import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Alert } from "react-router-dom";
import Product from "./components/Product";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import ContactUs from "./components/ContactUs";

// Assuming you have a .env file with REACT_APP_API_URL set
const API_URL = process.env.REACT_APP_API_URL;

const fetchCategories = async () => {
  debugger
  const response = await axios.get(`http://localhost:8000/category`);
  return response.data;
};

const fetchProducts = async (category, searchText = null) => {
  let url = `http://localhost:8000/product?category=${category}`;
  if (searchText) {
    url = `http://localhost:8000/product?search=${searchText}`;
  }
  const response = await axios.get(url);
  return response.data;
};

function App() {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(1);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    getCategories();
    getProducts();
  }, [currentCategory, loggedInUser]);

  const productAdded = () => {
    setCurrentCategory("reset");
    setMessage("Product Added Successfully");
    setShowAlert(true);
  };

  const clickButton = (id) => {
    setCurrentCategory(id);
  };

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getProducts = async (searchText = null) => {
    try {
      const data = await fetchProducts(currentCategory, searchText);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchProduct = (searchText) => {
    setCurrentCategory("reset");
    getProducts(searchText);
  };

  return (
    <>
      <BrowserRouter>
        {/* {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            {message}
          </Alert>
        )} */}

        <Navbar
          categories={categories}
          clickButton={clickButton}
          searchProduct={searchProduct}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
        <Routes>
          <Route path="/" element={(
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
              {products.map((product) => (
                <div key={product.id} className="col">
                  <Product product={product} />
                </div>
              ))}
            </div>
          )} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/add_product" element={<AddProduct productAdded={productAdded} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
