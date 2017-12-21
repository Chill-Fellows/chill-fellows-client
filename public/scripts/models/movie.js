'use strict';

var app =  app || {};

// var __API_URL__ = 'http://localhost:3000';
var __API_URL__ = 'https://chill-fellows.herokuapp.com';

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

  Movie.prototype.toWatchlist = function() {
    let template = Handlebars.compile($('#watchlist-template').text());
    return template(this);
  }
  // placeholder to store movie objects
  Movie.all = [];

  // function to sort movies by title and run through constructor function
  Movie.loadAll = rows => {

    Movie.all = rows.map(movieObj => new Movie(movieObj));
    Movie.all.map(movie => {
      $('#movie-suggestions').append(movie.toHtml());
    })

    $('.add-button').on('click', function() {
      Movie.addToDB($(this).parent().parent().data('movieid'))
    });
  }

  Movie.loadWatchList = rows => {
    console.log('result inside of loadwatchlist', rows);
    Movie.all = rows.map(movieObj => new Movie(movieObj));
    Movie.all.map(movie => {
      $('#movie-list').append(movie.toWatchlist());
    });

    $('#delete-button').on('click', function(event) {
      event.preventDefault();
      app.Movie.delete($(this).data('id'));
      // $(this).data('id').hide();
    });
  }


  // function to get movies from API based on genre, to be displayed on dashboard
  // remember to change fn call so that it takes the ctx from form.
  Movie.findGenre = genre => {
    console.log('genre', genre);
    $.get(`/api/v1/chillfellows/search/${genre}`)
      .then(datafromsearch => Movie.loadAll(datafromsearch))
      .catch(errorCallback)
  }

  // function to add movies to database
  Movie.addToDB = movie_id => {
    let movieToAdd = Movie.all.filter(movie => movie.id === movie_id);
    movieToAdd[0].user_id = JSON.parse(localStorage.user_id);
    //get the watchlist to see if the movie is there before adding
    let currentUser = JSON.parse(localStorage.username);
    $.get(`${__API_URL__}/api/v1/chillfellows/getwatchlistbymovieid/${currentUser}`)
      .then(databyid => {
        let testArray = databyid.filter(movie => movie.movie_id == movieToAdd[0].id);
        if (testArray.length === 0) {
        $.post(`${__API_URL__}/api/v1/chillfellows/newmovie/`, movieToAdd[0]);
        }
      })
      .then(console.log)
      .catch(errorCallback);
  }

  Movie.getWatchList = () => {
    let currentUser = JSON.parse(localStorage.username);
    $.get(`${__API_URL__}/api/v1/chillfellows/getwatchlist/${currentUser}`)
      .then(dataFromWatchlist => {
        console.log('data from user watchlist search',dataFromWatchlist);

        Movie.loadWatchList(dataFromWatchlist)
      })
      .catch (errorCallback);
  }

// deletes movie from watchlist
  Movie.delete = id => {
    $.ajax({
      url: `${__API_URL__}/api/v1/chillfellow/deletemovie/${id}`,
      method: 'DELETE'
    })
      .then(result => {
        console.log(result);
        app.movieView.initWatchlistPage()
      })
      .catch(errorCallback);
  }




  module.Movie = Movie;

}) (app);
