import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to The secret Book Store</h1>
      <p>Here you can find an extensive collection of books across various genres.</p>
      
      <div>
        <h2>Browse Our Collections</h2>
        <ul>
          <li><Link to="/all-books">All Books</Link></li>
          <li><Link to="/art-books">Art Books</Link></li>
          <li><Link to="/fiction-books">Fiction Books</Link></li>
          <li><Link to="/children-books">Children's Books</Link></li>
          <li><Link to="/sale">SALE</Link></li>

        </ul>
      </div>

      <div>
        <h2>Get in Touch</h2>
        <p>Have any questions or need assistance? Don't hesitate to <Link to="/contact-us">contact us</Link>.</p>
      </div>
    </div>
  );
}

export default HomePage;
