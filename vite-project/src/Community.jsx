import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Community.css"; // optional if you're using custom CSS

const Community = () => {
  const [city, setCity] = useState("");
  const [content, setContent] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch posts when selectedCity changes
  useEffect(() => {
    if (selectedCity) {
      axios
        .get(`https://vistoback.onrender.com/community/posts/${selectedCity}`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error(err));
    }
  }, [selectedCity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://vistoback.onrender.com/community/posts",
        {
          city,
          content,
          user_email: userEmail,
        }
      );
      alert("Post submitted!");
      setCity("");
      setContent("");
      setUserEmail("");
      setSelectedCity(city); // Refresh posts for that city
    } catch (err) {
      alert("Error submitting post.");
      console.error(err);
    }
  };

  return (
    <div className="community-container">
      <h1>🌍 Community Forum</h1>

      <form onSubmit={handleSubmit} className="community-form">
        <input
          type="text"
          placeholder="City (e.g., Paris)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your email (used at sign-in)"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Share your tips, experiences, or questions..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>

      <hr />

      <h2>🔍 View Community Posts</h2>
      <input
        type="text"
        placeholder="Search city (e.g., Tokyo)"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      />

      {posts.length > 0 ? (
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <p>
                <strong>{post.user_email}</strong> from{" "}
                <strong>{post.city}</strong>
              </p>
              <p>{post.content}</p>
              <small>{new Date(post.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts yet for this city.</p>
      )}
    </div>
  );
};

export default Community;
