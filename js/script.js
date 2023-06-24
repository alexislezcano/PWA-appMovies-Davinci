const elementoBoton = document.getElementById('sendButton');
const input = document.querySelector("input");
const searchMovies = document.querySelector("button");
const movieContainer = document.getElementById("movie-container");
const notFound = document.querySelector(".not-found");

let watchlistMovies = JSON.parse(localStorage.getItem("data")) || [];

searchMovies.addEventListener("click", (e) => {
  e.preventDefault();
  notFound.innerHTML = "";
  
  if (input.value === "") 
  
  return; 
  
  movieContainer.innerHTML = "";
  
  const movieName = input.value;
  fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=fc1fef96`)
    .then((response) => response.json())
    .then((data) => {
      input.value = "";
      
      if (data.Response !== "False") {
        data.Search.forEach((movie) => {
          fetch(`https://www.omdbapi.com/?t=${movie.Title}&apikey=fc1fef96`)
            .then((res) => res.json())
            .then((movies) => {
              const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = movies;
              
              const movieElement = document.createElement("div");
              movieElement.classList.add("movie");
              
              movieElement.innerHTML = `
                <img width="100" src=${Poster} alt="img" />
                <div class="movie-details">
                  <h3>${Title} <span>🎥${imdbRating}</span></h3>
                  <p>
                    <span class="runtime">${Runtime}</span> 
                    <span class="genre">${Genre}</span> 
                    <span onclick="addToWatchlist('${imdbID}')" class="icon-watchlist">
                      <i class="bi bi-plus-circle-fill colori">Agregar a mi lista 🎬</i>
                    </span>
                  </p>
                  <p class="plot">${Plot}</p>
                </div>
              `;
              
              movieContainer.appendChild(movieElement);
            });
        });
      } else { 
        // Si el usuario no encuentra la película deseada.
        movieContainer.innerHTML = "";
        notFound.innerHTML = `
          <p>No se encontró lo que estás buscando. Por favor, intenta otra búsqueda.</p>
        `;
      }
    });
});

function addToWatchlist(imdbID) {
  const search = watchlistMovies.find((x) => x.imdbID === imdbID) || {};
  
  if (search.imdbID === imdbID) {
    alert("Ya agregaste a tu lista.");
  } else {
    watchlistMovies.push({
      imdbID: imdbID,
    });
  }
  
  localStorage.setItem("data", JSON.stringify(watchlistMovies));
}
