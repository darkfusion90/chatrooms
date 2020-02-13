const registrationFormValidator = require('../utils/registrationFormValidator')
const usersController = require('../controllers/users')
const logger = require('../utils/logger')('[Router: Register] ')

module.exports = (req, res) => {
    logger.debug('Register Post')
    logger.debug('Req body: ', req.body)
    const { errors, hasErrors } = registrationFormValidator(req.body)

    if (hasErrors) {
        res.status(400).json(errors)
        return
    }

    usersController.registerUser(req.session.userId, req.body.username, req.body.password, (err, user) => {
        if (err) {
            res.status(500).send('Oops! The server was punched really hard by the Hulk :(')
        }
        else if (!user) {
            res.status(500).send('Oops! The server was punched really hard by the Hulk :(')
        }
        else {
            logger.debug('Reg Post callback. User: ', user)
            req.session.isRegistered = user.isRegistered
            req.session.save()
            res.redirect('/')
        }
    });
}