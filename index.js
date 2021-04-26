const express = require('express'),
      morgan = require('morgan');

const app  = express();

let topTenMovies = [
  {
    title: "John Wick"
  },
  {
    title: "Spirited Away"
  },
  {
    title: "Spider-Man: Into the Spider-Verse"
  },
  {
    title: "The Hateful Eight"
  },
  {
    title: "The Godfather"
  },
  {
    title: "Pulp Fiction"
  },
  {
    title: "Batman: The Dark Knight Returns (Part One + Part Two)"
  },
  {
    title: "Scarface"
  },
  {
    title: "The Death of Superman"
  },
  {
    title: "Logan"
  },
];

app.use(morgan('common'));

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

//Get requests
app.get('/', (req, res) => {
  res.send('Welcome to a movie app.');
});

app.get('/movies', (req, res) => {
  res.send('Successful GET request returning all movies')
});
app.get('/movies/:title', (req, res) => {
  res.send('Successful GET request returning data of single movie by title')
});
app.get('/movies/:genre/:title', (req, res) => {
  res.send('Successful GET request returning data about genre by title')
});
app.get('/movies/directors/:name', (req, res) => {
  res.send('Successful GET request returning data about director by name')
});
app.post('/users', (req, res) => {
  res.send('Successful POST request registering new user')
});
app.put('/users/:username', (req, res) => {
  res.send('Successful PUT request updating user\'s username')
});
app.put('/users/:username/movies/:title', (req, res) => {
  res.send('Successful PUT request adding movie to user\'s list of favorite movies')
});
app.delete('/users/:username/movies/:title', (req, res) => {
  res.send('Successful DELETE request removing movie from user\'s list of favorite movies')
});
app.delete('/users/:username', (req, res) => {
  res.send('Successful DELETE request removing user')
});

//listening for requests
app.listen(8080, () => {
  console.log('App is listening on port 8080.');
});
