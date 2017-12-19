'use strict';

var app = app || {};

(function(module) {

  const movieView = {};
  let mb_score;

  movieView.initIndexPage = function() {
    console.log('init');
    $('.container').hide();
    if (localStorage.username) $('.watchlist').show();
    if (!localStorage.username) {
      app.loginView.initLoginPage();
    }
  }

  movieView.initTestPage = function () {
    console.log('test');
    $('.container').hide();
    $('.personality').show();
    $('#personality').on('submit', function(event)) {
      event.preventDefault();

      let radioValue = [];

      radioValue.push($('input[name= "ei"]:checked'.val());
      radioValue.push($('input[name= "sn"]:checked'.val());
      radioValue.push($('input[name= "tf"]:checked'.val());          radioValue.push($('input[name= "jp"]:checked'.val());

      if (radioValue = ['e', 's', 't', 'j']) mb_score = 36;
      if (radioValue = ['e', 'n', 't', 'j']) mb_score = 10752;
      if (radioValue = ['e', 's', 'f', 'j']) mb_score = 99;
      if (radioValue = ['e', 's', 't', 'p']) mb_score = 37;
      if (radioValue = ['e', 'n', 'f', 'j']) mb_score = 53;
      if (radioValue = ['e', 'n', 't', 'p']) mb_score = 878;
      if (radioValue = ['e', 's', 'f', 'p']) mb_score = 80;
      if (radioValue = ['e', 'n', 'f', 'p']) mb_score = 27;
      if (radioValue = ['i', 'n', 'f', 'p']) mb_score = 10749;
      if (radioValue = ['i', 's', 'f', 'p']) mb_score = 10402;
      if (radioValue = ['i', 'n', 't', 'p']) mb_score = 9648;
      if (radioValue = ['i', 'n', 'f', 'j']) mb_score = 18;
      if (radioValue = ['i', 'n', 't', 'j']) mb_score = 12;
      if (radioValue = ['i', 's', 'f', 'j']) mb_score = 14;
      if (radioValue = ['i', 's', 't', 'p']) mb_score = 28;
      if (radioValue = ['i', 's', 't', 'j']) mb_score = 35;

      app.User({mb_score: `${mb_score}`}); // ?
      app.Movie.findGenre(mb_score, movieView.initDashboardPage));
    };

    // movieView.initDashboardPage(mb_score);
  }

  movieView.initDashboardPage = function() {
    $('.container').hide();
    $('.dashboard').show();
    $('.dashboard').empty();
    app.Movie.all.map(movie => $('#movie-suggestions').append(movie.toHtml))

    $('.add-button').on('submit', function(event) {
      app.Movie.addOne($(this).parent().parent().data('movieid'))
    })
  }


  module.movieView = movieView;

})(app)
