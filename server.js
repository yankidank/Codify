// Dependencies
require('dotenv').config();

// Passport configurations
require('./config/passport-config');
require('./config/passport-google-config');
require('./config/passport-github-config');
require('./config/passport-linkedin-config');

// NPM modules
const express = require('express'),
      helmet = require('helmet'),
      path = require('path'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      cookieSession = require('cookie-session'),
//    cors = require('cors'),
      protectApi = require('./utils/protectApi'),
// Routes
      authRoutes = require('./routes/authRoutes'),
      apiRoutes = require('./routes/apiRoutes'),
// Instantiate express and set port
      PORT = process.env.PORT || 3001,
      app = express();

// Middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
// app.use(
// 	cors({
// 		origin: 'http://localhost:3000', // allow server to accept request from the client
// 		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// 		credentials: true // allow session cookie from browser to pass through
// 	})
// );
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/auth', authRoutes); // authentication
app.use('/api', protectApi, apiRoutes);

// Serve static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/codify', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, function () {
  console.log(`API server on port ${PORT}!`);
});

// Start puppeteer proxy server for web scraping
const puppeteerProxy = require('./utils/puppeteer');
puppeteerProxy();
