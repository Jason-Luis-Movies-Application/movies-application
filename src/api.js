module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },
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
  }
};