# Batch Image Downloader

Batch download images from JSON files using NodeJS.

## Usage

1. Get started by cloning or downloading this repository.
1. Create a `data.json` file within the projects root directory.
1. Open the `index.js` file
1. Modify the variables within the `//Editable Content` comments
1. Run the download command `npm run download`

## Demo of data.json
```json
{
  "${your-picture-name}": "${your-picture-link}",
}
```

## Demo of editable code
```javascript
const getDownloadItem = (key) => {
    return {
        productImage: data[key],
        productId: key
    }
}
const downloadArray = Object.keys(data).map(getDownloadItem);
const totalDownloads = downloadArray.length;
```
