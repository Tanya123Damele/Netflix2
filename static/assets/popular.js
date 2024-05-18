const apikey = "b17104b361e84fd187be40fcef837714";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPaths = {
  fetchPopularInMovie: `${apiEndpoint}/movie/popular?api_key=${apikey}`,
  fetchPopularInTV: `${apiEndpoint}/tv/popular?api_key=${apikey}`,
  fetchUpcomingMovie: `${apiEndpoint}/movie/upcoming?api_key=${apikey}`,
  fetchUpcomingTV: `${apiEndpoint}/tv/on_the_air?api_key=${apikey}`,
  fetchTVList: (id) =>
    `${apiEndpoint}/discover/tv?api_key=${apikey}&with_genres=${id}`,
};

// boots up the app
function init() {
  fetchPopularMovies();
  fetchPopularTV();
  fetchMovieUpcoming();
  fetchTVUpcoming();
  fetchAndBuildAllSections();
}

function fetchPopularMovies() {
  fetchAndbuildMovieSection(
    apiPaths.fetchPopularInMovie,
    "Popular In Movies"
  ).catch((err) => {
    console.error(err);
  });
}

function fetchPopularTV() {
  fetchAndbuildTVSection(
    apiPaths.fetchPopularInTV,
    "Popular In TV Shows"
  ).catch((err) => {
    console.error(err);
  });
}

function fetchMovieUpcoming() {
  fetchAndbuildMovieSection(
    apiPaths.fetchUpcomingMovie,
    "Upcoming Movies"
  ).catch((err) => {
    console.error(err);
  });
}

function fetchTVUpcoming() {
  fetchAndbuildTVSection(apiPaths.fetchUpcomingTV, "Upcoming TV Shows").catch(
    (err) => {
      console.error(err);
    }
  );
}

function fetchAndbuildMovieSection(fetchUrl, categoryName) {
  // console.log(fetchUrl, categoryName);
  return fetch(fetchUrl)
    .then((res) => res.json())
    .then((res) => {
      console.table(res.results);
      const movies = res.results;
      if (Array.isArray(movies) && movies.length) {
        buildMoviesSection(movies, categoryName);
      }
      return movies;
    })
    .catch((err) => console.error(err));
}

function fetchAndbuildTVSection(fetchUrl, categoryName) {
  // console.log(fetchUrl, categoryName);
  return fetch(fetchUrl)
    .then((res) => res.json())
    .then((res) => {
      console.table(res.results);
      const movies = res.results;
      if (Array.isArray(movies) && movies.length) {
        buildTVSection(movies, categoryName);
      }
      return movies;
    })
    .catch((err) => console.error(err));
}

function buildMoviesSection(list, categoryName) {
  list, categoryName;

  const moviesCont = document.getElementById("movies-cont");

  const moviesListHTML = list
    .map((item) => {
      return `
        <div class="movie-item">
            <a href="/video">
                <img class="movie-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}">;
            </a>
        </div>
        `;
    })
    .join("");
  // console.log(moviesListHTML);

  const moviesSectionHTML = `
        <h2 class="movie-section-heading">${categoryName}</h2>
        <div class='movies-row'>
            ${moviesListHTML}
        </div>`;
  // console.log(moviesSectionHTML);

  const div = document.createElement("div");
  div.className = "movies-section";
  div.innerHTML = moviesSectionHTML;

  // append html into movie container
  moviesCont.append(div);
}

function buildTVSection(list, categoryName) {
  // console.log(list, categoryName);

  const moviesCont = document.getElementById("movies-cont");

  const moviesListHTML = list
    .map((item) => {
      return `
        <div class="movie-item">
            <a href="/video">
                <img class="movie-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.original_name}" >;
            </a>
        </div>
        `;
    })
    .join("");
  // console.log(moviesListHTML);

  const moviesSectionHTML = `
        <h2 class="movie-section-heading">${categoryName}</h2>
        <div class='movies-row'>
            ${moviesListHTML}
        </div>`;
  // console.log(moviesSectionHTML);

  const div = document.createElement("div");
  div.className = "movies-section";
  div.innerHTML = moviesSectionHTML;

  // append html into movie container
  moviesCont.append(div);
}

window.addEventListener("load", function () {
  init();
  // header ui update
  const header = document.getElementById("header");
  header.style.backgroundColor = "black";
});
