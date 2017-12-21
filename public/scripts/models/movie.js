'use strict';

var app =  app || {};

var __API_URL__ = 'http://localhost:3000';

(function(module) {

  function errorCallback(err) {
    console.error(err);
    app.errorView.initErrorPage(err);
  }

  // constructor function to create movie objects
  function Movie(movieObj) {

    Object.keys(movieObj).forEach(key => this[key] = movieObj[key]);
  }

  // prototype method to display movie list to html via handlebars template
  Movie.prototype.toHtml = function() {

    let template = Handlebars.compile($('#dashboard-template').text());
    return template(this);
  }

  // placeholder to store movie objects
  Movie.all = [];

  // function to sort movies by title and run through constructor function
  Movie.loadAll = rows => {
    // rows.sort((a,b) => b.title - a.title);
    Movie.all = rows.map(movieObj => new Movie(movieObj));
    Movie.all.map(movie => {
      $('#movie-suggestions').append(movie.toHtml());
    })

    $('.add-button').on('click', function() {
      console.log('clicked');
      console.log($(this).parent().parent().data('movieid'));
      Movie.addToDB($(this).parent().parent().data('movieid'))
    });
  }

  Movie.loadWatchList = rows => {
    Movie.all = rows.map(movieObj => new Movie(movieObj));
  }


  // function to get movies from API based on genre, to be displayed on dashboard
  // remember to change fn call so that it takes the ctx from form.
  Movie.findGenre = genre => {
    console.log('genre', genre);
    $.get(`/api/v1/chillfellows/search/${genre}`)
      .then(datafromsearch => Movie.loadAll(datafromsearch))


      // .then(app.Movie.all.map(movie => $('#movie-suggestions').append(movie.toHtml)))
      // .then(console.log('movie.all', app.Movie.all))

      .catch(errorCallback)
  }
// Movie.testOne = movie_id => {
//   let movieToAdd = Movie.all.filter(movie => movie.id === movie_id);
//   movieToAdd[0].user_id = JSON.parse(localStorage.user_id);
//   return movieToAdd;
// }
  // function to add movies to database
  Movie.addToDB = movie_id => {
    let movieToAdd = Movie.all.filter(movie => movie.id === movie_id);
    movieToAdd[0].user_id = JSON.parse(localStorage.user_id);

    console.log('movie to add', movieToAdd[0]);

    $.post(`${__API_URL__}/api/v1/chillfellows/newmovie/`, movieToAdd[0])
      .then(console.log)
      .catch(errorCallback);
  }

  Movie.getWatchList = movie => {
    $.get(`${__API_URL__}/api/v1/chillfellows`, movie)
      .then(dataFromWatchlist => Movie.loadWatchList(dataFromWatchlist))
      .catch (errorCallback);
  }

// deletes movie from watchlist
  Movie.delete = id => {
    $.ajax({
      url: `${__API_URL__}/api/v1/chillfellow/deletemovie/${id}`,
      method: 'DELETE'
    })
      .then(console.log)
      .catch(errorCallback);
  }



// // gets movie info from api to add to user's watchlist table
//   Movie.addOne = movie => {
//     $.get(`${__API_URL__}/api/v1/chillfellows/search/${movie.id}`) //needs to be a put
//       .then(Movie.addToDB)
//       .catch(errorCallback);
//   }




  // Movie.find = movie => {
  //   $.get(`${__API_URL__}/api/v1/chillfellows/search`, movie)
  //     .then(Movie.loadAll)
  //     .catch(errorCallback);
  // }
  module.Movie = Movie;

}) (app);
