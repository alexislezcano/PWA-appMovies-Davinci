const selectedMovies = document.getElementById("selected-watchlist");
const emptyWatchlist = document.getElementById("empty-watchlist");

let watchlistMovies = JSON.parse(localStorage.getItem("data")) || [];

function renderMovie(movie) {
  fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=fc1fef96`)
    .then((response) => response.json())
    .then((data) => {
      const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = data;

      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      movieElement.innerHTML = `
        <img width="100" src=${Poster} alt="img" />
        <div class="movie-details">
          <h1>${Title} <span>${imdbRating}</span></h1>
          <p>
            <span class="runtime">${Runtime}</span> 
            <span class="genre">${Genre}</span> 
            <span onclick="removeWatchlist('${imdbID}')" class="icon-watchlist">
              <i class="bi bi-dash-circle-fill">Eliminar</i>
            </span>
          </p>
          <p class="plot">${Plot}</p>
        </div>
      `;

      selectedMovies.appendChild(movieElement);
    });
}

function render() {
  selectedMovies.innerHTML = "";

  if (watchlistMovies.length !== 0) {
    watchlistMovies.forEach((movie) => {
      renderMovie(movie);
    });
  } else {
    selectedMovies.innerHTML = "";
    emptyWatchlist.innerHTML = `
      <h2>Tu lista parece un poco vacía...</h2>
      <a href="index.html"><i class="bi bi-plus-circle-fill">¡Click aquí para añadir algunas películas!</i></a>
    `;
  }
}

function removeWatchlist(imdbID) {
  watchlistMovies = watchlistMovies.filter((x) => x.imdbID !== imdbID);
  localStorage.setItem("data", JSON.stringify(watchlistMovies));
  render();
}

render();