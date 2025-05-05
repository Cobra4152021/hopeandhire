const fs = require("fs")
const path = require("path")
const glob = require("glob")

// Find all TypeScript and TSX files in the project
const files = glob.sync("**/*.{ts,tsx}", {
  ignore: ["node_modules/**", "dist/**", ".next/**", "scripts/**"],
})

// Regular expression to match imports from @/components/ui/sidebar
const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]@\/components\/ui\/sidebar['"]/g

// Replace with imports from our patched version
const replacementImport = 'import {$1} from "@/components/ui/patched-sidebar"'

let modifiedFiles = 0

files.forEach((file) => {
  const filePath = path.resolve(file)
  const content = fs.readFileSync(filePath, "utf8")

  // Check if the file imports from @/components/ui/sidebar
  if (importRegex.test(content)) {
    // Replace the import
    const newContent = content.replace(importRegex, replacementImport)

    // Write the modified content back to the file
    fs.writeFileSync(filePath, newContent, "utf8")

    console.log(`Updated imports in ${file}`)
    modifiedFiles++
  }
})

console.log(`Modified ${modifiedFiles} files.`)
