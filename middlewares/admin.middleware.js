const config = require('../config/config')
const jwt = require('jsonwebtoken')
exports.adminAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies
        if(!token) {
            return res.redirect('/admin')
        }
        const decoded = jwt.verify(token, config.JWT)

        if(!decoded.isAdmin) {
            return res.redirect('/admin')
        } else {
            next()
        }
    } catch(e) {
        console.log(e)
        res.redirect('/admin')
    }
}