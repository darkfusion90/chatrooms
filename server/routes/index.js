const path = require('path')
const usersController = require('../controllers/users')

const index = (req, res) => {
    if (!req.session.userId) {
        usersController.createUnregisteredUser(req.session.cookie.expires, (err, user) => {
            if (err) {
                console.log("Error creating user:\n", err, '\n', user)
            }
            else {
                console.log("Callback: ", user)
                req.session.userId = user.userId
                req.session.save()
            }
        })
    }
    else {
        console.log('Old User. UserId: ' + req.session.userId)
    }

    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    } else {
        res.send('Hello from Development Server!')
    }
}

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
    if(req.body.username != "cow"){
        res.status(400).json({'cow': 'i don\'t like that'})
    }
    console.log('Register Post')
    console.log("Passport body: ", req.body)
    res.redirect('/')
}

module.exports = { index, loginGet, loginPost, registerGet, registerPost }