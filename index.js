const path = require("path");
const cwd = process.cwd();
const downloadImage = require("./lib/download");
const data = require("./data.json");
let downloaded = 0;
const outDir = path.join(cwd, "output");
require("./lib/prep")(outDir);
console.log("🚀 Launching image downloader");



// Begin Editable Content

const totalDownloads = data.length;

// End Editable Content



console.log(`💾 Batch downloading ${totalDownloads} images`);
for (let i = 0; i < totalDownloads; i++){



    // Begin Editable Content

    const url = data[i].productImage;
    const fileName = data[i].productId;

    // End Editable Content


    
    if (url){
        const imageType = data[i].productImage.match(/(\..{1,4})$/)[0];
        downloadImage(url, path.join(outDir, `${fileName}${imageType}`))
        .then(()=>{
            downloaded++;
            console.log(`✔️  Downloaded ${fileName}${imageType} (${downloaded} of ${totalDownloads})`);
            if (downloaded === totalDownloads){
                console.log("✔️  Downloads completed");
                process.exit(0);
            }
        })
        .catch((e)=>{
            console.log(e);
            process.exit(1);
        })
    }else{
        downloaded++;
        console.log(`❌ Missing URL for ${fileName} (${downloaded} of ${totalDownloads})`);
        if (downloaded === totalDownloads){
            console.log("✔️  Downloads completed");
            process.exit(0);
        }
    }
}