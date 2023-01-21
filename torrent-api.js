const TorrentSearchApi = require('torrent-search-api');

TorrentSearchApi.enableProvider('Torrent9');

// Search '1080' in 'Movies' category and limit to 20 results
export default async function getResults(query) {

    const torrents = await TorrentSearchApi.search(query, 'Movies', 20);
    return torrents;

}