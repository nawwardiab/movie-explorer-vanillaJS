// Imports functions from the api.js and ui.js files
import {
  searchMovies,
  getTrendingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
} from "./api.js";
import {
  displayMovies,
  displayFavorites,
  showErrorMessage,
  clearMovieContainer,
  showLoadingSpinner,
  hideLoadingSpinner,
  displayTrendingMovies,
  displayUpcomingMovies,
  displayTopRatedMovies,
} from "./ui.js";

// Function to setup the theme toggle
function setupThemeToggle() {
  const themeToggleBtn = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeIcon.classList.toggle("fa-moon", !isLight);
    themeIcon.classList.toggle("fa-sun", isLight);
  });
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    document.body.classList.remove("light-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

// Function to retry fetching trending movies
function retryTrendingMovies() {
  showLoadingSpinner("#trending-spinner"); // Show the loading spinner while fetching movies
  getTrendingMovies()
    .then((movies) => {
      hideLoadingSpinner("#trending-spinner"); // Hide the loading spinner once movies are fetched
      displayTrendingMovies(movies.slice(0, 10)); // Display the first 10 trending movies
      setupCarouselButtons(
        "#trending-movies",
        "#trending-prev-btn",
        "#trending-next-btn"
      );
    }) // Once movies are fetched, display them
    .catch((error) => {
      hideLoadingSpinner("#trending-spinner"); // Hide the loading spinner if an error occurs
      console.log("Error fetching trending movies: ", error);
      showErrorMessage(
        "an error occurred while fetching the movies. Please try again later.",
        retryTrendingMovies
      );
    });
}

// Function to retry fetching upcoming movies
function retryUpcomingMovies() {
  showLoadingSpinner("#upcoming-spinner"); // Show the loading spinner while fetching movies
  getUpcomingMovies()
    .then((movies) => {
      hideLoadingSpinner("#upcoming-spinner"); // Hide the loading spinner once movies are fetched
      displayUpcomingMovies(movies.slice(0, 10)); // Display the first 10 upcoming movies
      setupCarouselButtons(
        "#upcoming-movies",
        "#upcoming-prev-btn",
        "#upcoming-next-btn"
      );
    }) // Once movies are fetched, display them
    .catch((error) => {
      hideLoadingSpinner("#upcoming-spinner"); // Hide the loading spinner if an error occurs
      console.log("Error fetching upcoming movies: ", error);
      showErrorMessage(
        "an error occurred while fetching the movies. Please try again later.",
        retryUpcomingMovies
      );
    });
}

// Function to retry fetching top-rated movies
function retryTopRatedMovies() {
  showLoadingSpinner("#top-rated-spinner"); // Show the loading spinner while fetching movies
  getTopRatedMovies()
    .then((movies) => {
      hideLoadingSpinner("#top-rated-spinner"); // Hide the loading spinner once movies are fetched
      displayTopRatedMovies(movies.slice(0, 10)); // Display the first 10 top-rated movies
      setupCarouselButtons(
        "#top-rated-movies",
        "#top-rated-prev-btn",
        "#top-rated-next-btn"
      );
    }) // Once movies are fetched, display them
    .catch((error) => {
      hideLoadingSpinner("#top-rated-spinner"); // Hide the loading spinner if an error occurs
      console.log("Error fetching top-rated movies: ", error);
      showErrorMessage(
        "an error occurred while fetching the movies. Please try again later.",
        retryTopRatedMovies
      );
    });
}

// Function to setup carousel buttons functionality
function setupCarouselButtons(
  containerSelector,
  prevBtnSelector,
  nextBtnSelector
) {
  const container = document.querySelector(containerSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  if (!container || !prevBtn || !nextBtn) {
    console.error(
      "Carousel elements not found for selectors: ",
      containerSelector
    );
    return; // Return early if any of the elements are not found
  }

  const scrollAmount = 220; // Adjust this to match the width of cards plus margin

  // Event Listener for the Previous Button
  prevBtn.addEventListener("click", () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  // Event Listener for the Next Button
  nextBtn.addEventListener("click", () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });
}
// Debounce function definition
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// function to handle the search
const handleSearch = () => {
  const query = document.querySelector("#search-input").value; // Get the search query from the input field

  // Add Event Listener to the search button
  // When clicked, it fetches the user's input and triggers the movie search

  console.log("🚀 ~ document.querySelector ~ query:", query); // Debugging: log the query to the console
  if (query) {
    clearMovieContainer(); // clear previous results before searching for new ones
    showLoadingSpinner("#loading-spinner"); // Show the loading spinner while fetching movies

    // If the query is not empty, search for movies
    searchMovies(query)
      .then((movies) => {
        hideLoadingSpinner("#loading-spinner"); // Hide the loading spinner once movies are fetched
        displayMovies(movies); // Display the first 10 movies
      }) // Once movies are fetched, display them
      .catch((error) => {
        hideLoadingSpinner("#loading-spinner"); // Hide the loading spinner if an error occurs
        console.log("Error: ", error);
        showErrorMessage(
          "an error occurred while fetching the movies. Please try again later."
        );
      }); // Log any errors that occur
  }
};

// Function to check if a movie is favorited
function toggleFavoriteStatus(movieId, favoriteBtn) {
  if (isFavorite(movieId)) {
    removeFavorite(movieId);
    favoriteBtn.classList.remove("favorited");
    favoriteBtn.style.color = "none";
  } else {
    saveFavorite({ id: movieId }); // Add the full movie object if needed
    favoriteBtn.classList.add("favorited");
    favoriteBtn.style.color = "red";
  }

  // Update favorite list in the favorites section
  displayFavorites();
}

//Add a function to handle swipe gestures for the carousels
function setupSwipeGesture(container) {
  let startX = 0;
  let endX = 0;

  container.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX; // Record the starting X position when the touch starts
  });

  container.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX; // Update the X position as the user moves their finger
  });

  container.addEventListener("touchend", () => {
    if (startX - endX > 50) {
      // Swiped left
      container.scrollBy({
        left: container.clientWidth,
        behavior: "smooth",
      });
    } else if (endX - startX > 50) {
      // Swiped right
      container.scrollBy({
        left: -container.clientWidth,
        behavior: "smooth",
      });
    }
  });
}

