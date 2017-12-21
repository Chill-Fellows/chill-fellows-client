'use strict';

var app =  app || {};

var __API_URL__ = 'http://localhost:3000';

(function(module) {

  function User (userObj) {
    Object.keys(userObj).forEach(key => this[key] = userObj[key]);
  }

  User.all = [];
  let bob = new User({
    first_name: 'bob',
    last_name: 'thornton',
    mb_score: 'ENFJ',
    username:'bobt',
    password:'pass123'
  });
  let sam = new User({
    first_name: 'sam',
    last_name: 'butterton',
    mb_score: 'AAAA',
    username:'samb',
    password:'pass456'
  })

  User.create = function(user) {
    $.post(`${__API_URL__}/api/v1/chillfellows/newuser/`, user) //check filepath for usertable
      .then(response => console.log(response))
      // .then(() => testpage init)
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
// User.create(sam);
  User.validate = function(user) {
    console.log('user password', user.password);

    $.get(`${__API_URL__}/api/v1/chillfellows/user/username/${user.username}`)
      .then(response => {
        if (response.rows.length === 0) {
          User.create(user);
          app.movieView.initTestPage();
        }
        if (response.rows[0].password === user.password){
          console.log('in else if');
          console.log('username', user.username);
          localStorage.username = JSON.stringify(user.username);
          localStorage.user_id = JSON.stringify(response.rows[0].user_id);
          app.Movievie.initWatchlistPage();
        }
      })
      .catch(app.errorCallback);
  }

  // User.validate(bob);


  User.update = function(userid, userObj) {

    $.ajax({
      url: `${__API_URL__}/api/v1/chillfellows/update/${userid}`,
      method: 'PUT',
      data: userObj
    })

      .then(response => console.log(response))
      .catch(app.errorCallback);
  }
User.update('samb',sam);


  module.User = User;
}) (app);
