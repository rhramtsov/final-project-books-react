import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/Product";
import Header from "./components/Header";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Cart from "./components/Cart";
import HomePage from "./components/HomePage";
import Artbooks from "./components/Artbooks";
import ChildrenBooks from "./components/ChildrenBooks";
import FictionBooks from "./components/FictionBooks";
import Sale from "./components/Sale";
import AllBooks from "./components/AllBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from 'react-bootstrap/Alert';
import SoundPlayer from "./components/soundPlayer";

const API_URL = process.env.REACT_APP_API_URL;

const fetchCategories = async () => {
  const response = await axios.get(`http://localhost:8000/category`);
  return response.data;
};

const fetchProducts = async (category, searchText = null) => {
  let url = `http://localhost:8000/product?category=${category}`;
  if (searchText) {
    url = `http://localhost:8000/product?search=${searchText}`;
    url = `http://localhost:8000/home?search=${searchText}`;
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
  const [playSound, setPlaySound] = useState(false);
  
  console.log(playSound);
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
    debugger
    setCurrentCategory("reset");
    getProducts(searchText);
  };
  const playAudio = () => {
    setPlaySound(true);
  };

  return (
    <>
      <BrowserRouter>
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            {message}
          </Alert>
        )}
      
        <Header
          categories={categories}
          clickButton={clickButton}
          searchProduct={searchProduct}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          setPlaySound={playAudio}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
                {products.map((product) => (
                  <div key={product.id} className="col">
                    <Product product={product} />
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/art-books" element={<Artbooks/>}/>
          <Route path="/fiction-books" element={<FictionBooks/>}/>
          <Route path="/children-books" element={<ChildrenBooks/>}/>
          <Route path="/sale" element={<Sale/>}/>
          <Route path="/all-books" element={<AllBooks/>}/>
      
          <Route path="*" element={<NoPage />} />
        </Routes>
        <SoundPlayer
          playSound={playSound}
          onFinishedPlaying={() => setPlaySound(false)}
        />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
