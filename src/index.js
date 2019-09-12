/**
 * require style imports
 */
const {getMovies} = require('./api.js');
getMovies().then((movies) => {
  $('#title').html('Here are all the movies:');
  // movies.forEach(({title, rating, id}) => {
  //   $('#movieDisplay').html(`id#${id} - ${title} - rating: ${rating}`);
  // });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
function buildMovieHTML (getMovies) {
  return `<ul><li>Title: ${title}</li><li>Rating: ${rating}</li><li>ID#${id}</li>`
}

const addHTMLToPage = getMovies => {
  for (let i = 0; i < getMovies.length; i += 1) {
      const movieItems = document.getElementsByClassName('movieDisplay')[i];
      movieItems.innerHTML = buildMovieHTML(movies[i]);
    }
};


