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
// insertTestData(user1, movie);
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
// superagent.get(runTimeUrl)
//   .then(singlemovie => { movieRunTime = singlemovie.body.runtime; return movieRunTime})
//   console.log('movieRuntime', movieRunTime);
// let runTimeUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
