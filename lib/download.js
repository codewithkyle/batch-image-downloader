const axios = require('axios');
const fs = require('fs');

function downloadImage(url, path) {
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

module.exports = downloadImage;