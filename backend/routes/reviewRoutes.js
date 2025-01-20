const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new review
router.post('/', async (req, res) => {
    const { title, author, rating, reviewText } = req.body;
    try {
        const newReview = new Review({ title, author, rating, reviewText });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update a review
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, reviewText } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { title, author, rating, reviewText },
            { new: true }
        );
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a review
router.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
