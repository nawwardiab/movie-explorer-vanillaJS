## Assignment's Description

**Movie Explorer**

- **API:** [The Movie Database API](https://www.themoviedb.org/documentation/api)
- **Features:**
  - Search and display movie details (poster, cast, release date, etc.).
  - Show trending, upcoming, and top-rated movies.
  - Allow users to mark movies as favorites and store this data using local storage.

---

## Project Structure

movie-explorer/
├── index.html <!-- # Main html file -->
├── style.css <!-- # Main Css file for styling -->
├── js/ <!-- # JavaScript folder -->
| ├── app.js <!-- # Main app logic and initialization -->
| ├── api.js <!-- # API-related logic (fetching movies from TMDB) -->
| ├── ui.js <!-- # UI-related logic (rendering movie cards, managing DOM) -->
| ├── storage.js <!-- # Local storage handling (for favorites) -->
| ├── config.js <!-- # my API key for fetching from TMDB -->
|
├── project-structure.md
├── README.md <!-- # for project description -->

---

### JS

1. app.js:

   - f setUpThemToggle()
   - f retryFavoritesMovies()
   - f retryTrendingMovies()
   - f retryUpcomingMovies()
   - f retryTopRatedMovies()
   - f setupCarouselButtons(containerSelector, prevBtnSelector, nextBtnSelector)
   - f debounce (func, delay)
   - f handleSearch()
   - f setUpSwipeGesture(container)
   - DOMContentLoaded event listener (navToggle eventListener, movieContainers eventListener, search eventListener, scrollToTop eventListener)

2. api.js:

   - f searchMovies(query)
   - f getMovieDetails(movieId)
   - f getTrendingMovies()
   - f getUpcomingMovies()
   - f getTopRatedMovies()

3. ui.js:

   - f displayMovies(movies)
   - f displayMovieDetails(movie)
   - f displayTrendingMovies(movies)
   - f displayUpcomingMovies(movies)
   - f displayTopRatedMovies(movies)
   - f displayFavorites()
   - f closeMovieDetails()
   - f clearMovieContainer()
   - f showErrorMessage()
   - f showLoadingSpinner()
   - f hideLoadingSpinner()

4. storage.js:

   - f searchFavorite(movie)
   - f removeFavorite(movieId)
   - f isFavorite(movieId)
   - f loadFavorites()

5. config.js:
   - apiKey

---
