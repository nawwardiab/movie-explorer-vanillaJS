## Assignment's Description

**Movie Explorer**

- **API:** [The Movie Database API](https://www.themoviedb.org/documentation/api)
- **Features:**
  - Search and display movie details (poster, cast, release date, etc.).
  - Show trending, upcoming, and top-rated movies.
  - Allow users to mark movies as favorites and store this data using local storage.
  - Backend proxy to securely fetch movie data without exposing the API key.

---

## Project Structure

```
movie-explorer/
├── index.html <!-- # Main html file -->
├── style.css <!-- # Main Css file for styling -->
├── js/ <!-- # JavaScript folder -->
│   ├── app.js <!-- # Main app logic and initialization -->
│   ├── api.js <!-- # API-related logic (fetching movies from the backend) -->
│   ├── ui.js <!-- # UI-related logic (rendering movie cards, managing DOM) -->
│   ├── storage.js <!-- # Local storage handling (for favorites) -->
│
├── server/ ✅ (New backend folder)
│   ├── server.js ✅ (Backend logic to handle API requests)
│   ├── .env ✅ (Store API key here securely)
│   ├── package.json ✅ (Node.js dependencies)
│
├── project-structure.md
├── README.md <!-- # for project description -->
```

---

### Backend (Node.js + Express)

- `server.js`:
  - `/api/search` → Fetch movies based on user search
  - `/api/movie-details` → Fetch detailed movie information
  - `/api/trending` → Fetch trending movies
  - `/api/upcoming` → Fetch upcoming movies
  - `/api/top-rated` → Fetch top-rated movies

---

### JS

1. **app.js:**

   - f setUpThemeToggle()
   - f retryFavoritesMovies()
   - f retryTrendingMovies()
   - f retryUpcomingMovies()
   - f retryTopRatedMovies()
   - f setupCarouselButtons(containerSelector, prevBtnSelector, nextBtnSelector)
   - f debounce (func, delay)
   - f handleSearch()
   - f setUpSwipeGesture(container)
   - DOMContentLoaded event listener (navToggle eventListener, movieContainers eventListener, search eventListener, scrollToTop eventListener)

2. **api.js:** (Now fetching from the backend instead of TMDB directly)

   - f searchMovies(query)
   - f getMovieDetails(movieId)
   - f getTrendingMovies()
   - f getUpcomingMovies()
   - f getTopRatedMovies()

3. **ui.js:**

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

4. **storage.js:**
   - f searchFavorite(movie)
   - f removeFavorite(movieId)
   - f isFavorite(movieId)
   - f loadFavorites()

---

### **Security Improvements**

✅ API key is no longer exposed in the frontend.
✅ All API requests go through a backend proxy.
✅ `.env` file is used to store sensitive credentials.
✅ Backend is ready for deployment (Render, Vercel, or Railway).

---

This update ensures that API security is maintained while improving the project structure for better scalability and maintainability.
