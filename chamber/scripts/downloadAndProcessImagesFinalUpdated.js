const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const places = [
    // Only keeping the successfully downloaded images
    {
        "name": "Abia State Yam Festival",
        "photoURL": "https://i.ytimg.com/vi/4l3fL3CYbkk/hqdefault.jpg"
    },
    {
        "name": "Ojukwu Bunker",
        "photoURL": "https://i.ytimg.com/vi/QeSgTOA7SUE/hqdefault.jpg"
    },
    {
        "name": "Savor Local Cuisine",
        "photoURL": "https://www.anaedoonline.ng/wp-content/uploads/2021/05/Abacha.jpg"
    }
];

const downloadAndProcessImage = async (url, name) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        await sharp(imageBuffer)
            .resize(800, 600)
            .toFile(path.join(__dirname, '../images', `${name}.webp`));
        console.log(`Downloaded and processed: ${name}.webp`);
    } catch (error) {
        console.error(`Failed to download or process image for ${name}: ${error.message}`);
    }
};

const processImages = async () => {
    for (const place of places) {
        const name = place.name.replace(/\s+/g, '_').toLowerCase();
        await downloadAndProcessImage(place.photoURL, name);
    }
};

processImages().catch(err => console.error(err));
