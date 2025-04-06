import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Destinations from "./Destinations";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import About from "./About.jsx";
import Contact from "./Contact.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
          <Route path="/destinations" element={<Destinations />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<SignUp />} /> 
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
