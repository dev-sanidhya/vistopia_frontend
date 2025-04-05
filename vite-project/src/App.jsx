import React, { useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Destinations from "./Destinations";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: "★★★★★",
    text: "Found amazing deals on flights to Bali. The booking process was seamless!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: "★★★★☆",
    text: "Great hotel recommendations in Paris. Will definitely use again!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  }
];

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Hidden Gems in Europe",
    excerpt: "Discover off-the-beaten-path destinations that most tourists miss...",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
  },
  {
    id: 2,
    title: "Best Budget Travel Tips for 2025",
    excerpt: "How to see the world without breaking the bank...",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b"
  }
];

const App = () => {
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

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
        </div>

        <div className="auth-buttons auth-buttons-row">
          <button className="login-btn">Log in</button>
          <button className="signup-btn">Sign up</button>
        </div>
      </nav>

      {/* Routes Configuration */}
      <div className="content-container">
        <Routes>
          <Route path="/destinations" element={<Destinations />} />

          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <div className="hero-section">
                  <h1>Journeys Reimagined!</h1>
                  <p>
                    Find the best hotels, compare flight prices, and plan your
                    perfect trip.
                  </p>

                  {/* Search Box */}
                  <div className="search-box">
                    <div className="input-wrapper from">
                      <span>📍</span>
                      <input
                        type="text"
                        placeholder="From?"
                        aria-label="Departure location"
                      />
                    </div>

                    <div className="input-wrapper to">
                      <span>📍</span>
                      <input
                        type="text"
                        placeholder="To?"
                        aria-label="Destination location"
                      />
                    </div>

                    <div className="input-wrapper date">
                      <span
                        className="calendar-icon"
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
                      />
                    </div>

                    <div className="input-wrapper date">
                      <span
                        className="calendar-icon"
                        onClick={() => endDateRef.current?.showPicker()}
                        role="button"
                        aria-label="Open end date picker"
                      >
                        📅
                      </span>
                      <input
                        type="date"
                        ref={endDateRef}
                        aria-label="End date"
                      />
                    </div>

                    <button className="search-btn" aria-label="Search for trips">
                      Search
                    </button>
                  </div>
                </div>

                {/* Popular Destinations */}
                <section className="section popular-destinations">
                  <h2 className="section-title">Popular Destinations</h2>
                  <div className="destinations-grid">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="destination-card">
                        <img
                          src={`https://source.unsplash.com/random/300x200?destination=${item}`}
                          alt={`Destination ${item}`}
                        />
                        <h3>Destination {item}</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                        <Link to={`/destinations/${item}`} className="explore-btn">
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
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <div className="testimonial-content">
                          <div className="rating">{testimonial.rating}</div>
                          <p className="testimonial-text">
                            "{testimonial.text}"
                          </p>
                          <p className="testimonial-author">
                            - {testimonial.name}
                          </p>
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
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;