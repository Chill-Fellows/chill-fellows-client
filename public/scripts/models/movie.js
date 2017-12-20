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
    console.log('this tohtml', this);
    console.log('template to html', template);
    return template(this);
  }

  // placeholder to store movie objects
  Movie.all = [];

  // function to sort movies by title and run through constructor function
  Movie.loadAll = rows => {
    // rows.sort((a,b) => b.title - a.title);
    Movie.all = rows.map(movieObj => new Movie(movieObj));
  }

  // function to get movies from API based on genre, to be displayed on dashboard
  // remember to change fn call so that it takes the ctx from form.
  Movie.findGenre = (genre) => {
    console.log('genre', genre);
    $.get(`/api/v1/chillfellows/search/${genre}`)
      .then(datafromsearch => Movie.loadAll(datafromsearch))
      .catch(errorCallback)
  }


  // function to add movies to database
  Movie.addToDB = movie => {
    $.post(`${__API_URL__}/api/v1/chillfellows`, movie)
      .then(console.log)
    // .then(() => page('/'))
      .catch(errorCallback);
  }
// deletes movie from watchlist
  Movie.delete = id => {
    $.ajax({
      url: `${__API_URL__}/api/v1/chillfellows/${id}`,
      method: 'DELETE'
    })
    // .then(() => page('/watchlist'))
      .catch(errorCallback);
  }



// gets movie info from api to add to user's watchlist table
  Movie.addOne = movie => {
    $.get(`${__API_URL__}/api/v1/chillfellows/search/${movie.id}`)
      .then(Movie.addToDB)
      .catch(errorCallback);
  }

// // adds movie to user's watchlist table
//   Movie.create = movie => {
//     $.post(`${__API_URL__}/api/v1/chillfellows`, movie)
//       .then(console.log)
//       // .then(() => page('/'))
//       .catch(errorCallback);
//   }


  // Movie.find = movie => {
  //   $.get(`${__API_URL__}/api/v1/chillfellows/search`, movie)
  //     .then(Movie.loadAll)
  //     .catch(errorCallback);
  // }
  module.Movie = Movie;

}) (app);

//api/v1/chillfellows/search/:id
