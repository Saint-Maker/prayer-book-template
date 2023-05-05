/* eslint-disable no-console */
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

const unusedDirectories = ['/src/styles', '/src/mods', '/src/hooks']
const unusedFiles = [
    '/src/defaultPrayerData.json',
    '/src/defaultModData.json',
    '/src/index.d.ts',
    '/pull_request_template.md',
    '/generateDefaultModList.js',
    '/generateModTemplate.js',
]
const prunedDirectories = [
    {
        path: '/src/redux/slice',
        ignore: ['index.ts', 'utils'],
    },
    {
        path: '/src/pages',
        ignore: ['App.tsx'],
    },
    {
        path: '/src/constants',
        ignore: ['routes.tsx'],
    },
    {
        path: '/src/components',
        ignore: ['Header.tsx'],
    },
]

unusedDirectories.forEach((path) => {
    try {
        fs.rmdirSync(`${__dirname}${path}`, { recursive: true, force: true })
    } catch (e) {
        console.log(`${path} could not be removed`)
    }
})

unusedFiles.forEach((path) => {
    try {
        fs.unlinkSync(`${__dirname}${path}`)
    } catch (e) {
        console.log(`${path} could not be removed`)
    }
})

prunedDirectories.forEach(({ path, ignore }) => {
    try {
        pruneDirectory(`${__dirname}${path}`, ignore)
    } catch (e) {
        console.log(`${path} could not be pruned`)
    }
})

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

    type RootState = ReturnType<typeof store.getState>

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
            <Header title="Mod Template">
                <></>
            </Header>
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
    useDisclosure,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useColorMode,
    Box,
    Flex,
} from '@chakra-ui/react'
import { ReactElement, ReactNode, useRef } from 'react'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'



type Props = {
    children: unknown
    title: string
    headerBtns?: ReactElement
    drawerBtns?: ReactNode
}

export const Header = ({ children, title, headerBtns, drawerBtns }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { colorMode, toggleColorMode } = useColorMode()
    const btnRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate()

    return (
        <>
            <HStack justifyContent="space-between">
                <>
                    <Box flex="1">
                        <IconButton onClick={onOpen} ref={btnRef} aria-label="Menu" icon={<AiOutlineMenu />} />
                    </Box>
                    <Box flex="1" textAlign="center">
                        <Heading as="h1">{title}</Heading>
                    </Box>
                    <Box flex="1" textAlign="right">
                        {headerBtns}
                    </Box>
                </>
            </HStack>
            {children}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody display="flex">
                        <Flex display="flex" direction="column" gap="2" width="100%">
                            <Button
                                    onClick={() => navigate(-1)} 
                                w="full"
                                leftIcon={<AiFillHome />}
                                justifyContent="flex-start"
                            >
                                Home
                            </Button>
                            <Button
                                onClick={toggleColorMode}
                                w="full"
                                leftIcon={colorMode === 'light' ? <BsMoonFill /> : <BsSunFill />}
                                justifyContent="flex-start"
                            >
                                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                            </Button>
                            {drawerBtns}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
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
    `${__dirname}/.unimportedrc.json`,
    `
{
    "ignoreUnresolved": ["virtual:pwa-register"],
    "ignoreUnimported": ["src/test-globals.ts", "src/redux/slice/utils/sliceTools.ts", "src/utils/downloadData.ts", "src/utils/idb.ts", "src/utils/localStorage.ts", "src/utils/uploadData.ts"],
    "ignoreUnused": ["localforage"]
}
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
