'use strict';

var app =  app || {};

// var __API_URL__ = 'http://localhost:3000';
var __API_URL__ = 'https://chill-fellows.herokuapp.com';

(function(module) {

  function User (userObj) {
    Object.keys(userObj).forEach(key => this[key] = userObj[key]);
  }



  User.create = function(user) {
    $.post(`${__API_URL__}/api/v1/chillfellows/newuser/`, user) //check filepath for usertable
      .then(response => console.log('this is back from creting user',response))
      .then(response =>  $.get(`${__API_URL__}/api/v1/chillfellows/user/username/${user.username}`))
      .then(response => {
        console.log('inside user.create sending this to localstorage',response);
        localStorage.user_id = JSON.stringify(response.rows[0].user_id);
        localStorage.username = JSON.stringify(response.rows[0].username);
      })
      .catch(app.errorCallback);
  }

  User.getOne = function(username) {
    console.log('inside usergetone');

    $.get(`${__API_URL__}/api/v1/chillfellows/user/username/${username}`)
      .then(response => {
        console.log('response from get one',response.rows[0]);
        return response.rows[0];

      })
  }

  User.validate = function(user) {
    console.log('user password', user.password);

    $.get(`${__API_URL__}/api/v1/chillfellows/user/username/${user.username}`)
      .then(response => {
        if (response.rows.length === 0) {
          User.create(user);
          app.movieView.initTestPage(user);
        }
        if (response.rows[0].password === user.password){
          console.log('in else if');
          console.log('username', user.username);
          localStorage.username = JSON.stringify(user.username);
          localStorage.user_id = JSON.stringify(response.rows[0].user_id);
          app.movieView.initWatchlistPage();
        }
      })
      .catch(app.errorCallback);
  }



  User.update = function(userObj) {
    $.ajax({
      url: `${__API_URL__}/api/v1/chillfellows/update/${userObj.username}`,
      method: 'PUT',
      data: userObj
    })
      .then(response => console.log(response))
      .catch(app.errorCallback);
  }



  module.User = User;
}) (app);
