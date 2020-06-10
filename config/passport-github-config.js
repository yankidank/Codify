const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/auth/github/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			// console.log(profile);

			// ^^ this profile parameter contains all of the information from github that should be stored in the database
			// This is the information that should be stored in the database.
			// When MongoDB returns the new user, it should be passed to the done method (I have created a user object because we don't have a User Schema yet)
			const { id, displayName, profileUrl } = profile;
			let newUser = {
				githubID: id,
				displayName,
				profileUrl
			};
			done(null, newUser);
		}
	)
);
