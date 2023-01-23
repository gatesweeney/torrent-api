import WebTorrent from "webtorrent";

const opts = {
    maxConns: 300,        // Max number of connections per torrent (default=55)
    webSeeds: false,       // Enable BEP19 web seeds (default=true)
  }

const client = new WebTorrent()


export default async function dlTorrent(array) {

    console.log('DL TORRENTS\n', array)

    for (let i = 0; i < array.length; i++) {
        const magnetURI = array[i];

        client.add(magnetURI, torrent => async function() {
            // Got torrent metadata!
            console.log('Client is downloading:', torrent.infoHash)
            
            let status = torrent.done;

            while (!status) {
                console.log(torrent.progress);
                if (torrent.done) status = true;
            }

            


            for (const file of torrent.files) {
                document.body.append(file.name)
            }
        })


    }




}

async function getSpeeds() {
    var dl = client.downloadSpeed;
    var ul = client.uploadSpeed;
    var progress = client.progress;


    return [dl, ul, progress]
}