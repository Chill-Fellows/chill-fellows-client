'use strict';


let handleNav = () => {
  $('.hamburger').on('click', function() {
    $('nav ul').toggle();
  });

  $('#logout').on('click', function() {
    localStorage.clear();
    app.loginView.initLoginPage();
  })

  $('#home').on('click', function() {
    app.movieView.initWatchlistPage();
  })

  $('#retest').on('click', function() {
    let user = app.User.getOne(JSON.stringify(localStorage.username));
    console.log('logged in user', user);
    app.movieView.initTestPage(user);
  })
}


$(document).ready(function(){
  handleNav();
})
