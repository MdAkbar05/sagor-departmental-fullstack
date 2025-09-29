const axios = require("axios");
const fs = require("fs");

async function downloadImage(imageUrl, savePath) {
  const writer = fs.createWriteStream(savePath);

  const response = await axios({
    url: imageUrl,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

module.exports = downloadImage;
