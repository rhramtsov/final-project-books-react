import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Button, Modal } from 'react-bootstrap';
import './styles.css';


const Artbooks = () => {
  const [clicked, setClicked] = useState(null);
  const [books, setBooks] = useState([]);
  const [promotion,setPromotion]=useState(false)
  function getAllBooks() {
  
    axios.get("http://localhost:8000/art-books")
      .then(response => {
      
        for(let data of response.data){
          if ((data.categories.includes(9) && data.categories.includes(10)) || 
          (data.categories.includes(8) && data.categories.length === 1)) {
          setBooks(books => [...books, data]);
      }           
       

        }
     
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
  const BookCard=({data})=>{

    const hasPromotion=data.categories.includes(10);

    return(
      <React.Fragment key={data.id}>
      <Card className="large-card" onClick={() => handleClick(data.id)} style={{ width: '18rem', margin: '1rem' }}>
        <Card.Img variant="top" src={`http://localhost:8000/${data.image}`} style={{ width: '100%', height: '100%' }} />
        <Card.Body>
          {hasPromotion&&(
            <div>
              <h2 style={{ color: "red"}}>On SALE</h2>
            </div>
          )}
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
    )

    
  }



  return (
    <div style={{ backgroundColor: "#d2b7ac" }}>
   <center> <h1 className='gradient-textp1art'>Come and see our secret Art books</h1></center>

     <center> <Container>
        <Row>
          {books.map((data) => (
         <BookCard data={data}/>
          ))}
        </Row>
      </Container></center>
    </div>
  );
}

export default Artbooks;

