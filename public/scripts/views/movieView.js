'use strict'

var app = app || {};

(function(module) {

  const movieView = {};
  let mb_score;

  movieView.initIndexPage = function() {

    $('.container').hide();
    if (localStorage.username) $('.watchlist').show();
    if (!localStorage.username) {
      app.loginView.initLoginPage();
    }
  }

  movieView.initTestPage = function (user) {

    $('.container').hide();
    $('.personality').show();

    $('#personality').on('click', user, function(event) {
      event.preventDefault();

      let radioValue = '';

      radioValue += `${$('input[name= "ei"]:checked').val()}`;
      radioValue += `${$('input[name= "sn"]:checked').val()}`;
      radioValue += `${$('input[name= "tf"]:checked').val()}`;
      radioValue += `${$('input[name= "jp"]:checked').val()}`;

      if (radioValue === 'estj') mb_score = 36;
      if (radioValue === 'entj') mb_score = 10752;
      if (radioValue === 'esfj') mb_score = 99;
      if (radioValue === 'estp') mb_score = 37;
      if (radioValue === 'enfj') mb_score = 53;
      if (radioValue === 'entp') mb_score = 878;
      if (radioValue === 'esfp') mb_score = 80;
      if (radioValue === 'enfp') mb_score = 27;
      if (radioValue === 'infp') mb_score = 10749;
      if (radioValue === 'isfp') mb_score = 10402;
      if (radioValue === 'intp') mb_score = 9648;
      if (radioValue === 'infj') mb_score = 18;
      if (radioValue === 'intj') mb_score = 12;
      if (radioValue === 'isfj') mb_score = 14;
      if (radioValue === 'istp') mb_score = 28;
      if (radioValue === 'istj') mb_score = 35;
      if (radioValue.split('').length !== 4) {
        alert('you must answer all questions');
        movieView.initTestPage();
        return
      }

      user.mb_score = mb_score;
      app.User.update(user);

      movieView.initDashboardPage();
    });
  }

  movieView.initDashboardPage = function() {
    $('.container').hide();
    $('.dashboard').show();
    $('#movie-suggestions').empty();
    let username = JSON.parse(localStorage.username);
    $.get(`${__API_URL__}/api/v1/chillfellows/user/username/${username}`)
      .then(result => {
        console.log('inide initdash',result.rows[0].mb_score)
        app.Movie.findGenre(result.rows[0].mb_score)
      })
    $('#dash').on('click', function(event) {
      movieView.initWatchlistPage();
    })
  }

  //this function will show the list of movies the user has selected for future viewing
  movieView.initWatchlistPage = () => {
    $('.container').hide();
    $('.watchlist').show();
    $('#movie-list').empty();
    app.Movie.getWatchList();

    $('#test-button').on('click', function(event) {
      event.preventDefault();
      movieView.initTestPage();
    });
  }


  module.movieView = movieView;

})(app)

$(document).ready(function() {
  app.movieView.initIndexPage();
})
