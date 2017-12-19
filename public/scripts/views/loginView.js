'use strict';

var app = app || {};

// This function runs when there is a new user or when the user needs to log in
(function (module) {
  const loginView = {};
  let username;
  let password;


  loginView.initLoginPage = function() {
    $('.container').hide();
    $('.login').show();

    $('#login').on('submit', function(event)) {
      event.preventDefault();

      username = event.target.username.value;
      password = event.target.password.value;

  };

  module.loginView = loginView;
})(app)
