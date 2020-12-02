const fs = require('fs');
const axios = require('axios');
const path = require("path");
const cwd = process.cwd();

function downloadImage(url, path){
    return new Promise((resolve, reject) => {
        axios({
            url,
            responseType: 'stream',
          }).then(
            response =>
              new Promise((resolve, reject) => {
                response.data
                  .pipe(fs.createWriteStream(path))
                  .on('finish', () => resolve())
                  .on('error', e => reject(e));
              })
              .then(()=>{
                  resolve();
              })
              .catch((e) => {
                  reject(e);
              })
          );
    });
}

console.log("Beginning image downloader");

// Prep output directory
const outDir = path.join(cwd, "output");
if (fs.existsSync(outDir)){
    console.log("🗑️  Removing stale images")
    fs.rmdirSync(outDir, { recursive: true });
    console.log("✔️  Removed stale images")
}
fs.mkdirSync(outDir);
console.log(`✔️  Created output directory`);

const data = require("./data.json");
let downloaded = 0;



// Begin Editable Content

const totalDownloads = data.length;

// End Editable Content



console.log(`Beginning batched downloading for ${totalDownloads} images`);
for (let i = 0; i < totalDownloads; i++){



    // Begin Editable Content

    const url = data[i].productImage;
    const fileName = data[i].productId;

    // End Editable Content


    
    if (url){
        const imageType = data[i].productImage.match(/(\..{1,4})$/)[0];
        downloadImage(url, path.join(outDir, `${fileName}${imageType}`))
        .then(()=>{
            console.log(`✔️  Downloaded ${fileName}${imageType} (${downloaded} of ${totalDownloads})`);
            downloaded++;
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
            console.log("Successfully download images");
            process.exit(0);
        }
    }
}