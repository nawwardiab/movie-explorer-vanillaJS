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
|
|–– index.html <!-- # Main html file -->
|–– style.css <!-- # Main Css file for styling -->
|–– js/ <!-- # JavaScript folder -->
| |–– app.js <!-- # Main app logic and initialization -->
| |–– api.js <!-- # API-related logic (fetching movies from TMDB) -->
| |–– ui.js <!-- # UI-related logic (rendering movie cards, managing DOM) -->
| |–– storage.js <!-- # Local storage handling (for favorites) -->
|\_\_ README.md <!-- # for project description -->

---

### JS

1. app.js:

   - DOMContentLoaded event
   - click event for search-button

2. api.js:

   - f searchMovies(query)
   - f getMovieDetails(movieId)

3. ui.js:

   - f displayMovies(movies)
   - f displayMovieDetails(movie)
   - f displayFavorites()
   - f showErrorMessage()
   - f clearMovieContainer()
   - f showLoadingSpinner()
   - f hideLoadingSpinner()

4. storage.js:
   - f searchFavorite(movie)
   - f removeFavorite(movieId)
   - f isFavorite(movieId)
   - f loadFavorites()

---

### things to solve:

- header
- footer
- add toggle theme

---

### things to improve:

- UI all components
- UI: trending movies carousel, also movie should be clickable.
- search genre, cast
- maybe add tags on top (like jay's)

---

Missing Features from Assignment:
Upcoming and Top-Rated Movies:

You currently only have trending movies, but the assignment also requires displaying upcoming and top-rated movies.
You can use additional API calls to fetch upcoming and top-rated movies. This requires:
Adding sections in the HTML.
Writing functions to get the data from the API.
Displaying these movie lists similarly to the trending section.
Improved User Experience:

Some elements are functional but could benefit from UX improvements. For instance, your modal works for displaying movie details, but adding more dynamic elements like trailers, movie recommendations, or cast information could enhance the experience.
Suggested Improvements and Enhancements:

1. Add Upcoming and Top-Rated Movies Sections
   To implement this, you can:

Update HTML to add sections for Upcoming and Top-Rated Movies.

Add JavaScript functions to api.js to fetch upcoming and top-rated movies:

Modify app.js to display the fetched movies:

2. Improve User Experience
   Movie Details Modal: Enhance the information displayed in the movie details modal.
   Include the cast information.
   Show a trailer video link (if available).
   Provide recommendations based on the selected movie.

Trailer Links: You can use the videos response to find trailers.

Recommendations: Show similar or recommended movies for each selected movie.

. UI Enhancements
Loading Indicator for Sections:

Add a loading indicator for each section (Trending, Upcoming, Top-Rated) to give better user feedback while waiting for data to load.
Favorite Button Indicator:

Change the favorite icon color to visually indicate favorite movies even in the carousels (Trending, Upcoming, Top-Rated).
Search Enhancements:

Include a debounce for the search input field, so you only trigger API calls when the user stops typing.
Responsive Design:

Ensure that the newly added sections (Upcoming and Top-Rated) are also responsive. You may need to tweak CSS for mobile and tablet views.
