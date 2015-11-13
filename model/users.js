var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var userSchema = new Schema({
	lastname: String,
	firstname: String,
	email: String,
	social: {
		googleId: Number
	},
	birthdate: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;