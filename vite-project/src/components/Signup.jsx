import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form refresh on Enter
    try {
      const response = await axios.post("http://localhost:8000/signup/", {
        username,
        password,
      });
      setMsg("Signup successful!");

      // ✅ Store login state
      localStorage.setItem("loggedIn", "true");

      // ✅ Navigate to home and reload
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (error) {
      setMsg(error.response?.data?.detail || "Signup failed.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Email Address"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default SignUp;
