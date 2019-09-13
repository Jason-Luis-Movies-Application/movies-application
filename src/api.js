module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },
  // DELETE MOVIE

  deleteMovie: (id) => {
    const movie = {id: id};
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    };
    return fetch(`/api/movies/${id}`, options)
  },
  // EDIT MOVIE

  editMovie: (id, title, rating) => {
    const movie = {
      title: title,
      rating: rating,
    };
    const url = `/api/movies/${id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie)
    };
    return fetch(`/api/movies/${id}`, options)
  }
};