import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import back from "../assets/images/back.jpeg";

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

      const token = response.data.access;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      console.log("Login successful", response.data);
      alert("Login successful ");
      localStorage.setItem("user",username)
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.response.data);
      setError("Username or password incorrect");
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
        <h2 className="gradient-outlined-textheder">Please Login</h2>
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
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', borderRadius: "5px" }}
            />
          </div>
          <button type="submit" style={{ width: '100%', backgroundColor:"#febb04" }}>Login</button>
        </form>
        {error && <p>{error}</p>}
      </center>
    </div>
  );
};

export default Login;