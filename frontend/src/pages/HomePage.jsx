import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await axios.get("http://localhost:5000/reviews");
    setReviews(response.data);
  };

  const handleAddReview = async (newReview) => {
    const response = await axios.post("http://localhost:5000/reviews", newReview);
    setReviews([...reviews, response.data]);
  };

  const handleDeleteReview = async (id) => {
    await axios.delete(`http://localhost:5000/reviews/${id}`);
    setReviews(reviews.filter((review) => review._id !== id));
  };

  return (
    <div>
      <h2> Book Reviews</h2>
      <ReviewForm onAddReview={handleAddReview} />
      <ReviewList reviews={reviews} onDeleteReview={handleDeleteReview} />
    </div>
  );
};

export default HomePage;
