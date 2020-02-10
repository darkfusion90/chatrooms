const path = require('path')
const usersController = require('../controllers/users')

const loginGet = (_, res) => {
    console.log('Login Get')
    res.sendFile(path.join(__dirname, '../', 'html', 'loginForm.html'))
}

const loginPost = (req, res) => {
    console.log('Login Post')
    console.log("Passport body: ", req.body)
    res.redirect('/')
}

const registerGet = (_, res) => {
    console.log('Register Get')
    res.sendFile(path.join(__dirname, '../', 'html', 'registrationForm.html'))
}

const registerPost = (req, res) => {
    console.log('Register Post')
    console.log("Passport body: ", req.body)
    usersController.registerUser(req.session.userId, req.body.username, req.body.password, (err, user) => {
        console.log("Reg Post callback. User: ", user)
    });
    res.redirect('/')
}

const handleLoginAction = (req, res) => {
    if (req.method === 'GET') {
        loginGet(req, res)
    }
    else if (req.method === 'POST') {
        loginPost(req, res)
    }
}

const handleRegisterAction = (req, res) => {
    if (req.method === 'GET') {
        registerGet(req, res)
    }
    else if (req.method === 'POST') {
        registerPost(req, res)
    }
}

const parseApiAction = (apiRoute) => {
    if (apiRoute === '/api/login' || apiRoute === '/api/login/') {
        return 'login'
    }

    if (apiRoute === '/api/register' || apiRoute === '/api/register/') {
        return 'register'
    }

    return 'unknown'
}

const isMethodAllowed = (method) => {
    return method === 'GET' || method === 'POST'
}

const apiRouter = (req, res) => {
    console.log("Api Router: %s", req.path)

    if (!req.session.userId) {
        console.log("New User: ", req.session.userId)
    } else {
        console.log("Old User: ", req.session.userId)
    }

    if (!isMethodAllowed(req.method)) {
        console.log('METHOD NOT ALLOWED: %s', req.method)
        res.status(405).end()
    }

    const action = parseApiAction(req.path)
    if (action === 'login') {
        handleLoginAction(req, res)
    }
    else if (action === 'register') {
        console.log('register!')
        handleRegisterAction(req, res)
    }
    else {
        res.status(404).end()
    }
}

module.exports = apiRouter