const fs = require("fs")
const path = require("path")
const glob = require("glob")

// Find all TypeScript and TSX files in the project
const files = glob.sync("**/*.{ts,tsx}", {
  ignore: ["node_modules/**", "dist/**", ".next/**", "scripts/**", "components/ui/sidebar-fix.tsx"],
})

// Regular expressions to match different sidebar import patterns
const patterns = [
  {
    regex: /import\s+\{([^}]*)\}\s+from\s+['"]@\/components\/ui\/sidebar['"]/g,
    replacement: 'import {$1} from "@/components/ui/sidebar-fix"',
  },
  {
    regex: /import\s+\{([^}]*)\}\s+from\s+['"]\.\.\/components\/ui\/sidebar['"]/g,
    replacement: 'import {$1} from "../components/ui/sidebar-fix"',
  },
  {
    regex: /import\s+\{([^}]*)\}\s+from\s+['"]\.\.\/\.\.\/components\/ui\/sidebar['"]/g,
    replacement: 'import {$1} from "../../components/ui/sidebar-fix"',
  },
  {
    regex: /import\s+\{([^}]*)\}\s+from\s+['"]\.\.\/\.\.\/\.\.\/components\/ui\/sidebar['"]/g,
    replacement: 'import {$1} from "../../../components/ui/sidebar-fix"',
  },
]

let modifiedFiles = 0

files.forEach((file) => {
  const filePath = path.resolve(file)
  const content = fs.readFileSync(filePath, "utf8")

  let newContent = content
  let modified = false

  patterns.forEach(({ regex, replacement }) => {
    if (regex.test(content)) {
      newContent = newContent.replace(regex, replacement)
      modified = true
    }
  })

  if (modified) {
    fs.writeFileSync(filePath, newContent, "utf8")
    console.log(`Updated imports in ${file}`)
    modifiedFiles++
  }
})

console.log(`Modified ${modifiedFiles} files.`)
