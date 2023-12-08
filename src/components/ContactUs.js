import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you are using React Router

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    topic: 'The SicBook Store',
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
    <div style={{ backgroundImage: "url('/media/backpichome.jpg')" }}>
      {/* Your navbar here */}
      
      <h1 style={{ color: 'rgb(220, 232, 242)' }}>We want to be in touch</h1>

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
