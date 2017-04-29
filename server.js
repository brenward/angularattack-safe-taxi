// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./server/model/user');
const passport = require("passport");
const passportJWT = require("passport-jwt");

// Configuring Passport and JWT
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = process.env.JWT_SECRET || 'our super secret key';


var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findOne({_id: jwt_payload._id,roles:jwt_payload.roles},function(err,user){;
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  })
});

const app = express();
app.use(passport.initialize());
// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


passport.use(strategy);

const api = require('./server/routes/api');
const user = require('./server/routes/user-routes');
const passenger = require('./server/routes/passenger-routes');
const journey = require('./server/routes/journey-routes');




var uri = process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'mongodb://localhost/safe_taxi'
var db = mongoose.connect(uri);



// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
app.use('/user', user);
app.use('/passenger', passenger);
app.use('/journey', journey);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
