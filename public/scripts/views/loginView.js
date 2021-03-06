'use strict';

var app = app || {};

// This function runs when there is a new user or when the user needs to log in
(function (module) {
  const loginView = {};

  loginView.initLoginPage = function() {
    $('.container').hide();
    $('.log-in').show();
    $('#sign-up-button').hide();

    $('#new-user-button').on('click', function(event) {
      event.preventDefault();
      loginView.initSignUpPage();
    })

    $('#log-in-button').on('click', function(event) {
      event.preventDefault();

      let user = {
        username: $('#username').val(),
        password: $('#password').val(),
      }
      app.User.validate(user);
      app.movieView.initWatchlistPage();
    })
  }

  loginView.initSignUpPage = function() {
    $('#new-user-button').hide();
    $('#log-in-button').hide();
    $('#sign-up-button').show();
    $('.sign-up').show();

    $('#sign-up-button').on('click', function(event) {
      event.preventDefault();

      let user = new app.User({
        first_name: $('#first-name').val(),
        last_name: $('#last-name').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        mb_score: ''
      })
      app.User.validate(user);
    })
  }

  module.loginView = loginView;
})(app)
