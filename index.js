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

app.use(express.static('public'));

//Get requests
app.get('/', (req, res) => {
  res.send('Welcome to a movie app.');
});

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

//listening for requests
app.listen(8080, () => {
  console.log('App is listening on port 8080.');
});
