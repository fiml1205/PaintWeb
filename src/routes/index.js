const siteRouter = require('./siteRouter')

function route(app) {
  
    // app.use('//login', siteRouter)
    // app.use('//loginerr', siteRouter)
    // app.use('//paintlg', siteRouter)
    // app.use('//userctrl', siteRouter)
    // app.use('//create', siteRouter)
    // app.use('//createrr', siteRouter) 
    // app.use('//admincreate', siteRouter) 
    // app.use('//admincreaterr', siteRouter) 
    // app.use('//getchangepw', siteRouter)
    // app.use('//postchangepw', siteRouter)
    // app.use('//userctrl/:id/edit', siteRouter)
    // app.use('//logout', siteRouter)
    app.use('/', siteRouter)
}

module.exports = route