'use strict';

var app =  app || {};

var __API_URL__ = 'http://localhost:3000';

(function(module) {

  function User (userObj) {
    Object.keys(userObj).forEach(key => this[key] = userObj[key]);
  }

  User.all = [];

  User.create = user => {
    $.post(`${__API_URL__}/api/v1/chillfellows`, user) //check filepath for usertable
      .then(console.log)
      // .then(() => testpage init)
      .catch(errorCallback);
  }

  User.validate = user => {
    $.get(`${__API_URL__}/api/v1/chillfellows/:id`, user) //check filepath for user table
      .then(Movie.loadAll)
      .catch(errorCallback);
  }

  user.update = genre => {
    $.put(`${__API_URL__}/api/v1/chillfellows/:id`, genre)
      .then(() => page('/dashboard'))
      .catch(errorCallback);
  }

  module.User = User;
}) (app);
