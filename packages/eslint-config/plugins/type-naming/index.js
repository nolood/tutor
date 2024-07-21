const fs = require("fs")
const path = require("path")

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8"));

module.exports = {
  meta: {
    name: pkg.name,
    version: pkg.version,
    type: 'suggestion',
    docs: {
      description: 'Enforce naming convention for types, interfaces, and enums',
      category: 'Stylistic Issues',
      recommended: false
    },
  },
  rules: {
    'type-naming': {
      create(context) {
        return {
          TSTypeAliasDeclaration(node) {
          if (!node.id.name.endsWith('Type')) {
            context.report({
              node: node,
              message: 'Type alias names should end with "Type".'
            });
          }
        }
        }
      }
    }
  }
};
