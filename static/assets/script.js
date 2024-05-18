const apikey='b17104b361e84fd187be40fcef837714';
const apiEndpoint='https://api.themoviedb.org/3';
const imgPath='https://image.tmdb.org/t/p/original';

const apiPaths = {
    fetchAiringToday : `${apiEndpoint}/tv/airing_today?api_key=${apikey}`,
    fetchPopular : `${apiEndpoint}/tv/popular?api_key=${apikey}`,
    fetchTopRated : `${apiEndpoint}/tv/top_rated?api_key=${apikey}`,
    fetchOnTheAir : `${apiEndpoint}/tv/on_the_air?api_key=${apikey}`,
    fetchTrendingTV : `${apiEndpoint}/trending/tv/day?api_key=${apikey}`,
    fetchTVList: (id) => `${apiEndpoint}/discover/tv?api_key=${apikey}&with_genres=${id}`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyCvShuy32i10ryS5tbRQ8lkSEgvwGmHGpg`,    
}

// boots up the app
function init(){ 
    fetchTrendingTVShows();
    fetchAiringTodayTVShows();
    fetchTopRatedTVShows();
    fetchOnTheAirTVShows();
    fetchPopularInTVShows();
    fetchAndBuildAllSections();
}

function fetchTrendingTVShows(){
    fetchAndbuildMovieSection(apiPaths.fetchTrendingTV, 'Trending In TV Shows') 
    .then(list => {//promise chaining
        const randomIndex = parseInt(Math.random() * list.length);
        buildBannerSection(list[randomIndex]);
    }).catch(err =>{
        console.error(err);
    });
}

function fetchAiringTodayTVShows(){
    fetchAndbuildMovieSection(apiPaths.fetchAiringToday, 'Airing Today') 
    .catch(err =>{
        console.error(err);
    });
}

function fetchTopRatedTVShows(){
    fetchAndbuildMovieSection(apiPaths.fetchTopRated, 'Top Rated') 
    .catch(err =>{
        console.error(err);
    });
}

function fetchOnTheAirTVShows(){
    fetchAndbuildMovieSection(apiPaths.fetchOnTheAir, 'On The Air') 
    .catch(err =>{
        console.error(err);
    });
}

function fetchPopularInTVShows(){
    fetchAndbuildMovieSection(apiPaths.fetchPopular, 'Popular') 
    .catch(err =>{
        console.error(err);
    });
}

function buildBannerSection(movie){
    const bannerCont = document.getElementById('banner-section');
    bannerCont.style.backgroundImage = `url('${imgPath}${movie.backdrop_path}')`;

    const div = document.createElement('div');
    div.innerHTML = `
        <h2 class="banner-title">${movie.
            original_name
            }</h2>
        <p class="banner-info">Trending in TV Shows | Released - ${movie.
            first_air_date}</p>
        <p class="banner-overview">${movie.overview && movie.overview.length > 100 ? movie.overview.slice(0,200).trim()+ '...':movie.overview}</p>
        <div class="action-buttons-cont">
            <a href="/video/">
                <button class="action-button" style="cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 48 48" id="play"><path d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"></path></svg>&nbsp;&nbsp;
                    <p>Play</p>
                </button>
            </a>
        </div>
    
    `;
    div.className = "banner-content container";
    bannerCont.append(div);
}

function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res => res.json())
    .then(res => {
        const categories = res.genres;
        if (Array.isArray(categories) && categories.length){
            categories.forEach(category => fetchAndbuildMovieSection(
                apiPaths.fetchMoviesList(category.id),category.name));
        } 
        // console.table(categories);
    })
    .catch(err => console.error(err));
}

function fetchAndbuildMovieSection(fetchUrl, categoryName){
    // console.log(fetchUrl, categoryName);
    return fetch(fetchUrl)
    .then(res => res.json())
    .then(res => { 
        console.table(res.results);
        const movies=res.results;
        if(Array.isArray(movies) && movies.length){
             buildMoviesSection(movies, categoryName);
        }
        return movies;
    })
    .catch(err => console.error(err))
}

function buildMoviesSection(list, categoryName){
    // console.log(list, categoryName);

    const moviesCont= document.getElementById('movies-cont');

    const moviesListHTML = list.map(item => {
        return `
        <div class="movie-item">
            <a href="/video">
                <img class="movie-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.original_name}">;
            </a>
        </div>
        `
    }).join('');
    // console.log(moviesListHTML);

    const moviesSectionHTML=`
        <h2 class="movie-section-heading">${categoryName}</h2>
        <div class='movies-row'>
            ${moviesListHTML}
        </div>`
    // console.log(moviesSectionHTML);

    const div = document.createElement('div');
    div.className = 'movies-section';
    div.innerHTML=moviesSectionHTML;

    // append html into movie container
    moviesCont.append(div);
}

// https://www.youtube.com/watch?v=m22pgDoTy_0






window.addEventListener('load',function(){
    init();
    window.addEventListener('scroll', function(){
        // header ui update
        const header = document.getElementById('header');
        if (this.window.scrollY > 5) header.style.backgroundColor='black'
        else header.style.backgroundColor='transparent';
    })
})
