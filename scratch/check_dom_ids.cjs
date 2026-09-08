const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");

function checkFile(path) {
  const code = fs.readFileSync(path, "utf8");
  const regex = /document\.getElementById\(['"`]([^'"`]+)['"`]\)/g;
  let match;
  const missing = new Set();
  while ((match = regex.exec(code)) !== null) {
    const id = match[1];
    if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) {
      missing.add(id);
    }
  }
  return Array.from(missing);
}

console.log("Missing in app.js:", checkFile("src/app.js"));
console.log("Missing in ui.js:", checkFile("src/ui.js"));
console.log("Missing in bughunt.js:", checkFile("src/bughunt.js"));
console.log("Missing in monetization.js:", checkFile("src/monetization.js"));
console.log("Missing in streak.js:", checkFile("src/streak.js"));
