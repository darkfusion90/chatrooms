const httpStatusCodes = require('../constants/httpStatusCodes')

module.exports = (req, res) => {
    req.session.redirectedFromRegister = true
    req.session.save()
    // TODO(29th June 2020): Remove this route and make the React client use the updated route (POST /api/user)
    //Using 307 Temporary Redirect to make sure the redirect is done using the same method as /api/register (i.e, POST)
    res.redirect(httpStatusCodes.TEMPORARY_REDIRECT, '/api/user')
}