import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import back from "../assets/images/back.jpeg";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

function HomePage() {
  const [userName,setUserName]=useState('')
  useEffect(()=>{
    const name=localStorage.getItem("user")
    if(name){
      setUserName(name)
    }
  },[])
  return (
    <div
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Container
        style={{
          color: "white",
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
        <Row className="justify-content-md-center">
          <Col md={8} className="text-left">
            <h1 class="gradient-text-1">Welcome {userName} my frind to</h1>
            <h1 class="gradient-outlined-text">THE SECRECT BOOK STORE</h1>

            <p class="gradient-textp1">
              Here you can find an extensive collection of books across various
              genres.
            </p>
          </Col>
        </Row>
{
  userName?(
    <Row className="justify-content-md-center mt-4">
    <Col md={8}>
      <h2 class="gradient-texth2">Loging and Browse Our Collections</h2>
      <ListGroup variant="flush" className="text-center custom-list-group">
        <ListGroup.Item><Link to="/all-books">All Books</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/art-books">Art Books</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/fiction-books">Fiction Books</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/children-books">Children's Books</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/sale">SALE</Link></ListGroup.Item>
      </ListGroup>
    </Col>
  </Row>
  ):(
    <Row className="justify-content-md-center mt-4">
    <Col md={8}>
      <h2 class="gradient-texth2">Loging and Browse Our Collections</h2>
      <ListGroup variant="flush" className="text-center custom-list-group">
        <ListGroup.Item><Link to="/login">All Books</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/login">Art Books</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/login">Fiction Books</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/login">Children's Books</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/login">SALE</Link></ListGroup.Item>
      </ListGroup>
    </Col>
  </Row>
  )
}
      

        <Row className="justify-content-md-center mt-4">
          <Col md={8} className="text-center">
            <h2 class="p3">Get in Touch</h2>
            <p class= "p2">Have any questions or need assistance? Don't hesitate to <Link to="/contact-us">contact us</Link>.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
