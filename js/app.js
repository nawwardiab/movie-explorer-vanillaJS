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

// theme toggle
const themeToggleBtn = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  // themeIcon.classList.remove("fa-moon");
  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
});

const navToggle = document.querySelector("#nav-toggle");
const navMenu = document.querySelector("#nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
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
  displayFavorites(); // Display favorite movies when the page loads

  const searchBtn = document.querySelector("#search-button");
  const searchInput = document.querySelector("#search-input");

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

  const debouncedSearch = debounce(handleSearch, 300); // Debounce the handleSearch function

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

  // Display trending movies when the page loads
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
        "an error occurred while fetching the movies. Please try again later."
      );
    }); // Log any errors that occur

  // Add an event listener to the search input for Enter key press

  // Display upcoming movies when the page loads
  getUpcomingMovies("#upcoming-spinner") // Show the loading spinner while fetching movies
    .then((movies) => {
      hideLoadingSpinner("#upcoming-spinner"); // Hide the loading spinner once movies are fetched
      displayUpcomingMovies(movies.slice(0, 10)); // Display the first 10 upcoming movies
      setupCarouselButtons(
        "#upcoming-movies",
        "#upcoming-prev-btn",
        "#upcoming-next-btn"
      );
    })
    .catch((error) => {
      hideLoadingSpinner("#upcoming-spinner"); // Hide the loading spinner if an error occurs
      console.log("Error fetching upcoming movies: ", error);
      showErrorMessage("Failed to fetch upcoming movies.");
    });

  // Display top-rated movies when the page loads
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
    })
    .catch((error) => {
      hideLoadingSpinner("#top-rated-spinner"); // Hide the loading spinner if an error occurs
      console.log("Error fetching top-rated movies: ", error);
      showErrorMessage("Failed to fetch top-rated movies.");
    });

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
});
