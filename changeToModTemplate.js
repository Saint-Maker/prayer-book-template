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
fs.rmdirSync(`${__dirname}/src/utils/habits`, { recursive: true, force: true })
fs.rmdirSync(`${__dirname}/src/tests/utils`, { recursive: true, force: true })
fs.rmdirSync(`${__dirname}/src/styles`, { recursive: true, force: true })
fs.rmdirSync(`${__dirname}/src/mods`, { recursive: true, force: true })
fs.rmdirSync(`${__dirname}/src/hooks`, { recursive: true, force: true })

// remove unused files
fs.unlinkSync(`${__dirname}/src/defaultPrayerData.json`)
try {
    fs.unlinkSync(`${__dirname}/src/defaultModData.json`)
} catch (e) {
    console.log('defaultModData has not been generated')
}
fs.unlinkSync(`${__dirname}/src/index.d.ts`)
fs.unlinkSync(`${__dirname}/pull_request_template.md`)
fs.unlinkSync(`${__dirname}/generateDefaultModList.js`)
fs.unlinkSync(`${__dirname}/generateModTemplate.js`)

// remove files from partially used directories
pruneDirectory(`${__dirname}/src/redux/slice`, ['index.ts', 'utils'])
pruneDirectory(`${__dirname}/src/pages`, ['App.tsx'])
pruneDirectory(`${__dirname}/src/constants`, ['routes.tsx'])
pruneDirectory(`${__dirname}/src/components`, ['Header.tsx'])

// edit default files

fs.writeFileSync(`${__dirname}/src/redux/slice/index.ts`, 'export const slices = {}', { encoding: 'utf8' })
fs.writeFileSync(
    `${__dirname}/src/redux/store.ts`,
    `
    import { configureStore } from '@reduxjs/toolkit'

    import { slices } from './slice'

    export const store = configureStore({
        reducer: slices,
    })

    // type RootState = ReturnType<typeof store.getState>

    export type AppDispatch = typeof store.dispatch
`,
    { encoding: 'utf8' },
)

fs.writeFileSync(
    `${__dirname}/src/pages/App.tsx`,
    `
import { Box } from '@chakra-ui/react'
import { Header } from '~components/Header'

export const App = (): JSX.Element => {
    return (
        <Box p="2">
            <Header title="Mod Template" />
        </Box>
    )
}
    
`,
    { encoding: 'utf8' },
)

fs.writeFileSync(
    `${__dirname}/src/constants/routes.tsx`,
    `
    import { App } from '~pages/App'

    export const routes = [
        {
            name: 'Home',
            path: '/',
            destination: <App />,
        },
    ]
`,
    { encoding: 'utf8' },
)

fs.writeFileSync(
    `${__dirname}/src/components/Header.tsx`,
    `
import {
    HStack,
    IconButton,
    Heading,
    Box,
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

type Props = {
    title: string
    headerBtns?: ReactElement
}

export const Header = ({ title, headerBtns }: Props) => {
    const navigate = useNavigate()

    return (
            <HStack justifyContent="space-between">
                <>
                    <Box flex="1">
                        <IconButton onClick={() => navigate(-1)} aria-label="Menu" icon={<BsArrowLeft />} />
                    </Box>
                    <Box flex="1" textAlign="center">
                        <Heading as="h1">{title}</Heading>
                    </Box>
                    <Box flex="1" textAlign="right">
                        {headerBtns}
                    </Box>
                </>
            </HStack>
    )
}
`,
    { encoding: 'utf8' },
)

fs.writeFileSync(
    `${__dirname}/README.md`,
    `
# New SaintMaker Mod

<details><summary>Description</summary>
<p>

The description of your new mod.

</p>
</details>
`,
    { encoding: 'utf8' },
)

fs.writeFileSync(
    `${__dirname}/.folderslintrc`,
    `
{
    "root": "src",
    "rules": [
      "components/*",
      "constants",
      "mods",
      "pages/*",
      "redux",
      "redux/slice",
      "redux/slice/utils",
      "tests",
      "utils"
    ]
}
`,
    { encoding: 'utf8' },
)

fs.writeFileSync(
    `${__dirname}/package.json`,
    `
{
    "name": "mod-template",
    "private": true,
    "version": "0.0.0",
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview",
      "https-preview": "serve dist",
      "predeploy": "yarn build",
      "deploy": "gh-pages -d build",
      "test": "vitest --reporter verbose",
      "coverage": "vitest --coverage --passWithNoTests",
      "format": "prettier --config=./prettierrc.json --write .",
      "lint": "eslint . --ext .ts,.tsx --fix",
      "folderslint": "folderslint",
      "prepare": "husky install",
      "dry-test": "jscpd ./src --threshold=0",
      "generate-dry-report": "jscpd ./src --reporters=html"
    },
    "dependencies": {
      "@chakra-ui/react": "^2.2.1",
      "@emotion/react": "^11",
      "@emotion/styled": "^11",
      "@reduxjs/toolkit": "^1.9.3",
      "framer-motion": "^6",
      "localforage": "^1.10.0",
      "react": "^18.0.0",
      "react-dom": "^18.0.0",
      "react-icons": "^4.4.0",
      "react-redux": "^8.0.5",
      "react-router-dom": "6"
    },
    "devDependencies": {
      "@types/dompurify": "^2.4.0",
      "@types/react": "^18.0.0",
      "@types/react-dom": "^18.0.0",
      "@typescript-eslint/eslint-plugin": "^5.28.0",
      "@typescript-eslint/parser": "^5.28.0",
      "@vitejs/plugin-react": "^1.3.0",
      "@vitest/coverage-c8": "^0.28.4",
      "@vitest/coverage-istanbul": "^0.28.4",
      "eslint": ">=5.16.0",
      "eslint-config-google": "^0.14.0",
      "eslint-config-prettier": "^8.6.0",
      "eslint-import-resolver-typescript": "^3.5.3",
      "eslint-plugin-check-file": "^1.3.1",
      "eslint-plugin-custom-rules": "file:./custom-rules",
      "eslint-plugin-etc": "^2.0.2",
      "eslint-plugin-import": "^2.27.5",
      "eslint-plugin-no-inline-styles": "^1.0.5",
      "eslint-plugin-react": "^7.30.0",
      "eslint-plugin-unused-imports": "^2.0.0",
      "folderslint": "^1.2.0",
      "https-localhost": "^4.7.1",
      "husky": "^8.0.3",
      "jscpd": "^3.5.3",
      "jsdom": "^21.1.1",
      "lint-staged": "^13.1.0",
      "prettier": "2.8.3",
      "typescript": "^4.6.3",
      "unimported": "^1.24.0",
      "vite": "^2.9.9",
      "vite-plugin-pwa": "^0.12.0",
      "vitest": "^0.26.3"
    }
  }
`,
    { encoding: 'utf8' },
)

// remove changeToModTemplate file
