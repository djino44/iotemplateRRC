var Article = require(__base + '/model/articles');

exports.create = function (req, res) {
    res.contentType('json');
    var newArticle = Article({
        title: req.body.src,
        text: req.body.dest,
        date: new Date(),
        published: false
    });
    newArticle.save().then(function(article) {
        res.send({
            success: true,
            article: article
        });
    }).catch(function(err) {
        res.send({
            success: false,
            error: err
        });
    });
};

exports.delete = function (req, res) {
    res.contentType('json');
    Article.findByIdAndRemove(req.params.article_id).then(function() {
        res.send({
            success: true,
        });
    }).catch(function(err) {
        res.send({
            success: false,
            error: err
        });
    });
};

exports.get = function (req, res) {
    res.contentType('json');
    Article.findById(req.params.article_id).then(function(article) {
        res.send({
            success: true,
            article: article
        });
    }).catch(function(err) {
        res.send({
            success: false,
            error: err
        });
    });
};

exports.getAll = function (req, res) {
    res.contentType('json');
    Article.find().then(function(articles) {
        res.send({
            success: true,
            articles: articles
        });
    }).catch(function(err) {
        res.send({
            success: false,
            error: err
        });
    });
};