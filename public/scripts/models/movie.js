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
    Objects.keys(movieObj).forEach(key => this[key] = movieObj[key]);
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
    rows.sort((a,b) => b.title - a.title);
    Movie.all = rows.map(movieObj => new Movie(movieObj));
  }

// function to get movies from API based on genre, to be displayed on dashboard
  Movie.findGenre = (movie, callback) => {
    $.get(`${__API_URL__}/api/v1/chillfellows/search/${genre}`, movie);
      .then(Movie.loadAll)
      .then(callback)
      .catch(errorCallback)
  }

// function to add movies to database
  Movie.addToDB = movie => {
    $.post(`${__API_URL__}/api/v1/chillfellows`, movie)
      .then(console.log)
      // .then(() => page('/'))
      .catch(errorCallback);
  }

}) (app);

//api/v1/chillfellows/search/:id
