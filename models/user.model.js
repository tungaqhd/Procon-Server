const config = require('../config/config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

userSchema.methods.generateToken = async function() {
    const token = jwt.sign({id: this._id.toString()}, config.JWT, {expiresIn: '1h'})
    await this.save()
    this.token = token
}

userSchema.statics.login = async (username, password) => {
    let user = await User.findOne({username})
    if(!user || user.password != password) {
        return false
    }
    user.token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, config.JWT)
    await user.save()
    return {
        id: user._id,
        token: user.token,
        isAdmin: user.isAdmin
    }

}
const User = mongoose.model('User', userSchema)
module.exports = User