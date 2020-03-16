require('./config/database')
const path = require('path')
const fs = require('fs')
const User = require('./models/user.model')
const ProconMap = require('./models/ProconMap.model')

const createAdmin = async () => {
    const admin = User({
        username: 'admin',
        password: 'adminHIT',
        teamName: 'HIT Club',
        isAdmin: true
    })

    await admin.save()
}

const importMap = async() => {
    let proconMapDir = path.join(__dirname, './procon-map')
    const mapNames = fs.readdirSync(proconMapDir)

    mapNames.forEach(async(mapName) => {
        const jsonMap = fs.readFileSync(path.join(proconMapDir, mapName))
        await ProconMap({jsonMap}).save()
    })
}

createAdmin()