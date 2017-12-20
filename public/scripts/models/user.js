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
    mb_score: 'ENFJ',
    username:'samb',
    password:'pass456'
  })
  console.log('the bob user',bob);

  User.create = function(user) {
    $.post(`${__API_URL__}/api/v1/chillfellows/newuser/`, user) //check filepath for usertable
      .then(response => console.log(response))
      // .then(() => testpage init)
      .catch(app.errorCallback);
  }

  // User.create(bob);

  User.getOne = function(username) {
    console.log('inside usergetone');
    $.get(`${__API_URL__}api/v1/chillfellows/user/username/${username}`)
      .then(response => {
        console.log('response from get one',response);
        // if (response.length < 1) {
        //   console.log('response from get one',response);
        //   return response;
        // }
      })
  }
  console.log('bob username',bob.username);
  User.getOne(bob.username);


  User.validate = user => {
    $.get(`${__API_URL__}api/v1/chillfellows/user/username/:username`, user) //check filepath for user table
      .then()
      .catch(app.errorCallback);
  }

  User.update = function(userid, userObj) {
    $.put(`${__API_URL__}/api/v1/chillfellows/update/${userid}`, userObj)
      .then(response => console.log(response))
      .catch(app.errorCallback);
  }

  module.User = User;
}) (app);
