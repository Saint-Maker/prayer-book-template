const fs = require('fs')
const path = require('path')

const dir = './src/mods'

function init() {
    return fs
        .readdirSync(dir)
        .filter((name) => path.extname(name) === '.json')
        .map((name) => require(`./${path.join(dir, name)}`))
}

fs.writeFile('./src/defaultModData.json', JSON.stringify(init()), function (err) {
    if (err) throw err
    console.log('default mod list complete')
})
