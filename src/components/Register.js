import React from 'react';

function Register() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const response = await fetch('/register/', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(data)),
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as needed, like CSRF tokens
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      // Handle success - maybe redirect to login page or show a success message
      console.log('Registration successful:', responseData);
    } else {
      // Handle errors - display form errors from responseData
      console.error('Registration failed:', responseData);
    }
  };

  return (
    <div>
      <h2>Please Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="password" name="password2" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
