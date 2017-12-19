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
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();
client.on('error', err => console.error(err));

app.use(cors());
app.use(express.static('./public'));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('api/v1/chillfellows/search/:id', (req, res) => {
  let url = `https://api.themoviedb.org/3/discover/movie?${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${req.params.id}`;
  superagent.get(url)
    .then(result => {
      result.body.results.map(movie =>{
        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          vote_average: movie.vote_average
        }
      })
    })
    .then(resultarray => res.send(resultarray))
    .catch(console.error)
})
app.get('api/v1/chillfellows/search/user/:id', (req, res) => {

})



createTables();





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