// Event Listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();

  // Add event listener to the navigation toggle
  const navToggle = document.querySelector("#nav-toggle");
  const navMenu = document.querySelector("#nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  displayFavorites(); // Display favorite movies when the page loads

  // Add event listener to the movies container using event delegation
  // Add event listener to the movies container using event delegation
  const moviesContainers = [
    document.querySelector("#movies-container"), // General movies container
    document.querySelector("#trending-movies"), // Trending section
    document.querySelector("#upcoming-movies"), // Upcoming section
    document.querySelector("#top-rated-movies"), // Top Rated section
  ];
  moviesContainers.forEach((container) => {
    if (container) {
      container.addEventListener("click", (event) => {
        const target = event.target;

        // Handle favorite button clicks
        if (target.matches("#favorite-btn, #favorite-btn *")) {
          const favoriteBtn = target.closest("#favorite-btn");
          const movieCard = target.closest(".movie-card");
          const movieId = movieCard.dataset.id;

          // Toggle favorite status when the favorite button is clicked
          toggleFavoriteStatus(movieId, favoriteBtn);
        }

        // Handle movie card clicks (excluding favorite button clicks)
        if (
          target.closest(".movie-card") &&
          !target.matches("#favorite-btn, #favorite-btn *")
        ) {
          const movieCard = target.closest(".movie-card");
          const movieId = movieCard.dataset.id;

          getMovieDetails(movieId)
            .then(displayMovieDetails)
            .catch((error) =>
              console.log("Error fetching movie details: ", error)
            );
        }
      });
    }
  });

  // Existing search button event listener
  const searchBtn = document.querySelector("#search-button");
  const searchInput = document.querySelector("#search-input");

  const debouncedSearch = debounce(handleSearch, 200); // Debounce the handleSearch function

  // Add an event listener to the search button
  searchBtn.addEventListener("click", () => {
    handleSearch(); // Call the handleSearch function when the search button is clicked
  });
  searchInput.addEventListener("input", debouncedSearch); // Call the debouncedSearch function when the input value changes
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Call the handleSearch function when the Enter key is pressed
    }
  });

  // Add swipe gestures to the carousels
  const trendingMoviesContainer = document.querySelector("#trending-movies");
  const upcomingMoviesContainer = document.querySelector("#upcoming-movies");
  const topRatedMoviesContainer = document.querySelector("#top-rated-movies");

  if (trendingMoviesContainer) setupSwipeGesture(trendingMoviesContainer);
  if (upcomingMoviesContainer) setupSwipeGesture(upcomingMoviesContainer);
  if (topRatedMoviesContainer) setupSwipeGesture(topRatedMoviesContainer);

  // Display trending movies when the page loads
  retryTrendingMovies(); // Retry fetching trending movies if an error occurs
  retryUpcomingMovies(); // Retry fetching upcoming movies if an error occurs
  retryTopRatedMovies(); // Retry fetching top-rated movies if an error occurs
});
