const User = require('../models/siteModel')

class SiteController {

    // GET login
    login(req, res) {
        res.render('login')
    }

    // GET login error
    loginerr(req, res, next) {
        res.render('loginerr')
    }

    // POST login 
    check(req, res, next) {

        var name = req.body.name;
        var password = req.body.password

        User.findOne({
            name:name,
            password:password
        })
        .then(login => {
            if (login) {
                res.cookie('id', login.id, 1)
                res.redirect('http://localhost:3000/paintlg') 
            } 
            else {
                res.redirect('http://localhost:3000/loginerr')                  
            }
        })
        .catch(err => {
            res.status(500).json('Sever lỗi!!')
        })
    }

    // GET paint
    paint(req, res) {
        res.render('paint')
    }

    paintlg(req, res, next) { 
        res.render('paintlg')    
    }

    // GET admin
    userctrl(req, res, next) {
        User.find({})
            .then(users => {     
                users = users.map(user => user.toObject())
                res.render('user', {users})
            }              
            )               
            .catch(next)
    }

    // GET create
    create(req, res, next) {
        res.render('create')
    }

    // GET createrr
    createrr(req, res, next ) {
        res.render('createrr')
    }

    // POST save create
    store (req, res, next) {
        var name = req.body.name
        var password = req.body.password

        User.findOne({
            name:name
        }) 
            .then(create => {
                if (create){res.redirect('http://localhost:3000/createrr')} 
                else {
                    return User.create({
                        name: name,
                        password: password
                    })
                }
            })
            .then(() => res.redirect('http://localhost:3000/paintlg'))
        .catch(err => {
            res.status(500).json('Tạo tài khoản thất bại')
        })   
    }
    
    adminstore(req, res, next) {
        var name = req.body.name
        var password = req.body.password

        User.findOne({
            name:name
        }) 
            .then(create => {
                if (create){res.redirect('http://localhost:3000/admincreaterr')} 
                else {
                    return User.create({
                        name: name,
                        password: password
                    })
                }
            })
            .then(() => res.redirect('http://localhost:3000/admincreate'))
        .catch(err => {
            res.status(500).json('Tạo tài khoản thất bại')
        })  
    }

    // get Edit
    getedit (req, res,next) {
        User.findById(req.params.id, (err, user) => {
            if(!err) {
                res.render('edit', {user:user.toObject()})
            }
        })     
    }

    postedit(req, res, next) {
        User.findOneAndUpdate({_id:req.body.id}, req.body, {new:true}, (err) =>
        {
            if (!err) {
                res.redirect('/userctrl')
            }
        })
    } 

    getdelete(req, res, next) {
        User.findByIdAndDelete(req.params.id, req.body, (err) =>
        {
            if (!err) {
                res.redirect('/userctrl')
            }
        })
    }

    // get change pass
    change(req, res, next) {
        User.findOneAndUpdate({_id:req.body.id}, req.body, {new:true}, (err) =>
        {
            if (!err) {
                 res.render('changepw')
            }
        }) 
    }

    // post change pass
    changepw(req, res, next) {
        User.findOneAndUpdate({_id:req.body.id}, req.body, {new:true}, (err) =>
        {
            if (!err) {
                res.redirect('http://localhost:3000/paintlg')
            }
        })
    }

    logout(req, res, next) {
        res.clearCookie('id')
        res.redirect('/')
    }
}

module.exports = new SiteController

