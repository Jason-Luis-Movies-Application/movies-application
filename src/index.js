/**
 * require style imports
 */
const {getMovies} = require('./api.js');
getMovies().then((movies) => {
  $('#title').html('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $('#loading').remove();
    $('body').css('background-color','white');
    $('#userInput').css('visibility','visible');
    $('#movieDisplay').append(`<ul><li>Title: ${title}</li><li>Rating: ${rating}</li><li>ID#${id}</li>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

let submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', addMovie);

function addMovie(e) {
  e.preventDefault();
  let movie = document.getElementById('movieTitle').value;
  let rating = document.getElementById('movieRating').value;
  let data = {
    title: movie,
    rating: rating
  };
  document.getElementById('movieTitle').value = '';
  document.getElementById('movieRating').value = '';
  fetch('/api/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
      .then((data) => {
        console.log('Request success: ', data);
      })
      .catch((error) => {
        console.log('Request failure: ', error);
      });
}