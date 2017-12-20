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
//var __API_URL__ = 'http://localhost:3000';

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();
client.on('error', err => console.error(err));

app.use(cors());
app.use(express.static('./public'));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.get('/api/v1/chillfellows/search/:genre', (req, res) => {
  // console.log('inside search route');
  let url =
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${req.params.genre}`;
  superagent.get(url)
    .then(result => {
      return result.body.results.map(movie =>{
        let { title, id, poster_path, backdrop_path, overview, vote_average } = movie;
        return {
          id: id,
          title: title,
          poster_path: poster_path,
          backdrop_path: backdrop_path,
          overview: overview,
          vote_average: vote_average,
          runtime: 0
        }
      })
    })
    .then(resultarray => {
      res.send(resultarray);
    })
    .catch(console.error)
})


app.get('api/v1/chillfellows/user/username/:username', (req, res) => {
  client.query(`SELECT * FROM user WHERE username=${req.params.username} LIMIT ONE;`)
    .then(rows => res.send(rows))
    .catch(error => console.error(error))
})

app.post('/api/v1/chillfellows/newuser/', (req, res) => {
  client.query(`INSERT INTO users (first_name, last_name, mb_score, username, password)
  VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;`,
    [
      req.body.first_name,
      req.body.last_name,
      req.body.mb_score,
      req.body.username,
      req.body.password
    ]
  )
    .then(res.send('insert complete'))
})

app.put('/api/v1/chillfellows/update/:id', (req, res) => {
  client.query(`UPDATE users SET first_name=$1, last_name=$2, mb_score=$3, username=4$ password=$5 WHERE user_id=$6`, [
    req.body.first_name,
    req.body.last_name,
    req.body.mb_score,
    req.body.username,
    req.body.password
  ])
    .then(res => res.send('user updated'))
})

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: './public'});
});


createTables();



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

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
