module.exports = (app) => {

    const user = require('./user.route')
    const treasure = require('./treasure.route')

    app.use('/api/user', user)
    app.use('/api/treasure', treasure)
}