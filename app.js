/**
 * Module dependencies
 */

var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	morgan = require('morgan'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	lessMiddleware = require('less-middleware'),
	db = require('./model/db'),
	config = require('config'),
	basicAuth = require('basic-auth-connect'),
	schedule = require('node-schedule');
	passport = require('passport'),
	session = require('express-session');

var User = require('./model/users');

var app = module.exports = express();

//Define base path
global.__base = __dirname + '/';

// seralize and deseralize
passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id)
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        if(!err) done(null, user);
        else done(err, null);
    })
});

var auth = require('./routes/auth/authentication.js');

/**
 * Configuration
 */

// Authenticator (basic auth)
if (config.get('BasicAuth.enable')) {
	var user = config.get('BasicAuth.user');
	var password = config.get('BasicAuth.password')
	app.use(basicAuth(user, password)); 
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
  secret: config.get('Session.secret'),
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/vendors', express.static(path.join(__dirname, 'vendors')));

// Api files
var API = {
	articles: require('./routes/api/articles'),
	users: require('./routes/api/users'),
	account: require('./routes/api/account')
};

// Cron functions
var cron = require('./routes/cron');

// Less to css config
app.use(lessMiddleware(path.join(__dirname, 'less'), {
	dest: path.join(__dirname, 'public'),
	options: {
		compiler: {
			compress: true
		}
	},
	preprocess: {
	path: function(pathname, req) {
			return pathname.replace(/\\css\\/, '\\').replace(/\/css\//,'/');
		}
	},
	debug: true,
	force: true
}));

app.use(express.static(__dirname + "/public"));

/**
 * Environnements
 */

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
	app.use(errorHandler());
}

// production only
if (env === 'production') {

}

/**
 * Routes
 */
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { 
      return next();
  }
  res.redirect('/login');
}

// Serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//Login - Logout
app.get('/auth/google', passport.authenticate('google', { scope: 'profile' }));
app.get('/auth/google/callback', 
	passport.authenticate('google', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/');
	}
);
app.get('/logout', API.account.logout);

// File API
app.get('/api/articles', API.articles.getAll);
app.post('/api/articles', API.articles.create);
app.get('/api/articles/:article_id', API.articles.get);
app.delete('/api/articles/:article_id', API.articles.delete);

app.get('/api/users', API.users.getAll);
app.get('/api/allusers', API.users.getUsers);

app.get('/api/account/infos', API.account.getInfos);
app.get('/api/account/isauthenticated', API.account.isAuthenticated);

// Redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Cron processes
 */
// Launch process every hour
var j = schedule.scheduleJob('0 * * * *', function(){
	cron.process();
});

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
