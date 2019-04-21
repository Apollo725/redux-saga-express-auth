const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// const cookieParser = require('cookie-parser');
const auth = require('./routes/api/auth');

const db = require('./config/keys').mongoURI;

app.use(express.static('dist'));
app.use(bodyParser.json());
// app.use(cookieParser());

app.use('/api/auth', auth);

mongoose
  .connect(db)
  .then(console.log(`Successfully connected to ${db}`))
  .catch(err => console.log(err));

const port = process.env.PORT || 8080;

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(port, () => console.log(`Listening on port ${port}!`));
