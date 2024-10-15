import { getMovieDetails } from "./api.js";
import {
  isFavorite,
  saveFavorite,
  removeFavorite,
  loadFavorites,
} from "./storage.js";

// Function to display search results dynamically in the movies container
export function displayMovies(movies) {
  const moviesContainer = document.querySelector("#movies-container"); // Select the container to display movies
  moviesContainer.innerHTML = ""; // Clear any previous search results
  console.log(movies);

  // Loop through each movie in the results
  movies.forEach((movie) => {
    // Create a new div element for each movie card
    const movieCard = document.createElement("li");
    movieCard.classList.add("movie-card"); // Add a class for styling
    movieCard.dataset.id = movie.id; // Set the movie ID as a data attribute

    // Check if the movie is a favorited
    const isFavorited = isFavorite(movie.id);

    // Set the inner HTML for the movie card, including the poster, title, and release date
    movieCard.innerHTML = `
      <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"  
        alt="${movie.title}" 
      />
      <p>Rating: ${movie.vote_average}</p>

      <h3>${movie.title}</h3>  
      <span id='favorite-btn' class='remove-favorite'><i class="fa-solid fa-heart"></i></span>

    `;

    const favoriteBtn = movieCard.querySelector("#favorite-btn");
    if (isFavorited) {
      favoriteBtn.classList.add("favorited");
      favoriteBtn.style.color = "red";
    }

    // Prevent the Modal from opening when clicking on the favorite button
    favoriteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up to the movie card

      if (isFavorite(movie.id)) {
        removeFavorite(movie.id); // Remove the movie from favorites
        favoriteBtn.classList.remove("favorited"); // Remove the favorited class
        favoriteBtn.style.color = "none";
      } else {
        saveFavorite(movie); // Save the movie to favorites
        favoriteBtn.classList.add("favorited"); // Add the favorited class
        favoriteBtn.style.color = "red";
      }
      displayFavorites(); // Display the updated favorites
    });
    /*
    movieCard
      .querySelector("#favorite-btn")
      .addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up to the movie card

        if (isFavorite(movie.id)) {
          removeFavorite(movie.id); // Remove the movie from favorites
          movieCard
            .querySelector("#favorite-btn")
            .classList.remove("favorited"); // Remove the favorited class
          movieCard.querySelector("#favorite-btn").style.transform = "scale(1)"; // reset scale
        } else {
          saveFavorite(movie); // Save the movie to favorites
          movieCard.querySelector("#favorite-btn").classList.add("favorited"); // Add the favorited class
          document.querySelector(".favorited").style.fill = "red";
          movieCard.querySelector("#favorite-btn").style.transform =
            "scale(1.2)"; // Increase scale for animation
        }
      });
      
    movieCard.querySelector("#favorite-btn").addEventListener("click", () => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id); // Remove the movie from favorites
        movieCard.querySelector("#favorite-btn").classList.remove("favorited"); // Remove the favorited class
        movieCard.querySelector("#favorite-btn").style.transform = "scale(1)"; // reset scale
        } else {
        saveFavorite(movie); // Save the movie to favorites
        // loadFavorites();
        movieCard.querySelector("#favorite-btn").classList.add("favorited"); // Add the favorited class
        document.querySelector(".favorited").style.fill = "red";
        movieCard.querySelector("#favorite-btn").style.transform = "scale(1.2)"; // Increase scale for animation
        }
        });
        */

    movieCard.addEventListener("click", async () => {
      const movieDetails = await getMovieDetails(movie.id);
      console.log(movieDetails);
      displayMovieDetails(movieDetails); // Call the function to display movie details
    });
    moviesContainer.appendChild(movieCard); // Append each movie card to the container
  });
}

