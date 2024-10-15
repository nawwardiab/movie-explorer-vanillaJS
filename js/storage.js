// Function to save a movie in the local storage
export function saveFavorite(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Get the favorites from local storage

  // Check if the movie is already in the favorites
  if (!favorites.some((fav) => fav.id === movie.id)) {
    favorites.push(movie); // Add the movie to the favorites list
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Save the updated favorites list
  }
}

// Function to remove a movie from the local storage
export function removeFavorite(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Get the favorites from local storage

  // Filter out the movie to be removed
  favorites = favorites.filter((fav) => fav.id !== movieId);
  localStorage.setItem("favorites", JSON.stringify(favorites)); // Save the updated favorites list
}

// Function to check if a movie is favorited
export function isFavorite(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Get the favorites from local storage

  // Check if the movie is in the favorites list
  return favorites.some((fav) => fav.id === movieId);
}

export function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Get the favorites from local storage
  return favorites;
}
