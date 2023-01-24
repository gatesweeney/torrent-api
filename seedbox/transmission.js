var Transmission = require('transmission');
var transmission = new Transmission({
    port: 9091,			// DEFAULT : 9091
    host: '127.0.0.1',			// DEAFULT : 127.0.0.1
    username: 'transmission',	// DEFAULT : BLANK
    password: 'transmission'	// DEFAULT : BLANK
});

function addTorrent(url){
    transmission.addUrl(url, {
        //"download-dir" : __basedir + "/downloads"
    }, function(err, result) {
        if (err) {
            return console.log(err);
        }
        var id = result.id;
        console.log('Just added a new torrent.');
        console.log('Torrent ID: ' + id);
    });
}

// Get details of all torrents currently queued in transmission app
function getTransmissionStats(){
    transmission.sessionStats(function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

module.exports = { getTransmissionStats, addTorrent };