export function displayMovieDetails(movie) {
  const modal = document.querySelector("#movie-modal");
  const overlay = document.querySelector("#modal-overlay");
  modal.dataset.id = movie.id; // Set the movie ID as a data attribute

  // Get the cast, trailer, and recommendations from the movie object
  const cast = movie.credits?.cast.slice(0, 5) || []; // Show top 5 cast members
  const trailer = movie.videos?.results.find(
    (video) => video.type === "Trailer"
  );
  const recommendations = movie.recommendations?.results.slice(0, 3) || []; // Show top 3 recommendations

  // construct the cast list Html
  let castHtml = cast
    .map((member) => `<li>${member.name} as ${member.character}</li>`)
    .join("");

  // construct the recommendations list Html
  let recommendationsHtml = recommendations
    .map(
      (rec) => `
  <div class='recommendation-item'>
    <img src="https://image.tmdb.org/t/p/w500${rec.poster_path}" alt="${rec.title}" />
    <h4>${rec.title}</h4>
    <p>Rating: ${rec.vote_average}</p>
  </div>`
    )
    .join("");

  // Check if the movie is a favorited
  // const isFavorited = isFavorite(movie.id);

  modal.innerHTML = `
  <span id="close-modal"><i class="fa-solid fa-xmark"></i></span>
  <h2>${movie.title}</h2>
  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  }" />
  <p>Rating: ${movie.vote_average}</p>
  <p>Release Date: ${movie.release_date}</p>
  <span id='favorite-btn' class="remove-favorite"><i class="fa-solid fa-heart"></i></span>
  <p>Description: ${movie.overview}</p>

  ${
    trailer
      ? `<a href="https://www.youtube.com/watch?v=${trailer.key}" target="_blank" class='trailer-link'>Watch Trailer</a>`
      : ""
  }

  <h3>Cast</h3>
  <ul class='cast-list'>${castHtml}</ul>

  <h3>Recommendations</h3>
  <div class='recommendations'>${recommendationsHtml}</div>
  `;

  // Check if the movie is a favorited and update the heart icon color
  const favoriteBtn = modal.querySelector("#favorite-btn");
  if (isFavorite(movie.id)) {
    favoriteBtn.classList.add("favorited"); // Add the favorited class
    favoriteBtn.style.color = "red"; // Set the color of the favorite button to red
  }

  modal.classList.add("show"); // add the show class to trigger the animation
  overlay.classList.add("show"); // add the show class to display the overlay
  // Close the modal when the close button is clicked

  const closeModal = document.querySelector("#close-modal");
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show"); // remove the show class to hide the
    overlay.classList.remove("show"); // remove the show class to hide the overlay
  });
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      modal.classList.remove("show"); // remove the show class to hide the
      overlay.classList.remove("show"); // remove the show class to hide the overlay
    }
  });

  // Add Event Listener to the favorite button on Modal
  favoriteBtn.addEventListener("click", () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id); // Remove the movie from favorites
      favoriteBtn.classList.remove("favorited"); // Remove the favorited class
      favoriteBtn.style.color = "none"; // Set the color of the favorite button to none
    } else {
      saveFavorite(movie); // Save the movie to favorites
      favoriteBtn.classList.add("favorited"); // Add the favorited class
      favoriteBtn.style.color = "red"; // Set the color of the favorite button to red
    }
    displayFavorites(); // Display the updated favorites
  });
}

export function closeMovieDetails() {
  const modal = document.querySelector("#movie-modal");
  const overlay = document.querySelector("#modal-overlay");
  modal.classList.remove("show"); // remove the show class to hide the modal
  overlay.classList.remove("show"); // remove the show class to hide the overlay
}

export function displayFavorites() {
  const favorites = loadFavorites(); // Load the favorites from local storage
  const favoritesContainer = document.querySelector("#favorites-list"); // Select the container to display favorites
  favoritesContainer.innerHTML = ""; // Clear any previous favorites

  // Loop through each favorited movie
  favorites.forEach((movie) => {
    const isFavorited = isFavorite(movie.id);
    // Create a new div element for each favorite
    const favoriteCard = document.createElement("li");
    favoriteCard.classList.add("movie-card"); // Add a class for styling;
    favoriteCard.innerHTML = `
      <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        alt="${movie.title}"
      />
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>

      <span id='favorite-btn' class="remove-favorite"><i class="fa-solid fa-heart"></i></span>
    `;
    const favoriteBtn = favoriteCard.querySelector("#favorite-btn");
    favoriteBtn.style.color = "red"; // Set the color of the favorite button to red

    // if (isFavorited) {
    //   favoriteBtn.style.color = "red";
    // } else {
    //   favoriteBtn.style.color = "none";
    // }
    // Prevent the Modal from opening when clicking on the favorite button
    favoriteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up to the movie card

      if (isFavorite(movie.id)) {
        removeFavorite(movie.id); // Remove the movie from favorites
        favoriteBtn.style.color = "none";
        displayFavorites(); // Display the updated favorites
      } else {
        saveFavorite(movie); // Save the movie to favorites
        favoriteBtn.style.color = "red";
        displayFavorites(); // Display the updated favorites
      }
    });
    // Add an event listener to remove the favorite
    favoriteCard.addEventListener("click", async () => {
      const movieDetails = await getMovieDetails(movie.id);
      console.log(movieDetails);
      displayMovieDetails(movieDetails); // Call the function to display movie details
    });
    favoritesContainer.appendChild(favoriteCard); // Append each movie card to the container
  });
}

export function clearMovieContainer() {
  const moviesContainer = document.querySelector("#movies-container");
  moviesContainer.innerHTML = ""; // Clear the movies container
}

export function showErrorMessage(message) {
  const moviesContainer = document.querySelector("#movies-container");

  // Display the error message in the movies container
  moviesContainer.innerHTML = `
  <div class='error-message'>
    <p>${message}</p>
  </div>`;
}

// Function to show the loading spinner
export function showLoadingSpinner(spinnerSelector) {
  const spinner = document.querySelector(spinnerSelector);
  if (spinner) spinner.style.display = "block"; // Display the loading spinner
}

// Function to hide the loading spinner
export function hideLoadingSpinner(spinnerSelector) {
  const spinner = document.querySelector(spinnerSelector);
  if (spinner) spinner.style.display = "none"; // Hide the loading spinner
}

