import { Link } from 'react-router-dom';
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import "./styles.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row,Grid,Container } from 'react-bootstrap';
const Artbooks = () => {
    const [clicked,setClicked]=useState(false)
    const [book,getBook]=useState([])
    const [value,setValue]=useState('in')
    function getAllBook() {
      
        axios
          .get("http://localhost:8000/art-books")
          .then((response) => {
            console.log(response.data);
            console.log(response.data);
            getBook(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
      useEffect(()=>{
        getAllBook()
      },[])
      const handleClick = (cardId) => {
        setClicked(prevState => ({
          ...prevState,
          [cardId]: !prevState[cardId]
        }));
      };
      
  return (
    <div> 
        <Container>
        <Row>
        {book.map((data,index)=>(
        
    <Card   className={`large-card ${clicked ? 'clicked':""}`} onClick={()=>handleClick(data.id)} >
    <Card.Img style={{
        width:"100%",
        height:"100%"
    }} variant="top" src={`http://localhost:8000/${data.image}`} />
    <Card.Body>
      <Card.Title>{data.name}</Card.Title>
      <Card.Text>
       stock {data.stock}
      </Card.Text>
      <Card.Text>
       price {data.price}
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>


))}

</Row>
</Container>
</div>
  )
}

export default Artbooks