const { nanoid } = require('nanoid')

const fs = require('fs')

const modName = process.argv[2] || 'NewMod'
const modMaker = process.argv[3] || 'NewModMaker'
const json = {
    id: nanoid(16),
    name: modName,
    issuesPageLink: 'https://github.../issues/new',
    path: 'https://something.com',
    description: 'A description',
    isNative: false,
}
const fileName = `${modName}_${modMaker}.json`
fs.writeFile(`./src/mods/${fileName}`, JSON.stringify(json), (err) => {
    if (!err) console.log(`Created ${fileName} file in src/mods`)
})
