'use strict';

var app =  app || {};

var __API_URL__ = 'http://localhost:3000';

(function(module) {

function errorCallback(err) {
  console.error(err);
  app.errorView.initErrorPage(err);
}

function User (userObj) {
  this.first_name = userObj.first_name;
  this.last_name = userObj.last_name;
  this.username = userObj.username;
  this.password = userObj.password;
  this.mb_score = userObj.user.mb_score;
  }




}
