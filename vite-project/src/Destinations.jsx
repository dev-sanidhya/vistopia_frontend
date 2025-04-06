import React from "react";
import "./App.css";

const destinations = [
  { name: "Paris, France", image: "/Paris.jpg" },
  { name: "Tokyo, Japan", image: "/Tokyo.jpg" },
  { name: "New York, USA", image: "/Newyork.jpg" },
  { name: "London, UK", image: "/London.jpg" },
  { name: "Dubai, UAE", image: "/Dubai.jpg" },
  { name: "Sydney, Australia", image: "/Sydney.jpg" },
  { name: "Rome, Italy", image: "/Rome.jpg" },
  { name: "Bangkok, Thailand", image: "/Bangkok.jpg" },
  { name: "Cape Town, South Africa", image: "/Capetown.jpg" },
  { name: "Rio de Janeiro, Brazil", image: "/Rio-de-janerio.jpg" },
  { name: "Istanbul, Turkey", image: "/Istanbul.jpg" },
  { name: "Barcelona, Spain", image: "/Barcelona.jpg" }
];

const Destinations = () => {
  return (
    <div className="page-wrapper">
      <div className="destinations-container">
        <h1>Popular Destinations</h1>
        <div className="destinations-grid">
          {destinations.map((dest, index) => (
            <div key={index} className="destination-card">
              <img src={dest.image} alt={dest.name} />
              <h3>{dest.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
};

export default Destinations;