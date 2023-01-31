const path = require("path")
const getBaseUrl = require('./utils/getBaseUrl')

module.exports = {
    meta: {
      fixable: "code"
    },
    create({ options, report, getFilename }) {
        const baseUrl = getBaseUrl()
        return {
          ImportDeclaration(node) {
            const importSource = node.source.value
            if (importSource.startsWith(".")) {
              // get the absolute path of the file being linted
              const filename = getFilename()
              const absoluteImportPath = path.normalize(
                path.join(path.dirname(filename), importSource)
              )
              const expectedPath = path.relative(baseUrl, absoluteImportPath).replaceAll('\\', '/')
              let newPath = expectedPath
              const ruleOptions = options[0] || {}
              const { deprecatedPaths = [], newPaths = [] } = ruleOptions
              const noNewPath = deprecatedPaths.every((depPath, index) => {
                if (expectedPath.includes(depPath)) {
                  newPath = newPath.replace(depPath, newPaths[index])
                  return false
                }
                return true
              })
              if (noNewPath) return

              report({
                node,
                message: `Relative imports are not allowed. Use path alias\' instead.`,
                fix: function(fixer) {
                  return fixer.replaceText(node.source, `'${newPath}'`)
                }
              })
            }
          }
        }
      }
  }