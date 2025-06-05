

// Radom movies on the homepage
const apiKey = 'bf220b32'; // Replace with your valid OMDb API key
const searchQuery = 'movie'; // Broad search term
const randomPage = Math.floor(Math.random() * 100) + 1; // Random page between 1 and 100
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}&type=movie&page=${randomPage}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const movieContainer = document.getElementById('movie-container');
        if (data.Response === "False") {
            movieContainer.innerHTML = `<p>Error: ${data.Error}</p>`;
            return;
        }
        const movies = data.Search;
        if (!movies || movies.length === 0) {
            movieContainer.innerHTML = '<p>No movies found</p>';
            return;
        }
        // Display all movies (up to 10 from the random page)
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie');
            // const moviePoster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image';
            movieCard.innerHTML = `
                <img src="${moviePoster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <p>Type: ${movie.Type}</p>
            `;
            movieContainer.appendChild(movieCard);
        });
    })
    .catch(error => {
        console.error('Error fetching movie data:', error);
        document.getElementById('movie-container').innerHTML = '<p>Failed to load movies. Please try again later.</p>';
    });


// Movie Search
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResult = document.getElementById('searchResult');

    let availableMovies = [];

    fetch('./movies.json')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Shows the movies
        availableMovies = data;
      })
      .catch(error => {
        console.error('Error loading movies.json:', error);
      });



    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload
        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
            searchResult.textContent = "Please enter a movie name.";
            return;
        }

        // Search movie
        const foundMovie = availableMovies.find(movie => movie.name.toLowerCase() === query);

        if (foundMovie && foundMovie.available) {
            // Save movie name in localStorage and redirect
            localStorage.setItem('selectedMovie', query);
            window.location.href = 'watch_movie.html'; // The video page
        } else {
            // Movie not found
            searchResult.textContent = "Movie not available. Please request it!";
        }
    });
});
