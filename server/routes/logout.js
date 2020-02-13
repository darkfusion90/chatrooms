module.exports = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            res.status(500).send("Internal Server Error")
        }
        else {
            res.send("Logout Successful")
        }
    })
}