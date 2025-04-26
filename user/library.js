const apiKey = 'bf220b32';


function searchMovie(){
    const query = document.getElementById('search-bar').value;
    if (query.length > 0) {
        fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') {
                    displayMovies(data.Search);
                } else {
                    document.getElementById('movie-list').innerHTML = 'No movies found';
                }
            })
            .catch(error => console.error('Error fetching data: ', error));
    }
}
function displayMovies(movies) {
    const movieListContainer = document.getElementById('movie-list');
    movieListContainer.innerHTML = ''; // Clear previous results

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x225'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick="addToWatchlist('${movie.Title}', ${movie.Year})">Add to Watchlist</button>
        `;
        movieListContainer.appendChild(movieCard);
    });
}



let watchlist = []; // Array to store movies in the watchlist

// Function to add a movie to the watchlist
function addToWatchlist(title, year) {
    const movieExists = watchlist.some(movie => movie.title === title && movie.year === year);
    
    if (movieExists) {
        alert('This movie is already in your watchlist!');
        return;  // Exit the function if movie is already in watchlist
    }
    const movie = { title, year, status: 'Watchlist' };
    
    watchlist.push(movie);
    updateWatchlistTable();
}



// Function to update the watchlist table
function updateWatchlistTable() {
    const watchlistTable = document.getElementById('watchlist-table');
    watchlistTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Status</th>
        </tr>
    `;

    watchlist.forEach(movie => {
        const row = watchlistTable.insertRow();
        row.insertCell(0).textContent = movie.title;
        row.insertCell(1).textContent = movie.year;
        const statusCell = row.insertCell(2);
        statusCell.textContent = movie.status;

        const updateButton = document.createElement('button');
        
        updateButton.textContent = 'Mark as Watched';
        updateButton.onclick = () => updateMovieStatus(movie.title);
        row.appendChild(updateButton);

    });
}



// Function to update the status of a movie
function updateMovieStatus(title) {
    const movie = watchlist.find(movie => movie.title === title);
    if (movie) {
        movie.status = 'Watched';
        updateWatchlistTable(); // Update the table after status change
    }
}



