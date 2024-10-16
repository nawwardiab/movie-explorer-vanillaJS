// Description: This file contains the API request function to search for movies using the TMDB API.

// TMDB API Key and base URL for searching movies
import { apiKey } from "./config.js";

const apiBaseUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1`;

const movieDetailsUrl = `https://api.themoviedb.org/3/movie/`;

// API request options, including the Authorization header with a Bearer token
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2U3NWVkZTg4ODJiZjI4YjBlNTU4N2RiYWM3MTYxMSIsIm5iZiI6MTcyODU1OTY3OS4zMjg4NDIsInN1YiI6IjY3MDdhMTQwZDA2MTZjN2IxOWZiNTMzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pD4OKs_H44sukHXaN67NPHdm9n7W7EbOs9LYGPJe-h4",
  },
};

// Function to search for movies using the TMDB API
export async function searchMovies(query) {
  try {
    console.log("Making API call with query", query);
    // Build the API URL with the search query
    const response = await fetch(
      `${apiBaseUrl}&api_key=${apiKey}&query=${encodeURIComponent(query)}`,
      options
    );
    console.log("searchMovies function: ", response); // Debugging: log the API response

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch movies"); // Throw an error if the fetch fails
    }

    const data = await response.json(); // Parse the JSON response
    console.log(data);

    // If movies are found, display them
    if (data.results && data.results.length > 0) {
      console.log(data.results); // Debugging: log the search results
      return data.results; // Return the results for further use
    } else {
      throw new Error("No results found for this query"); // Throw an error if no movies are found
      // return []; // Return an empty array
    }
  } catch (error) {
    console.log("Error during API call: ", error); // Log any errors that occur during fetch
    throw error; // Throw the error to ensure .catch() is called in app.js
  }
}

// Function to fetch movie details with extras (trailers, credits, recommendations)
export async function getMovieDetails(movieId) {
  const detailsUrl = `${movieDetailsUrl}${movieId}?api_key=${apiKey}&append_to_response=videos,credits,recommendations`;
  try {
    const response = await fetch(detailsUrl, options);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data; // Now we have details, trailers, credits (cast), and recommendations
  } catch (error) {
    console.log("Error during fetching movie details with extras: ", error);
    throw error;
  }
}

// Function to fetch trending movies

export async function getTrendingMovies() {
  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  try {
    const response = await fetch(trendingUrl, options);
    if (!response.ok) {
      throw new Error("Failed to fetch trending movies");
    }
    const data = await response.json();
    return data.results; // Return the trending movies
  } catch (error) {
    console.log("Error during fetching trending movies: ", error);
    throw error; // Throw the error to ensure .catch() is called in app.js
  }
}

// Function to fetch upcoming movies
export async function getUpcomingMovies() {
  const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(upcomingUrl, options);
    if (!response.ok) {
      throw new Error("Failed to fetch upcoming movies");
    }
    const data = await response.json();
    return data.results; // Return the upcoming movies
  } catch (error) {
    console.log("Error during fetching upcoming movies: ", error);
    throw error; // Throw the error to ensure .catch() is called in
  }
}

// Function to fetch top-rated movies
export async function getTopRatedMovies() {
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
  try {
    const response = await fetch(topRatedUrl, options);
    if (!response.ok) {
      throw new Error("Failed to fetch top rated movies");
    }

    const data = await response.json();
    return data.results; // Return the top rated movies
  } catch (error) {
    console.log("Error during fetching top rated movies: ", error);
    throw error; // Throw the error to ensure .catch() is called in app.js
  }
}
