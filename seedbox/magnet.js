const TorrentSearchApi = require('torrent-search-api');
const { addTorrent } = require('./node-torrent');


var magnets = [];


async function getMagnets(data) {
    console.log('Starting magnet fetch');

    try {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            var magnet = await TorrentSearchApi.getMagnet(data[i]);
            // Call client and push to magnets array
            addTorrent(magnet);
            magnets.push(magnet);
        }

        return magnets;
    } catch (error) {
        error = {"error": "error"}
        return error;
    }
}

module.exports = { getMagnets };

