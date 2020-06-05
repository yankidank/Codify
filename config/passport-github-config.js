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
			// User.findOrCreate({ githubId: profile.id }, function (err, user) {
			// 	return cb(err, user);
			// });
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
