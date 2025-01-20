import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Rating,
  Chip,
} from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1a1a2e",
      paper: "#16213e",
    },
    primary: {
      main: "#0f3460",
    },
    secondary: {
      main: "#e94560",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 20px -10px rgba(0,0,0,0.3)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})

function App() {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    title: "",
    author: "",
    rating: "",
    reviewText: "",
  })
  const [editingReview, setEditingReview] = useState(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/reviews")
      setReviews(response.data)
    } catch (error) {
      console.error("Error fetching reviews:", error.message)
    }
  }

  const handleAddOrUpdateReview = async (e) => {
    e.preventDefault()
    if (editingReview) {
      try {
        const response = await axios.put(`http://localhost:5000/reviews/${editingReview._id}`, newReview)
        setReviews(reviews.map((review) => (review._id === editingReview._id ? response.data : review)))
        setEditingReview(null)
        setNewReview({ title: "", author: "", rating: "", reviewText: "" })
      } catch (error) {
        console.error("Error updating review:", error.message)
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/reviews", newReview)
        setReviews([...reviews, response.data])
        setNewReview({ title: "", author: "", rating: "", reviewText: "" })
      } catch (error) {
        console.error("Error adding review:", error.message)
      }
    }
  }

  const handleEditReview = (review) => {
    setEditingReview(review)
    setNewReview({
      title: review.title,
      author: review.author,
      rating: review.rating,
      reviewText: review.reviewText,
    })
  }

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`)
      setReviews(reviews.filter((review) => review._id !== id))
    } catch (error) {
      console.error("Error deleting review:", error.message)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: "secondary.main", fontWeight: "bold" }}>
          Book Review App
        </Typography>
        <Card sx={{ marginBottom: "2rem", padding: "1rem" }}>
          <Box component="form" onSubmit={handleAddOrUpdateReview}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              margin="normal"
              required
            />
            <Rating
              name="rating"
              value={Number(newReview.rating)}
              onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue.toString() })}
              sx={{ marginY: "1rem" }}
            />
            <TextField
              fullWidth
              label="Review"
              multiline
              rows={4}
              variant="outlined"
              value={newReview.reviewText}
              onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
              margin="normal"
              required
            />
            <Button variant="contained" color="secondary" type="submit" fullWidth sx={{ marginTop: "1rem" }}>
              {editingReview ? "Update Review" : "Add Review"}
            </Button>
          </Box>
        </Card>

        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} key={review._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    {review.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                    By: {review.author}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                    <Rating value={Number(review.rating)} readOnly size="small" />
                    <Chip label={`${review.rating}/5`} size="small" sx={{ marginLeft: "0.5rem" }} />
                  </Box>
                  <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
                    {review.reviewText}
                  </Typography>
                  <Box sx={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditReview(review)}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteReview(review._id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default App

