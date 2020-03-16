const path = require('path')
const fs = require('fs')
const User = require('../models/user.model')
exports.login = async (req, res) => {
    try {
        let view = { pageName: 'Admin Login' }
        res.render('admin/login', { view })
    } catch (e) {
        console.log(e)
        res.send('An error has occurred')
    }
}

exports.auth = async (req, res) => {
    try {
        let { username, password } = req.body
        const user = await User.login(username, password)

        if (!user) {
            res.redirect('/admin')
        } else {
            res.cookie('token', user.token, { maxAge: 86400000, httpOnly: true })
            res.redirect('/admin/users')
        }
    } catch (e) {
        console.log(e)
        res.send('An error has occurred')
    }
}

exports.users = async (req, res) => {
    let view = { pageName: 'Users' }
    view.users = await User.find()
    res.render('admin/users', { view })
}

exports.addUser = async (req, res) => {
    try {
        let { username, password, teamName, isAdmin } = req.body
        isAdmin = (isAdmin == 1)

        let user = User({ username, password, teamName, isAdmin })
        await user.generateToken()
        await user.save()
        res.redirect('/admin/users')
    } catch (e) {
        console.log(e)
        res.send('An error has occurred')
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        await User.findByIdAndDelete(userId)
        res.redirect('/admin/users')
    } catch (e) {
        console.log(e)
        res.send('An error has occurred')
    }
}

exports.matches = async (req, res) => {
    try {
        let view = { pageName: 'Matches' }

        view.ProconMap = []
        const proconMapDir = path.join(__dirname, '../procon-map')
        const mapNames = fs.readdirSync(proconMapDir)

        mapNames.forEach(async (mapName) => {
            let jsonMap = JSON.parse(fs.readFileSync(path.join(proconMapDir, mapName)))
            jsonMap.name = mapName
            view.ProconMap.push(jsonMap)
        })
        
        view.users = await User.find()
        res.render('admin/matches', { view })
    } catch (e) {
        console.log(e)
        res.send('An error has occurred')
    }
}
