const {getMovies,deleteMovie, editMovie} = require('./api.js');
function buildHTML () {
  getMovies().then((movies) => {
    $('#title').html('MOVIES');
    $("#movieDisplay").html("");
    movies.forEach(({title, rating, id}) => {
      $('#loading').remove();
      $('body').css('background-color', 'white');
      $('.container').css('visibility', 'visible');
      $('#movieDisplay').append(`<ul><li>ID: ${id}</li><li>Title: ${title}</li><li>Rating: ${rating}</li><button type="button" class="editButton" id="${id}Edit">Edit</button> / <button type="button" class="deleteButton" id="${id}Delete">Delete</button></ul>`);
    });
    editMovieButton();
    deleteMovieInfo();
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
}

function updateMovies() {
  buildHTML();
}
// EDIT MOVIE
// const editMovieInfo = function() {
//   $('.editButton').click(function () {
//     let idNum = parseInt($(this).attr("id"));
//     console.log(idNum);
//     editMovie(idNum);
//   });
// };

// DELETE MOVIE
  const deleteMovieInfo = function () {
    $('.deleteButton').click(function () {
      let idNum = parseInt($(this).attr("id"));
      console.log(idNum);
      deleteMovie(idNum);
    });
    setTimeout(updateMovies, 500);
  };

// ADD MOVIE
  let submitButton = document.querySelector('#submit');
  submitButton.addEventListener('click', addMovie);

  function addMovie(e) {
    e.preventDefault();
    let movie = document.getElementById('movieTitle').value;
    let rating = document.getElementById('movieRating').value;
    let data = {title: movie, rating: rating};
    fetch('/api/movies', {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    setTimeout(updateMovies, 500);
  }
  buildHTML();

// ADD EVENT LISTENER
const editMovieButton = function() {
  $('.editButton').click(function () {
    let idNum = parseInt($(this).attr("id"));
    const options = {
    method: 'GET',
        headers: {
      'Content-Type': 'application/json',
    }
  };
    fetch(`/api/movies/${idNum}`).then(data => data.json()).then((movie) => {
      console.log(movie);
    $('#modal').modal('show');
    $('.modal-title').text(`Your selected movie is: ` + `${movie.title}`);
      $('#body-title').text(`Movie:  ` + `${movie.title}`);
      $('#body-rating').text(`Rating:  ` + `${movie.rating}`);
    })
  });
};