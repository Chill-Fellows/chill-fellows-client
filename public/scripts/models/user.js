'use strict';

var app =  app || {};

var __API_URL__ = 'http://localhost:3000';

(function(module) {

  function User (userObj) {
    Object.keys(userObj).forEach(key => this[key] = userObj[key]);
  }

  User.all = [];

  module.User = User;
}) (app);
