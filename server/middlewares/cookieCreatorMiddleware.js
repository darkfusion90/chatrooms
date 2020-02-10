const usersController = require('../controllers/users')

const middleware = (req, res, next) => {
    if(!req.session.userId){
        console.log("No userid")
    }
    else{
        console.log("Middleware UserId: ", req.session.userId)
    }
    next()
}

module.exports = middleware