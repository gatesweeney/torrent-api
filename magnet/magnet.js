const TorrentSearchApi = require('torrent-search-api');
var magnets = [];


async function getMagnets(data) {
    console.log('Starting magnet fetch');

    try {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            var magnet = await TorrentSearchApi.getMagnet(data[i]);
            magnets.push(magnet);
        }
        return magnets;
    } catch (error) {
        error = {"error": "error"}
        return error;
    }
}

module.exports = { getMagnets };

