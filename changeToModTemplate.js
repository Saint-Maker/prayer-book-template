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

// // remove unused directories
// fs.rmdirSync(`${__dirname}/src/utils/habits`, { recursive: true, force: true });
// fs.rmdirSync(`${__dirname}/src/tests/utils`, { recursive: true, force: true });
// fs.rmdirSync(`${__dirname}/src/styles`, { recursive: true, force: true });
// fs.rmdirSync(`${__dirname}/src/mods`, { recursive: true, force: true });

// // remove unused files
// fs.unlinkSync(`${__dirname}/src/defaultPrayerData.json`)
// fs.unlinkSync(`${__dirname}/src/defaultModData.json`)
// fs.unlinkSync(`${__dirname}/src/index.d.ts`)
// fs.unlinkSync(`${__dirname}/pull_request_template.md`)
// fs.unlinkSync(`${__dirname}/generateDefaultModList.js`)
// fs.unlinkSync(`${__dirname}/generateModTemplate.js`)

// // remove files from partially used directories
// pruneDirectory(`${__dirname}/src/redux/slice`, ['index.ts', 'utils'])
// pruneDirectory(`${__dirname}/src/pages`, ['App.tsx'])
// pruneDirectory(`${__dirname}/src/constants`, ['routes.tsx'])
// pruneDirectory(`${__dirname}/src/components`, ['Layout.tsx', 'Header.tsx'])

// // edit default files

// fs.writeFileSync(`${__dirname}/src/redux/slice/index.ts`,'export const slices = {}',{encoding:'utf8'})
// fs.writeFileSync(`${__dirname}/src/redux/store.ts`,`
//     import { configureStore } from '@reduxjs/toolkit'

//     import { slices } from './slice'

//     export const store = configureStore({
//         reducer: slices,
//     })

//     // type RootState = ReturnType<typeof store.getState>

//     export type AppDispatch = typeof store.dispatch
// `,{encoding:'utf8'})

// fs.writeFileSync(`${__dirname}/src/pages/App.tsx`,`
// import { Heading } from '@chakra-ui/react'

// import { Layout } from '~components/Layout'

// export const App = (): JSX.Element => {
//     return (
//         <Layout>
//             <Header title="Mod Template">
//         </Layout>
//     )
// }
// `,{encoding:'utf8'})

// fs.writeFileSync(
//     `${__dirname}/src/constants/routes.tsx`,
//     `
//     import { App } from '~pages/App'

//     export const routes = [
//         {
//             name: 'Home',
//             path: '/',
//             destination: <App />,
//         },
//     ]
// `,
//     { encoding: 'utf8' },
// )

// fs.writeFileSync(`${__dirname}/src/components/Header.tsx`,`
// import {
//     HStack,
//     IconButton,
//     Heading,
//     Box,
// } from '@chakra-ui/react'
// import { ReactElement } from 'react'
// import { BsArrowLeft } from 'react-icons/bs'
// import { useNavigate } from 'react-router-dom'

// type Props = {
//     title: string
//     headerBtns?: ReactElement
// }

// export const Header = ({ title, headerBtns }: Props) => {
//     const navigate = useNavigate()

//     return (
//             <HStack justifyContent="space-between">
//                 <>
//                     <Box flex="1">
//                         <IconButton onClick={() => navigate(-1)} aria-label="Menu" icon={<BsArrowLeft />} />
//                     </Box>
//                     <Box flex="1" textAlign="center">
//                         <Heading as="h1">{title}</Heading>
//                     </Box>
//                     <Box flex="1" textAlign="right">
//                         {headerBtns}
//                     </Box>
//                 </>
//             </HStack>
//     )
// }
// `,{encoding:'utf8'})

// fs.writeFileSync(`${__dirname}/README.md`,`
// # New SaintMaker Mod

// <details><summary>Description</summary>
// <p>

// The description of your new mod.

// </p>
// </details>
// `,{encoding:'utf8'})

// fs.writeFileSync(`${__dirname}/.folderslintrc`,`
// {
//     "root": "src",
//     "rules": [
//       "components/*",
//       "constants",
//       "mods",
//       "pages/*",
//       "redux",
//       "redux/slice",
//       "redux/slice/utils",
//       "tests",
//       "utils",
//     ]
// }
// `,{encoding:'utf8'})

// fs.writeFileSync(`${__dirname}/tsconfig.json`,`something`,{encoding:'utf8'})
// fs.writeFileSync(`${__dirname}/package.json`,`something`,{encoding:'utf8'})

// rerun yarn install to update packages
// remove changeToModTemplate file
