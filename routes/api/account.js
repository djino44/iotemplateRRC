exports.getInfos = function (req, res) {
    res.contentType('json');
    infos = {};

    console.log(req.user);
    if (req.user) {
    	infos.user = {};
    	infos.user.lastname = req.user.lastname,
    	infos.user.firstname = req.user.firstname
    }
    res.send({
        success: true,
        infos: infos
    });
};

exports.isAuthenticated = function(req, res) {
    res.contentType('json');
    res.send({
        success: true,
        isAuthenticated: req.user ? true : false
    });
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
};