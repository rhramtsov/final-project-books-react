import React,{ useEffect, useState, useRef } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/logo.jpeg";
import back from "../assets/images/back.jpeg";
import "./styles.css";

import { Button, Form, FormControl } from "react-bootstrap";
function Header({
  categories,
  clickButton,
  searchProduct,
  loggedInUser,
  setLoggedInUser,
  setPlaySound,
}) {
  const data = [
    {
      id: 1,
      title: "Home",
      link: "/home",
    },
    {
      id: 2,
      title: "All Books",
      link: "/all-books",
    },
    {
      id: 3,
      title: "Art Books",
      link: "/art-books",
    },
    {
      id: 4,
      title: "Fiction Books",
      link: "/fiction-books",
    },
    {
      id: 5,
      title: "Children Books",
      link: "/children-books",
    },
    {
      id: 6,
      title: "Sale",
      link: "/sale",
    },
    
  ];
  const [searchText, setSearchText] = useState(""); // this is the value of the search field
  const [isConnectedUser, setIsConnectedUser] = useState(false); // this is the value of the search field
  const[loginUser,setLoginUSer]=useState(null)
  const navbarRef = useRef(null);
  const location = useLocation();
  const hello_style = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
  };
  const navigate=useNavigate()
  const token=localStorage.getItem("token")
  useEffect(() => {
 
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
      console.log("Scroll event triggered");

      // Correctly define scrollTop using window.scrollY
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Ensure navbarRef is not null before accessing its style property
      if (navbarRef.current) {
        if (scrollTop > lastScrollTop) {
          // Hide the navbar by moving it further above the screen
          navbarRef.current.style.top = "-100px";
        } else {
          // Show the navbar
          navbarRef.current.style.top = "0";
        }
      }

      lastScrollTop = scrollTop;
    });

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const isConnected = () => {
    const storedToken = localStorage.getItem("token");

    if (storedToken === null) return false;
    // Decode the token to get the expiration time
    setIsConnectedUser(true);
    const decodedToken = jwtDecode(storedToken);
    const expirationTime = decodedToken.exp;

    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);
    const user_id = decodedToken.user_id;
    // Check if the token is expired
    const isTokenExpired = expirationTime < currentTime;
    console.log("token expire" + isTokenExpired);
   debugger;
    // Update the loggedInUser state based on token expiration
    if (isTokenExpired) {
      setLoggedInUser(null);

      axios.defaults.headers.common["Authorization"] = null;
      setIsConnectedUser(false)
      return false;
    } else {
      setLoggedInUser(user_id);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      setIsConnectedUser(true)
      return true;
    }
  };

  function logout() {
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setLoginUSer(false)
    // Reset Axios default headers
    isConnected()
    delete axios.defaults.headers.common["Authorization"];
    alert("logged out");
  }
  useEffect(()=>{
 
    if(token){
      setIsConnectedUser(true)
     
      
    }else{
      setIsConnectedUser(false)
      if(loginUser===false)
      {
        navigate('./home')
      }
   
    }
  },[loginUser])
  console.log(isConnected)
  return (
    <div>
      <Navbar
        style={{
          backgroundImage: `url(${back})`,
          backgroundSize: "fit",
       

        }}
        bg="light"
        data-bs-theme="light"
        ref={navbarRef}
      >
        <Container>

          <Navbar.Brand href="#home">
            <h2 className="gradient-outlined-text">THE SECRET BOOK STORE</h2>
          </Navbar.Brand>
          {isConnectedUser? (
            <Nav className="me-auto">
              {data.map((item) => (
                <>
                  <Nav.Link>
                    {" "}
                    <Link
                      to={item.link}
                      className="nav-link"
                      onClick={() => setPlaySound(true)}
                    >
                      {item.title}
                    </Link>{" "}
                  </Nav.Link>
                </>
              ))}
              <Nav.Link>
                <a
                   className="nav-link"
                   onClick={logout}
                >
                  Logout
                </a>
              </Nav.Link>
              <Form >
                <FormControl
                type="text"
                placeholder="sreach"
                className="mr-2"
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                />
                <Button >Sreach</Button>
              </Form>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link>
                <Link
                  to="/home"
                  className="nav-link"
                  onClick={() => setPlaySound(true)}
                >
                  Home
                </Link>{" "}
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => setPlaySound(true)}
                >
                  Login
                </Link>{" "}
              </Nav.Link>
              <Nav.Link>
                {" "}
                <Link
                  onClick={() => setPlaySound(true)}
                  to="/register"
                  className="nav-link"
                >
                  Register
                </Link>{" "}
              </Nav.Link>
            </Nav>
          )}
          <Link
            to="/cart"
            className="nav-link"
            onClick={() => setPlaySound(true)}
          >
            <BsCart4 className="carticon" /> {/* Add the BsCart4 icon here */}
          </Link>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
