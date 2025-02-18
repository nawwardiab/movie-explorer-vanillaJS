const backendUrl = "http://localhost:5000/api"; // Backend proxy URL

// Function to search for movies
export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${backendUrl}/search?query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Failed to fetch movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

// Function to get movie details (with extras)
export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${backendUrl}/movie-details?movieId=${movieId}`
    );
    if (!response.ok) throw new Error("Failed to fetch movie details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

// Function to get trending movies
export async function getTrendingMovies() {
  try {
    const response = await fetch(`${backendUrl}/trending`);
    if (!response.ok) throw new Error("Failed to fetch trending movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
}

// Function to get upcoming movies
export async function getUpcomingMovies() {
  try {
    const response = await fetch(`${backendUrl}/upcoming`);
    if (!response.ok) throw new Error("Failed to fetch upcoming movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
}

// Function to get top-rated movies
export async function getTopRatedMovies() {
  try {
    const response = await fetch(`${backendUrl}/top-rated`);
    if (!response.ok) throw new Error("Failed to fetch top-rated movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    throw error;
  }
}
