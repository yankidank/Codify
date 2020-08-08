const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../config/.env')});

// Passport configurations
require('../config/passport/passport-config');
require('../config/passport/passport-google-config');
require('../config/passport/passport-github-config');
require('../config/passport/passport-linkedin-config');

// NPM modules
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
// cors = require('cors'),
const protectApi = require('../utils/protectApi');
// Routes
const authRoutes = require('../routes/authRoutes');
const apiRoutes = require('../routes/apiRoutes');
// Instantiate express ports
const DOMAIN = process.env.DOMAIN || 'localhost';
const PROD_PORT = process.env.PROD_PORT || 3000;
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
// app.use(
//  cors({
//    origin: 'http://localhost:3000', // allow server to accept request from the client
//    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//    credentials: true // allow session cookie from browser to pass through
//  })
// );
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/auth', authRoutes); // authentication
app.use('/api', protectApi, apiRoutes);

// Static assets
if (process.env.NODE_ENV === 'production' && process.env.PROD_START === 'true') {
  app.use(express.static('../build'));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
  console.log(' - Serving static files - ');
  if (process.env.PROD_START === 'true'){
    app.listen(PROD_PORT, () => {
      console.log(`/build       = ${DOMAIN}:${PROD_PORT}`);
    });
  } else {
    console.log('A web port has not been assigned')
  }
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/codify', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`API          = ${DOMAIN}:${PORT}`);
});

// Start puppeteer proxy server for web scraping
const puppeteerProxy = require('../utils/puppeteer');

puppeteerProxy();
