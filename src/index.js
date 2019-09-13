const {getMovies,deleteMovie, editMovie} = require('./api.js');
function buildHTML () {
  setTimeout(function () {
    getMovies().then((movies) => {
      $('#title').html('MOVIES');
      $("#movieDisplay").html("");
      movies.forEach(({title, rating, genre, id}) => {
        $('#loading').remove();
        $('body').css('background-image', "url('./red-city.jpg')");
        $('.container').css('visibility', 'visible');
        $('#movieDisplay').append(`<ul><li>ID: ${id}</li><li>Title: ${title}</li><li>Rating: ${rating}</li><li>Genre: ${genre}</li><button type="button" class="editButton" id="${id}Edit">Edit</button> / <button type="button" class="deleteButton" id="${id}Delete">Delete</button></ul>`);
      });
      editMovieButton();
      deleteMovieInfo();
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    });
  },4000);
}

function updateMovies() {
  buildHTML();
}


// ====================== ADD MOVIE FUNCTIONALITY =========================
  let submitButton = document.querySelector('#submit');
  submitButton.addEventListener('click', addMovie);

  function addMovie(e) {
    e.preventDefault();
    let movie = document.getElementById('movieTitle').value;
    let rating = document.getElementById('movieRating').value;
    let genre = document.getElementById('movieGenre').value;

    let data = {title: movie, rating: rating, genre: genre};
    fetch('/api/movies', {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    setTimeout(updateMovies, 500);
  }
  buildHTML();

// ======================= DELETE MOVIE FUNCTIONALITY ==============================
  const deleteMovieInfo = function () {
    $('.deleteButton').click(function () {
      let idNum = parseInt($(this).attr("id"));
      console.log(idNum);
      deleteMovie(idNum);
    });
    setTimeout(updateMovies, 500);
  };

// =========================== EDIT FUNCTIONALITY ================================
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
    $('.modal-title').css('color', 'black').text(`Your selected movie is: ` + `${movie.title}`);
      $('#body-title').css('color', 'black').val(`${movie.title}`);
      $('#body-rating').css('color', 'black').val(`${movie.rating}`);
      $('#body-genre').css('color', 'black').val(`${movie.genre}`);
      $("#save").click(function(){
        let idNum = movie.id;
        let title = document.getElementById('body-title').value;
        let rating = document.getElementById('body-rating').value;
        let genre = document.getElementById('body-genre').value;
        editMovie(idNum, title, rating, genre);
        $('#modal').modal('hide');
      });
    });
  });
};
