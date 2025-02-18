import "dotenv/config";

import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(cors()); // Enable frontend requests

const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Route to search movies
app.get("/api/search", async (req, res) => {
  const { query } = req.query;
  if (!query)
    return res.status(400).json({ error: "Query parameter is required" });

  try {
    const response = await axios.get(`${TMDB_API_BASE}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// Route to get movie details (with trailers, credits, recommendations)
app.get("/api/movie-details", async (req, res) => {
  const { movieId } = req.query;
  if (!movieId) return res.status(400).json({ error: "Movie ID is required" });

  try {
    const response = await axios.get(`${TMDB_API_BASE}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: "videos,credits,recommendations",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

// Route to fetch trending movies
app.get("/api/trending", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_API_BASE}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

// Route to fetch upcoming movies
app.get("/api/upcoming", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_API_BASE}/movie/upcoming`, {
      params: { api_key: TMDB_API_KEY, language: "en-US", page: 1 },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
});

// Route to fetch top-rated movies
app.get("/api/top-rated", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_API_BASE}/movie/top_rated`, {
      params: { api_key: TMDB_API_KEY, language: "en-US", page: 1 },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top-rated movies" });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
