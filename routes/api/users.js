var users = [];

var User = require(__base + '/model/users');

exports.getAll = function(req, res) {
  res.contentType('json');
  User.find().then(function(users) {
    res.send({
      success: true,
      users: users
    });
  }).catch(function(err) {
    res.send({
      success: false,
      error: err
    });
  });
};

exports.getUsers = function(req, res) {
  res.contentType('json');
  User.find().then(function(users) {
    res.send({
      success: true,
      users: users
    });
  }).catch(function(err) {
    res.send({
      success: false,
      error: err
    });
  });
};