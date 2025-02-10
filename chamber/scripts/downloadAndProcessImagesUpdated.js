const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const places = [
    {
        "name": "National War Museum",
        "photoURL": "https://outravelandtour.com/wp-content/uploads/2018/08/IMG_20180810_112205.jpg"
    },
    {
        "name": "Ariaria International Market",
        "photoURL": "https://www.legit.ng/people/1442192-history-aba-market-biggest-markets-africa-started/"
    },
    {
        "name": "Azumini Blue River",
        "photoURL": "https://newsblenda.com/wp-content/uploads/2021/01/azumini-blue-river.jpg"
    },
    {
        "name": "Arochukwu Long Juju Slave Route",
        "photoURL": "https://olatorera.com/wp-content/uploads/2019/01/IMG_20190110_105512.jpg"
    },
    {
        "name": "Museum of Colonial History",
        "photoURL": "https://www.hellotravel.com/content/images/attr/Edinburgh-Castle_1442568771e11.jpg"
    },
    {
        "name": "Ngodo Cave and Waterfall",
        "photoURL": "https://www.guidetrip.info/images/1077/Goa-Raja-Waterfall.jpg"
    },
    {
        "name": "Abia State Yam Festival",
        "photoURL": "https://i.ytimg.com/vi/4l3fL3CYbkk/hqdefault.jpg"
    },
    {
        "name": "Umudike Forest Reserve",
        "photoURL": "https://www.salon.com/wp-content/uploads/2022/09/0907news-dam-plant.jpg"
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
