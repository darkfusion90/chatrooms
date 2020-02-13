const User = require('../models/User')

module.exports = (req, res) => {
    User.findOne({ userId: req.session.userId }, (err, user) => {
        if (err) {
            res.status(500).send("Internal Server Error")
        }
        else if (!user) {
            res.status(404).send("User not found")
        }
        else {
            res.json({ loggedIn: req.isAuthenticated(), username: user.username })
        }
    })
}