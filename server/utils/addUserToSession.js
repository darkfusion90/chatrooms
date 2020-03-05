module.exports = (req) => {
    createUnregisteredUser(req.session.cookie.expires, (err, user) => {
        //In this case, unable to create user is the server's fault because the client doesn't send any payload
        //Hence, there is no way for the client to screw up
        //Failure will generally occur due to duplicate userId (automatically generated in the users controller)
        if (err || !user) {
            return null
        }

        req.session.userId = user.userId
        req.session.isRegistered = false
        req.session.save()
        return user
    })
}