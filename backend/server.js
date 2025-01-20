const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Review Schema
const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

// API Routes
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

app.post("/reviews", async (req, res) => {
  try {
    const { title, author, rating, reviewText } = req.body;
    const newReview = new Review({ title, author, rating, reviewText });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: "Failed to create review" });
  }
});

app.delete("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete review" });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.put("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, rating, reviewText } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { title, author, rating, reviewText },
      { new: true }
    );
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: "Failed to update review" });
  }
});
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    const aggregatedReviews = {};

    // Calculate average ratings for each book
    reviews.forEach((review) => {
      if (!aggregatedReviews[review.title]) {
        aggregatedReviews[review.title] = { reviews: [], averageRating: 0 };
      }
      aggregatedReviews[review.title].reviews.push(review);
    });

    // Compute average rating
    Object.keys(aggregatedReviews).forEach((title) => {
      const bookReviews = aggregatedReviews[title].reviews;
      const totalRating = bookReviews.reduce((sum, review) => sum + review.rating, 0);
      aggregatedReviews[title].averageRating = (totalRating / bookReviews.length).toFixed(1);
    });

    res.json(aggregatedReviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});


// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
