import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    topic: 'The Sicret Book Store',
    subject: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, like sending data to your backend
    console.log(formData);
  };

  return (
    <div style={{ backgroundColor: "#d2b7ac" }}>
    <center> <h1 className='gradient-textp1art'>Lats sty in touch Contact us</h1></center>
      

      <div className="container" style={{ paddingTop: '80px' }}>
        {/* Display messages here */}
      </div>

      <center>
        <div className="container">
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div>
              <label htmlFor="fname">First Name</label>
              <input type="text" id="fname" name="firstname" placeholder="Your name.." onChange={handleChange} />
            </div>
            {/* Other form fields */}
            <div className="button1">
              <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
          </form>
        </div>
      </center>

      {/* Footer */}
    </div>
  );
};

export default ContactUs;