export function displayTrendingMovies(movies) {
  const trendingContainer = document.querySelector("#trending-movies"); // select the container to display trending movies
  trendingContainer.innerHTML = ""; // Clear any previous trending movies

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("carousel-item"); // Add a class for styling

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
      <span id='favorite-btn' class='remove-favorite'><i class="fa-solid fa-heart"></i></span>
    `;

    const favoriteBtn = movieCard.querySelector("#favorite-btn");

    if (isFavorite(movie.id)) {
      favoriteBtn.classList.add("favorited");
      favoriteBtn.style.color = "red";
    }

    // add event listener to the favorite button
    favoriteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up to the movie card

      if (isFavorite(movie.id)) {
        removeFavorite(movie.id); // Remove the movie from favorites
        favoriteBtn.classList.remove("favorited"); // Remove the favorited class
        favoriteBtn.style.color = "none";
      } else {
        saveFavorite(movie); // Save the movie to favorites
        favoriteBtn.classList.add("favorited"); // Add the favorited class
        favoriteBtn.style.color = "red";
      }
      displayFavorites(); // Display the updated favorites
    });

    // Add Event Listener for click to open the movie details Modal

    movieCard.addEventListener("click", async () => {
      try {
        const movieDetails = await getMovieDetails(movie.id);
        displayMovieDetails(movieDetails); // Function to display movie details in the modal
      } catch (error) {
        console.log("Error fetching movie details: ", error);
      }
    });
    trendingContainer.appendChild(movieCard); // Append each movie card to the container
  });

  // Add initial styles for carousel movement
  const items = trendingContainer.querySelectorAll(".carousel-item");
  let currentIndex = 0;

  const scrollAmount = 220; // Adjust to match item width and margin

  // Function to update the carousel
  const updateCarousel = () => {
    items.forEach((item, index) => {
      item.style.display = index === currentIndex ? "block" : "none";
    });
  };

  // updateCarousel();

  document.querySelector("#prev-btn").addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    trendingContainer.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
    // updateCarousel();
  });

  document.querySelector("#next-btn").addEventListener("click", () => {
    currentIndex = Math.min(items.length - 1, currentIndex + 1);
    trendingContainer.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    // updateCarousel();
  });
}

// Function to display upcoming movies
export function displayUpcomingMovies(movies) {
  const upcomingContainer = document.querySelector("#upcoming-movies"); // Select the upcoming movies container
  upcomingContainer.innerHTML = ""; // Clear any previous movies

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("carousel-item"); // Add a class for styling

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
      <span id='favorite-btn' class='remove-favorite'><i class="fa-solid fa-heart"></i></span>
    `;

    const favoriteBtn = movieCard.querySelector("#favorite-btn");

    if (isFavorite(movie.id)) {
      favoriteBtn.classList.add("favorited");
      favoriteBtn.style.color = "red";
    }

    // add event listener to the favorite button
    favoriteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up to the movie card

      if (isFavorite(movie.id)) {
        removeFavorite(movie.id); // Remove the movie from favorites
        favoriteBtn.classList.remove("favorited"); // Remove the favorited class
        favoriteBtn.style.color = "none";
      } else {
        saveFavorite(movie); // Save the movie to favorites
        favoriteBtn.classList.add("favorited"); // Add the favorited class
        favoriteBtn.style.color = "red";
      }
      displayFavorites(); // Display the updated favorites
    });

    // Add Event Listener for click to open the movie details Modal
    movieCard.addEventListener("click", async () => {
      try {
        const movieDetails = await getMovieDetails(movie.id);
        displayMovieDetails(movieDetails); // Function to display movie details in the modal
      } catch (error) {
        console.log("Error fetching movie details: ", error);
      }
    });

    upcomingContainer.appendChild(movieCard); // Append each movie card to the container
  });
}

// Function to display top-rated movies
export function displayTopRatedMovies(movies) {
  const topRatedContainer = document.querySelector("#top-rated-movies"); // Select the top-rated movies container
  topRatedContainer.innerHTML = ""; // Clear any previous movies

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("carousel-item"); // Add a class for styling

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
      <span id='favorite-btn' class='remove-favorite'><i class="fa-solid fa-heart"></i></span>

    `;

    const favoriteBtn = movieCard.querySelector("#favorite-btn");

    if (isFavorite(movie.id)) {
      favoriteBtn.classList.add("favorited");
      favoriteBtn.style.color = "red";
    }

    // add event listener to the favorite button
    favoriteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up to the movie card

      if (isFavorite(movie.id)) {
        removeFavorite(movie.id); // Remove the movie from favorites
        favoriteBtn.classList.remove("favorited"); // Remove the favorited class
        favoriteBtn.style.color = "none";
      } else {
        saveFavorite(movie); // Save the movie to favorites
        favoriteBtn.classList.add("favorited"); // Add the favorited class
        favoriteBtn.style.color = "red";
      }
      displayFavorites(); // Display the updated favorites
    });

    // Add Event Listener for click to open the movie details Modal
    movieCard.addEventListener("click", async () => {
      try {
        const movieDetails = await getMovieDetails(movie.id);
        displayMovieDetails(movieDetails); // Function to display movie details in the modal
      } catch (error) {
        console.log("Error fetching movie details: ", error);
      }
    });

    topRatedContainer.appendChild(movieCard); // Append each movie card to the container
  });
}
