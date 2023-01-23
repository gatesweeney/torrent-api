var Client = require('node-torrent');
var client = new Client({logLevel: 'DEBUG'});


async function addTorrent(magnet) {
    var torrent = client.addTorrent(magnet);
 
    // when the torrent completes, move it's files to another area
    torrent.on('complete', function() {
        console.log('complete!');
        torrent.files.forEach(function(file) {
            var newPath = '/new/path/' + file.path;
            fs.rename(file.path, newPath);
            // while still seeding need to make sure file.path points to the right place
            file.path = newPath;
        });
    });

}

module.exports = { addTorrent };