'use strict';
var __API_URL__ = 'https://chill-fellows.herokuapp.com';

let handleNav = () => {
  $('.hamburger').on('click', function() {
    $('nav ul').fadeToggle(400);
  })

  $('#logout').on('click', function() {
    localStorage.clear();
    location.reload(true);
  })

  $('#home').on('click', function() {
    app.movieView.initWatchlistPage();
  })

  $('#retest').on('click', function() {
    if (localStorage.username === undefined) {
      app.loginView.initLoginPage();
    } else {
      let username = JSON.parse(localStorage.username);
      $.get(`${__API_URL__}/api/v1/chillfellows/user/username/${username}`)
        .then(user => app.movieView.initTestPage(user))
}
  })

  $('#about').on('click', function() {
    $('.container').hide();
    $('.about-us').show();
  })
}


$(document).ready(function(){
  handleNav();
})
