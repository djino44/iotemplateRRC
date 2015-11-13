var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title: String,
	text: String,
	date: Date,
	published: Boolean
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;