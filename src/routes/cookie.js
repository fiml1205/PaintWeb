const User = require('../models/siteModel')

class cookie {
    requirelogin (req, res, next) {
        if (!req.cookies.id) {
            res.redirect('/')
            return
    }
    next()
    }

    checkadmin (req, res, next) {
        if(req.cookies.id == '5fe86135118d2833e803fd74') {
            next()
        }
        else {res.redirect('/')}
    }
       
}

module.exports = new cookie


