import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password1 !== password2) {
      setError("Passwords did not matched!");
    } else {
      axios
        .post("http://localhost:8000/register", {
          username: username,
          email: email,
          password: password1,
        })
        .then((res) => {
          navigate('/login')
        })
        .catch((err) => {
          if(err.response.data&&err.response.data.message){
            setError(err.response.data.message)
          }
        });
    }
  };

  return (
    <div style={{ backgroundColor: "#d2b7ac" }}>
    <center> <h2 className='gradient-outlined-textheder'>Please Register</h2></center>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          placeholder="Username"
          // required
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="Email"
          // required
        />
        <input
          type="password"
          onChange={(e) => setPassword1(e.target.value)}
          name="password1"
          placeholder="Password"
          // required
        />
        <input
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
          name="password2"
          placeholder="Confirm Password"
          // required
        />
        <button type="submit">Register</button>
      </form>
      {error}
    </div>
  );
}

export default Register;
