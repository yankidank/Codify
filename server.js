/////////////////////////////
// DEPENDENCIES /////////////
/////////////////////////////

require('dotenv').config();
//passport configurations
require('./config/passport-config');
require('./config/passport-google-config');
require('./config/passport-github-config');
require('./config/passport-linkedin-config');
// NPM modules
const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
// const cors = require('cors');
// const protectApi = require('./utils/protectApi');
// Routes
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

/////////////////////////////
// ACTUAL SERVER STUFF //////
/////////////////////////////

// instantiate express and set port
const PORT = process.env.PORT || 3001;
const app = express();
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cookieSession({
		maxAge: 60 * 60 * 1000,
		keys: [process.env.COOKIE_KEY]
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
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/unicorn-hunt', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
});
// ROUTING
app.use('/auth', authRoutes); // authentication
app.use('/api', apiRoutes);
// app.use('/api', protectApi, apiRoutes);

app.listen(PORT, function () {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});
