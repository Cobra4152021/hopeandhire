const fs = require("fs")
const path = require("path")

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const issues = []

  // Check for grid without grid-cols
  const gridMatches = content.match(/className="[^"]*grid[^"]*"/g)
  if (gridMatches) {
    gridMatches.forEach((match) => {
      if (!match.includes("grid-cols-")) {
        issues.push({
          file: filePath,
          issue: "Grid class without grid-cols",
          line: match,
          suggestion: "Add grid-cols-1, grid-cols-2, etc.",
        })
      }
    })
  }

  // Check for missing responsive classes
  const responsiveGridMatches = content.match(/grid-cols-\d+/g)
  if (responsiveGridMatches) {
    responsiveGridMatches.forEach((match) => {
      const hasResponsive = content.includes(`md:${match}`) || content.includes(`lg:${match}`)
      if (!hasResponsive) {
        issues.push({
          file: filePath,
          issue: "Grid without responsive classes",
          line: match,
          suggestion: "Add md:grid-cols-* or lg:grid-cols-* for responsive design",
        })
      }
    })
  }

  // Check for display: block overrides
  if (content.includes("block") && content.includes("grid")) {
    issues.push({
      file: filePath,
      issue: "Potential conflict between block and grid classes",
      suggestion: "Remove block class when using grid",
    })
  }

  return issues
}

function scanDirectory(dir) {
  const allIssues = []

  function scanRecursive(currentDir) {
    const items = fs.readdirSync(currentDir)

    items.forEach((item) => {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory() && !item.startsWith(".") && item !== "node_modules") {
        scanRecursive(fullPath)
      } else if (item.endsWith(".tsx") || item.endsWith(".jsx")) {
        const issues = checkFile(fullPath)
        allIssues.push(...issues)
      }
    })
  }

  scanRecursive(dir)
  return allIssues
}

// Run the check
const projectRoot = process.cwd()
const issues = scanDirectory(projectRoot)

if (issues.length === 0) {
  console.log("✅ No layout issues found!")
} else {
  console.log(`❌ Found ${issues.length} potential layout issues:`)
  issues.forEach((issue, index) => {
    console.log(`\n${index + 1}. ${issue.file}`)
    console.log(`   Issue: ${issue.issue}`)
    console.log(`   Suggestion: ${issue.suggestion}`)
    if (issue.line) {
      console.log(`   Code: ${issue.line}`)
    }
  })
}
