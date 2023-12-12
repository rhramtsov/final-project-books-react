import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import back from "../assets/images/back.jpeg"; // Ensure this path is correct

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Passwords did not match!");
    } else {
      try {
        await axios.post("http://localhost:8000/register", {
          username: username,
          email: email,
          password: password1,
        });
        navigate('/login');
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        }
      }
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${back})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      padding: "20px"
    }}>
      <center>
        <h2 className="gradient-outlined-textheder">Please Register</h2>
        <form onSubmit={handleSubmit} style={{ width: '300px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Username:
            </label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Password:
            </label>
            <input
              type="password"
              name="password1"
              onChange={(e) => setPassword1(e.target.value)}
              style={{ width: '100%', borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Confirm Password:
            </label>
            <input
              type="password"
              name="password2"
              onChange={(e) => setPassword2(e.target.value)}
              style={{ width: '100%', borderRadius: "5px" }}
            />
          </div>
          <button type="submit" style={{ width: '100%', backgroundColor:"#febb04" }}>Register</button>
        </form>
        {error && <p>{error}</p>}
      </center>
    </div>
  );
}

export default Register;
