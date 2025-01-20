import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: "",
    reviewText: "",
  });

  useEffect(() => {
    const fetchReview = async () => {
      const response = await axios.get(`http://localhost:5000/reviews/${id}`);
      setFormData(response.data);
    };

    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/reviews/${id}`, formData);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          required
          min="1"
          max="5"
        />
        <textarea
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
          placeholder="Your review"
          required
        />
        <button type="submit">Update Review</button>
      </form>
    </div>
  );
};

export default EditPage;
