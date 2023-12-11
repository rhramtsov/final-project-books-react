import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Button, Modal } from 'react-bootstrap';
import './styles.css';


const Artbooks = () => {
  const [clicked, setClicked] = useState(null);
  const [books, setBooks] = useState([]);

  function getAllBooks() {
    axios.get("http://localhost:8000/art-books")
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleClick = (cardId) => {
    setClicked(cardId);
  };

  const handleClose = () => {
    setClicked(null);
  };

  return (
    <div style={{ backgroundColor: "#d2b7ac" }}>
   <center> <h1 className='gradient-textp1art'>Come and see our secret Art books</h1></center>

     <center> <Container>
        <Row>
          {books.map((data) => (
            <React.Fragment key={data.id}>
              <Card className="large-card" onClick={() => handleClick(data.id)} style={{ width: '18rem', margin: '1rem' }}>
                <Card.Img variant="top" src={`http://localhost:8000/${data.image}`} style={{ width: '100%', height: '100%' }} />
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text>Stock {data.stock}</Card.Text>
                  <Card.Text>Price {data.price}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>

              <Modal show={clicked === data.id} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img src={`http://localhost:8000/${data.image}`} alt={data.name} style={{ width: '100%' }} />
                  <p>Stock: {data.stock}</p>
                  <p>Price: {data.price}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button variant="primary">Add to Cart</Button>
                </Modal.Footer>
              </Modal>
            </React.Fragment>
          ))}
        </Row>
      </Container></center>
    </div>
  );
}

export default Artbooks;

