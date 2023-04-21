const fs = require('fs')
const path = require('path')

const pruneDirectory = (directory, ignored) => {
    fs.readdir(directory, (err, files) => {
        if (err) throw err

        for (const file of files) {
            if (ignored.includes(file)) continue
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err
            })
        }
    })
}

// remove unused directories

// console.log(`${__dirname}/src/utils/habits`)
// fs.rmdirSync(`${__dirname}/src/utils/habits`, { recursive: true, force: true });
// fs.rmdirSync(`${__dirname}/src/tests/utils`, { recursive: true, force: true });
// fs.rmdirSync(`${__dirname}/src/styles`, { recursive: true, force: true });
// fs.rmdirSync(`${__dirname}/src/mods`, { recursive: true, force: true });

// remove unused files

// fs.unlinkSync(`${__dirname}/src/defaultPrayerData.json`)
// fs.unlinkSync(`${__dirname}/src/defaultModData.json`)
// fs.unlinkSync(`${__dirname}/pull_request_template.md`)
// fs.unlinkSync(`${__dirname}/generateDefaultModList.js`)
// fs.unlinkSync(`${__dirname}/generateModTemplate.js`)

// remove files from partially used directories

// pruneDirectory(`${__dirname}/src/redux/slice`, ['index.ts'])
// pruneDirectory(`${__dirname}/src/pages`, ['App.tsx'])
// pruneDirectory(`${__dirname}/src/constants`, ['routes.tsx'])
// pruneDirectory(`${__dirname}/src/components`, ['Layout.tsx', 'Header.tsx'])

// edit default files

// edit src/redux/slice/index.ts
// edit src/redux/store.ts
// edit src/pages/App.tsx
// edit src/constants/routes.tsx
// edit src/components/Header.tsx
// edit the readme to prune everything but the description
// edit index.d.ts
// edit folderslintrc
// edit tsconfig to remove unused aliases
// edit package.json to remove unused scripts and packages

// rerun yarn install to update packages

// remove changeToModTemplate file
