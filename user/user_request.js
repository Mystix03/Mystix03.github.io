document.addEventListener("DOMContentLoaded", function() {
    // Dynamic year dropdown
    const yearSel = document.getElementById('rel_year');
    for (let y = 1900; y <= new Date().getFullYear(); y++) {
        yearSel.innerHTML += `<option value="${y}">${y}</option>`;
    }

    // Movie request form handling
    const form = document.querySelector('form');
    const requestedMoviesBody = document.getElementById('requestedMoviesBody');

    // Load existing requested movies from localStorage
    let movieRequests = JSON.parse(localStorage.getItem('movieRequests')) || [];

    function displayMovies() {
        requestedMoviesBody.innerHTML = "";
        movieRequests.forEach(function(movie) {
            const newRow = `
                <tr>
                    <td>${movie.movieName}</td>
                    <td>${movie.releaseYear}</td>
                    <td>${movie.status}</td>
                </tr>`;
            requestedMoviesBody.innerHTML += newRow;
        });
    }

    displayMovies(); // Show existing requests

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload

        const movieName = document.getElementById('mov_name').value.trim();
        const releaseYear = document.getElementById('rel_year').value;

        if (movieName === "") {
            alert("Enter movie name");
            return;
        }

        // Create new movie object
        const newMovie = {
            movieName: movieName,
            releaseYear: releaseYear,
            status: "Pending"
        };

        // Add to array and localStorage
        movieRequests.push(newMovie);
        localStorage.setItem('movieRequests', JSON.stringify(movieRequests));

        // Update table
        displayMovies();

        // Clear input field
        document.getElementById('mov_name').value = "";
    });
});
