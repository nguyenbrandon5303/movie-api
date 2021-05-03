const express = require('express'),
      morgan = require('morgan'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

const Models = require('./models.js');

const Movies = Models.Movie,
      Users = Models.User;

const app  = express();

app.use(bodyParser.json());

// let topTenMovies = [
//   {
//     title: "John Wick"
//   },
//   {
//     title: "Spirited Away"
//   },
//   {
//     title: "Spider-Man: Into the Spider-Verse"
//   },
//   {
//     title: "The Hateful Eight"
//   },
//   {
//     title: "The Godfather"
//   },
//   {
//     title: "Pulp Fiction"
//   },
//   {
//     title: "Batman: The Dark Knight Returns (Part One + Part Two)"
//   },
//   {
//     title: "Scarface"
//   },
//   {
//     title: "The Death of Superman"
//   },
//   {
//     title: "Logan"
//   },
// ];

app.use(morgan('common'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

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
// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
/*  Add user as JSON in format:
{
  ID: integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}
*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
// Update a user's info, by username
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
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
