'use strict';


let handleNav = () => {
  $('.hamburger').on('click', function() {
    
    $('nav ul').toggle();
  });

  $('#logout').on('click', function() {
    localStorage.clear();
    // app.loginView.initLoginPage();
    location.reload(true);
  })

  $('#home').on('click', function() {
    app.movieView.initWatchlistPage();
  })

  $('#retest').on('click', function() {
    // let user = app.User.getOne(JSON.stringify(localStorage.username));
    $.get(`${__API_URL__}/api/v1/chillfellows/user/username/${username}`)
    .then(user => app.movieView.initTestPage(user))


  })
}


$(document).ready(function(){
  handleNav();
})
