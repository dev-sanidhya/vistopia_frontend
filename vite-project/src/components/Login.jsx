import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form reload on Enter key
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      });
      setMsg(`Welcome ${response.data.username}!`);

      // ✅ Set login state in localStorage
      localStorage.setItem("loggedIn", "true");

      // ✅ Navigate and reload to update navbar
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // reload App to reflect navbar update
      }, 1500);
    } catch (error) {
      setMsg(error.response?.data?.detail || "Login failed.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Login;