/**
 * require style imports
 */

const {getMovies} = require('./api.js');
getMovies().then((movies) => {
  $('#title').html('MOVIES');
  movies.forEach(({title, rating, id}) => {
    $('#loading').remove();
    $('body').css('background-color','white');
    $('.container').css('visibility','visible');
    $('#movieDisplay').append(`<tr><td>${id}</td><td>${title}</td><td>${rating}</td><td><button class="button" id="edit${id}">Edit</button> / <button class="button" id="delete${id}">Delete</button></td></tr>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

function updateMovies() {
  const {getMovies} = require('./api.js');
  getMovies().then((movies) => {
    $('#title').html('MOVIES');
    movies.forEach(({title, rating, id}) => {
      $('#loading').remove();
      $('body').css('background-color', 'white');
      $('.container').css('visibility', 'visible');
      $('#movieDisplay').append(`<tr><td>${id}</td><td>${title}</td><td>${rating}</td><td><button class="button" id="${id}edit">Edit</button> / <button class="button" id="delete${id}">Delete</button></td></tr>`);
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
}

// ADD MOVIE
let submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', addMovie);
function addMovie(e) {
  e.preventDefault();
  let movie = document.getElementById('movieTitle').value;
  let rating = document.getElementById('movieRating').value;
  let data ={title: movie, rating: rating};
  fetch('/api/movies', {method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(data)})
setTimeout(updateMovies, 500);
}
// EDIT MOVIE
function editMovie() {

}

// LISTENERS
// function addListeners() {
//
// }
