import React from "react";
import { Link } from "react-router-dom";
import back from "../assets/images/back.jpeg";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

function HomePage() {
  return (
    <div
      style={{
        height: "71vh",
        backgroundImage: `url(${back})`,
        backgroundSize: "fit",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        style={{
          color: "white",
          paddingTop: "100px",
        }}
      >
        <h1>Welcome to The secret Book Store</h1>
        <p>
          Here you can find an extensive collection of books across various
          genres.
        </p>

        <div>
          <h2>
            <Link to={"/Login"}>Login</Link> to browse Our Collections
          </h2>
          <ul>
            <li>
              <Link to="/all-books">All Books</Link>
            </li>
            <li>
              <Link to="/art-books">Art Books</Link>
            </li>
            <li>
              <Link to="/fiction-books">Fiction Books</Link>
            </li>
            <li>
              <Link to="/children-books">Children's Books</Link>
            </li>
            <li>
              <Link to="/sale">SALE</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2>Get in Touch</h2>
          <p>
            Have any questions or need assistance? Don't hesitate to{" "}
            <Link to="/contact-us">contact us</Link>.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
