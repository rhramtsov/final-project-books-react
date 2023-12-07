import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/token", {
        username: username,
        password: password,
      });

      // Assuming the server responds with a JWT token in the 'token' field of the response
      const token = response.data.access;

      // Save the token to Axios defaults
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Save the token to local storage
      localStorage.setItem("token", token);
      let decoded = jwtDecode(token);

      // Handle successful login, e.g., redirect to a new page
      console.log("Login successful", response.data);
      alert("login succesful");
      navigate("/");
    } catch (error) {
      // Handle login error, e.g., display an error message
      console.error("Login failed", error.response.data);
      setError("username or/and password incorrect")
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={(e)=>setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error}
    </div>
  );
};

export default Login;
