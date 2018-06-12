exports.login = function(req, res) {
    if (req.method == 'GET') {
        res.render('login', {
            title: 'Home'
        })
    } else if (req.method == 'POST') {
        res.status(200).send(req.body)
    }
}

exports.signup = function(req, res) {
    if (req.method == 'GET') {
        res.render('signup', {
            title: 'Home'
        })
    } else if (req.method == 'POST') {
        res.status(200).send(req.body)
    }
}

exports.forgotPassword = function(req, res) {
    if (req.method == 'GET') {
        res.render('forgotpassword', {
            title: 'Home'
        })
    } else if (req.method == 'POST') {
        res.status(200).send(req.body)
    }
}