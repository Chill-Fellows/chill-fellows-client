'use strict'


const express = require('express');
const cors = require('cors');
const pg = require('pg');
const fs = require('fs');
const bodyparser = require('body-parser');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
const TOKEN = process.env.TOKEN;

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();
client.on('error', err => console.error(err));

app.use(cors());
app.use(express.static('./public'));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// let user1 = {
//   first_name: 'roger',
//   last_name: 'davenport',
//   mb_score: 'entj',
//   username: 'bob123',
//   password: 'sleepydog'
// };
// let movie = {
//   user_id: '1',
//   movie_name: 'highlander',
//   movie_genre: 'war'
// };

createTables();
// insertTestData(user1, movie);





function createTables() {
  console.log('in create table function');
  client.query(`
    CREATE TABLE IF NOT EXISTS users(
      user_id SERIAL PRIMARY KEY,
     first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
     mb_score VARCHAR(10) NOT NULL,
      username VARCHAR(20) NOT NULL,
      password VARCHAR(20) NOT NULL
    );`)
    .catch(console.error);
 client.query(`
    CREATE TABLE IF NOT EXISTS watchlist
    (wl_id SERIAL PRIMARY KEY,
    user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id),
    movie_name VARCHAR(255) NOT NULL,
    movie_genre VARCHAR(20) NOT NULL);`);

}

// function insertTestData(u, q) {
//   client.query(`
//       INSERT INTO users
//       (first_name, last_name, mb_score, username, password) VALUES
//       ($1, $2, $3, $4, $5);`,
//     [u.first_name, u.last_name, u.mb_score, u.username, u.password]
//   );
//   client.query(`
//       INSERT INTO watchlist
//       (user_id, movie_name, movie_genre) VALUES ($1, $2, $3);`,
//     [q.user_id, q.movie_name, q.movie_genre]);
// }
