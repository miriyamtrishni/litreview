import React from "react";
import { Link } from "react-router-dom";

const ReviewList = ({ reviews, onDeleteReview }) => {
  return (
    <div>
      {reviews.map((review) => (
        <div className="card" key={review._id}>
          <h3>{review.title}</h3>
          <p>By: {review.author}</p>
          <p>Rating: {review.rating} / 5</p>
          <p>{review.reviewText}</p>
          <Link to={`/edit/${review._id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => onDeleteReview(review._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
