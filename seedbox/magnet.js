const TorrentSearchApi = require('torrent-search-api');
const { npmaddTorrent } = require('./node-torrent');
const { addTorrent, getTransmissionStats } = require('./transmission');
const getIP = require('external-ip');
 


var magnets = [];


async function getMagnets(data) {
    console.log('Starting magnet fetch');
    getTransmissionStats();
    
    getIP((err, ip) => {
        if (err) {
            // every service in the list has failed
            throw err;
        }
        console.log(ip);
    });

    try {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            var magnet = await TorrentSearchApi.getMagnet(data[i]);
            // Call client and push to magnets array
            await addTorrent(magnet);
            //npmaddTorrent(magnet);
            magnets.push(magnet);
        }

        getTransmissionStats();

        return magnets;
    } catch (error) {
        error = {"error": "error"}
        return error;
    }
}

module.exports = { getMagnets };

