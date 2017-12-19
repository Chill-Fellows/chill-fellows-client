'use strict'

var app = app || {};

(function(module) {

  const movieView = {};
  const radioValue = [];
  let mb_score;

  movieView.initIndexPage = function() {
    console.log('init');
    $('.container').hide();
    $('.').show();
  }

  movieView.initTestPage = function () {
    console.log('test');
    $('.container').hide();
    $('.').show();
    $('#personality').on('submit', function(event) {
      event.preventDefault();

      radioValue.push($('input[name= "ei"]:checked'.val())
      radioValue.push($('input[name= "sn"]:checked'.val())
      radioValue.push($('input[name= "tf"]:checked'.val())
      radioValue.push($('input[name= "jp"]:checked'.val())
      };

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
  }


  movieView.initQueuePage = function () {
    console.log('watchlist');
    $('.container').hide();
    $('.').show();
  }

  module.movieView = movieView;

})(app)
