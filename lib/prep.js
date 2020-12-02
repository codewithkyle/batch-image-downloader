const fs = require('fs');

module.exports = (outDir) => {
    // Prep output directory
    if (fs.existsSync(outDir)){
        console.log("🗑️  Removing stale images")
        fs.rmdirSync(outDir, { recursive: true });
        console.log("✔️  Removed stale images")
    }
    fs.mkdirSync(outDir);
    console.log(`✔️  Created output directory`);
}