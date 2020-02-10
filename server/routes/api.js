const path = require('path')
const usersController = require('../controllers/users')

const debug = (...args) => {
    console.debug('[ApiRouter] ', args)
}

const loginGet = (_, res) => {
    debug('Login Get')
    res.sendFile(path.join(__dirname, '../', 'html', 'loginForm.html'))
}

const loginPost = (req, res) => {
    debug('Login Post')
    debug('Req body: ', req.body)
    res.redirect('/')
}

const registerGet = (_, res) => {
    debug('Register Get')
    res.sendFile(path.join(__dirname, '../', 'html', 'registrationForm.html'))
}

const registerPost = (req, res) => {
    debug('Register Post')
    debug('Req body: ', req.body)
    usersController.registerUser(req.session.userId, req.body.username, req.body.password, (err, user) => {
        debug('Reg Post callback. User: ', user)
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
    debug('%s', req.path)

    if (!isMethodAllowed(req.method)) {
        debug('METHOD NOT ALLOWED: %s', req.method)
        res.status(405).end()
    }

    const action = parseApiAction(req.path)
    if (action === 'login') {
        debug('action login')
        handleLoginAction(req, res)
    }
    else if (action === 'register') {
        debug('action register')
        handleRegisterAction(req, res)
    }
    else {
        debug('action unknown')
        res.status(404).end()
    }
}

module.exports = apiRouter