var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require(__base + './model/users');
var config = require('config');

// config
passport.use(
	new GoogleStrategy({
		clientID: config.get('Auth.google.clientID'),
		clientSecret: config.get('Auth.google.clientSecret'),
		callbackURL: config.get('Auth.google.callbackURL')
	},
	function(token, tokenSecret, profile, done) {
		User.findOne({ 'social.googleId': profile.id }, function(err, user) {
			console.log(profile);
			if(err) { 
				console.log(err); 
			}
			if (!err && user != null) {
				done(null, user);
			} else {
				var user = new User({
					social: {
						googleId: profile.id
					},
					lastname: profile.name.familyName,
					firstname: profile.name.givenName
				});
				user.save(function(err) {
					if(err) { 
						console.log(err); 
					} else {
						console.log("saving user ...");
						done(null, user);
					};
				});
			};
		});
	})
);

