import React, { useRef, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ReactMarkdown from "react-markdown";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: "★★★★★",
    text: "Found amazing deals on flights to Bali. The booking process was seamless!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: "★★★★☆",
    text: "Great hotel recommendations in Paris. Will definitely use again!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Hidden Gems in Europe",
    excerpt:
      "Discover off-the-beaten-path destinations that most tourists miss...",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
  },
  {
    id: 2,
    title: "Best Budget Travel Tips for 2025",
    excerpt: "How to see the world without breaking the bank...",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b",
  },
];

const App = () => {
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/signup"];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
  const [loggedIn, setLoggedIn] = useState(false);
  const [from, setFrom] = useState("");
  const [transportResults, setTransportResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // 🔥 New flag
  const [to, setTo] = useState("");
  const navigate = useNavigate();
  const [journeyDate, setJourneyDate] = useState("");
  const [showHotelResults, setShowHotelResults] = useState(false);
  const [hotelResults, setHotelResults] = useState([]);
  const [itinerary, setItinerary] = useState("");
  const [showItinerary, setShowItinerary] = useState(false);
  const [loadingItinerary, setLoadingItinerary] = useState(false);
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    setLoggedIn(isLoggedIn === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/");
  };

  const handleItinerary = async () => {
    const api = "https://vistoback.onrender.com/generate-itinerary";

    if (journeyDate === "" || endDate === "" || from === "" || to === "") {
      console.log("complete all fields");
      return;
    }

    const body = {
      location: to,
      startdate: journeyDate,
      enddate: endDate,
    };

    try {
      setLoadingItinerary(true);
      setShowItinerary(true);
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setItinerary(data?.markdown || "No itinerary found.");
      console.log(data);
      setShowItinerary(true);
      setShowResults(false);
      setShowHotelResults(false);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      setItinerary("Something went wrong.");
      setShowItinerary(true);
    } finally {
      setLoadingItinerary(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "https://vistoback.onrender.com/search_transport/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: from,
            destination: to,
            date: journeyDate,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTransportResults(data);
        setShowResults(true); // 🔥 Switch to results view
      } else {
        console.error("Search failed");
      }
    } catch (error) {
      console.error("Error searching transport:", error);
    }
  };

  const handleHotelSearch = async () => {
    console.log("🛏 Hotel search initiated");

    try {
      const response = await fetch(
        "https://vistoback.onrender.com/search_accommodation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: to, // or `from`, depending on your input
            budget: 5000, // <- Add this line (adjust the budget value as needed)
          }),
        }
      );

      console.log("🔁 Response received", response.status);
      const data = await response.json();
      console.log("📦 Hotel data:", data);

      if (response.ok) {
        setHotelResults(data);
        setShowHotelResults(true);
        setShowResults(false);
      } else {
        console.error("❌ Hotel search failed");
      }
    } catch (error) {
      console.error("🔥 Error fetching hotels:", error);
    }
  };

  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <img
            src="/logo.png"
            alt="Vistopia Logo"
            className="navbar-logo"
            width={150}
          />
        </Link>

        <div className="nav-links nav-links-row">
          <Link to="/destinations">Destinations</Link>
          <Link to="/flights">Flights</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/community"> Community </Link>
          Sanidhya
        </div>

        <div className="auth-buttons auth-buttons-row">
          {!loggedIn ? (
            <>
              <Link to="/login">
                <button className="login-btn">Log in</button>
              </Link>
              <Link to="/signup">
                <button className="signup-btn">Sign up</button>
              </Link>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Sign out
            </button>
          )}
        </div>
      </nav>

      {/* Routes Configuration */}
      <div className="content-container">
        <>
          {/* Hero Section */}
          <div className="hero-section">
            <h1>Journeys Reimagined!</h1>
            <p>
              Find the best hotels, compare flight prices, and plan your perfect
              trip.
            </p>

            {/* Search Box */}
            <div className="search-box">
              <div className="input-wrapper from">
                <span>📍</span>
                <input
                  type="text"
                  placeholder="From?"
                  aria-label="Departure location"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              <div className="input-wrapper to">
                <span>📍</span>
                <input
                  type="text"
                  placeholder="To?"
                  aria-label="Destination location"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div className="input-wrapper date">
                <label className="date-label text-black text-sm font-medium mb-1 block">
                  Start Date
                  <div className="relative">
                    <span
                      className="calendar-icon absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => startDateRef.current?.showPicker()}
                      role="button"
                      aria-label="Open start date picker"
                    >
                      📅
                    </span>
                    <input
                      type="date"
                      ref={startDateRef}
                      aria-label="Start date"
                      className="pl-8"
                      onChange={(e) => setJourneyDate(e.target.value)}
                    />
                  </div>
                </label>
              </div>

              <div className="input-wrapper date">
                <label className="date-label">
                  End Date
                  <div className="relative">
                    <span
                      className="calendar-icon absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => endDateRef.current?.showPicker()}
                      role="button"
                      aria-label="Open end date picker"
                    >
                      📅
                    </span>
                    <input
                      onChange={(e) => setEndDate(e.target.value)}
                      type="date"
                      ref={endDateRef}
                      aria-label="End date"
                      className="pl-8"
                    />
                  </div>
                </label>
              </div>

              <div className="btn-group">
                <button className="search-btn" onClick={handleSearch}>
                  Search Transport
                </button>
                <button className="search-btn" onClick={handleHotelSearch}>
                  Check Hotels
                </button>

                <button
                  className="search-btn"
                  onClick={handleItinerary}
                  disabled={loadingItinerary}
                >
                  Create my trip
                </button>
              </div>
            </div>

            {showItinerary && (
              <section
                style={{ color: "black" }}
                className="transport-results full-screen"
              >
                <button
                  className="back-btn"
                  onClick={() => {
                    setShowItinerary(false);
                    setItinerary("");
                  }}
                >
                  🔙 Go Back
                </button>
                {loadingItinerary ? (
                  <h2
                    style={{
                      color: "black",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <span className="shimmer-text">Curating an experience</span>
                    <span className="dots">.</span>
                  </h2>
                ) : (
                  <div
                    style={{
                      textAlign: "left",
                      paddingBottom: "140px",
                      color: "black",
                    }}
                    className="itinerary-output"
                  >
                    <ReactMarkdown>{itinerary}</ReactMarkdown>
                  </div>
                )}
              </section>
            )}

            {showResults && (
              <section className="transport-results full-screen">
                <button
                  className="back-btn"
                  onClick={() => setShowResults(false)}
                >
                  🔙 Go Back
                </button>
                <h2>Available Transport Options</h2>
                <div className="transport-grid">
                  {transportResults
                    .sort((a, b) => a.price - b.price)
                    .map((option, index) => {
                      const isCheapest = index === 0;
                      return (
                        <div
                          key={option.id || index}
                          className={`transport-card ${
                            isCheapest ? "highlight" : ""
                          }`}
                        >
                          <div className="transport-type">
                            {option.transport_type.toUpperCase()}
                          </div>
                          <div className="transport-route">
                            {option.origin} ➡ {option.destination}
                          </div>
                          <div className="transport-price">
                            💰 ${option.price}
                          </div>
                          <div className="transport-duration">
                            🕒 {option.duration}
                          </div>
                          {option.departure_time && option.arrival_time && (
                            <div className="transport-time">
                              🛫 {option.departure_time} - 🛬{" "}
                              {option.arrival_time}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </section>
            )}

            {showHotelResults && (
              <section className="transport-results full-screen">
                <button
                  className="back-btn"
                  onClick={() => setShowHotelResults(false)}
                >
                  🔙 Go Back
                </button>
                <h2>Available Hotels</h2>

                <div className="transport-grid">
                  {hotelResults.length > 0 ? (
                    hotelResults.map((hotel, index) => (
                      <div key={hotel.id || index} className="transport-card">
                        <div className="transport-type">🏨 {hotel.name}</div>
                        <div className="transport-route">{hotel.location}</div>
                        <div className="transport-price">
                          💰 ${hotel.price_per_night}/night
                        </div>
                        <div className="transport-duration">
                          ⭐ {hotel.rating} stars
                        </div>
                        {hotel.available_rooms && (
                          <div className="transport-time">
                            🛏 {hotel.available_rooms} rooms available
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No hotels found.</p>
                  )}
                </div>
              </section>
            )}

            {!showResults && !showHotelResults && (
              <section className="home-section">
                {/* your homepage content here */}
              </section>
            )}
          </div>

          {/* Popular Destinations */}
          <section className="section popular-destinations">
            <h2 className="section-title">Popular Destinations</h2>
            <div className="destinations-grid">
              {[
                {
                  id: 1,
                  name: "Paris",
                  description:
                    "The city of love and lights, known for the Eiffel Tower.",
                  image: "1.jpg",
                  link: "/destinations/paris",
                },
                {
                  id: 2,
                  name: "Tokyo",
                  description:
                    "A futuristic city blending tradition and technology.",
                  image: "Tokyo.jpg",
                  link: "/destinations/tokyo",
                },
                {
                  id: 3,
                  name: "New York",
                  description:
                    "The city that never sleeps, full of energy and life.",
                  image: "Newyork.jpg",
                  link: "/destinations/newyork",
                },
                {
                  id: 4,
                  name: "Rome",
                  description: "An ancient city with a rich cultural heritage.",
                  image: "Rome.jpg",
                  link: "/destinations/rome",
                },
                {
                  id: 5,
                  name: "Bali",
                  description: "A tropical paradise with beaches and temples.",
                  image: "background.jpg", // use actual image name you have
                  link: "/destinations/bali",
                },
                {
                  id: 6,
                  name: "Cape Town",
                  description:
                    "A vibrant city with stunning landscapes and coastline.",
                  image: "Capetown.jpg",
                  link: "/destinations/capetown",
                },
              ].map((destination) => (
                <div key={destination.id} className="destination-card">
                  <img
                    src={`/${destination.image}`} // Access from public folder
                    alt={destination.name}
                  />
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <Link to={destination.link} className="explore-btn">
                    Explore
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Deals Section */}
          <section className="section deals-section">
            <h2 className="section-title">Hot Deals</h2>
            <div className="deals-grid">
              {[1, 2, 3].map((deal) => (
                <div key={deal} className="deal-card">
                  <img
                    src={`https://source.unsplash.com/random/300x200?hotel=${deal}`}
                    alt={`Deal ${deal}`}
                  />
                  <div className="deal-info">
                    <h3>Special Offer {deal}</h3>
                    <p className="deal-price">$99/night</p>
                    <p className="deal-desc">Limited time offer</p>
                    <Link to={`/hotels/${deal}`} className="book-now-btn">
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="section testimonials">
            <h2 className="section-title">What Our Travelers Say</h2>
            <div className="testimonials-slider">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div className="testimonial-content">
                    <div className="rating">{testimonial.rating}</div>
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    <p className="testimonial-author">- {testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Travel Blog */}
          <section className="section blog-section">
            <h2 className="section-title">Travel Guides</h2>
            <div className="blog-grid">
              {blogPosts.map((post) => (
                <div key={post.id} className="blog-card">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-image"
                  />
                  <div className="blog-content">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="read-more-btn">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="section features-section">
            <h2 className="section-title">Why Choose Us?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>Best Price Guarantee</h3>
                <p>We'll match or beat any competitor's price</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🕒</div>
                <h3>24/7 Customer Support</h3>
                <p>Help available anytime, anywhere</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✈</div>
                <h3>Handpicked Hotels</h3>
                <p>Only the best accommodations</p>
              </div>
            </div>
          </section>
        </>
      </div>
      {shouldShowFooter && (
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-brand">
              <h2>Vistopia</h2>
              <p>Explore the world with confidence and comfort.</p>
            </div>

            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/destinations">Destinations</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Vistopia. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
