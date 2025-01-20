import React, { useState } from "react";

const ReviewForm = ({ onAddReview }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: "",
    reviewText: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview(formData);
    setFormData({ title: "", author: "", rating: "", reviewText: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Review</h3>
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
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
