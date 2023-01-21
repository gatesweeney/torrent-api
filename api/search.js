const params = require('./getParams');
const TorrentSearchApi = require('torrent-search-api');


TorrentSearchApi.enablePublicProviders();
TorrentSearchApi.disableProvider('Torrent9');

async function torrent(url) {
    //What to search
    var query;
    // Category to search
    var cat;
    // Max number of listings
    var limit;

    try {
      query = await params.getAllUrlParams(url).search;
      cat = await params.getAllUrlParams(url).category;
      limit = await params.getAllUrlParams(url).limit;
    } catch (error) {
      // Set defaults to prevent crashing
      query = 'default';
      cat = 'Movies';
      limit = '1';
    }

    // Convert and remove %20's, basically
    query = decodeURI(query);
    console.log(query);

    var results;
    
    try {
      results = await TorrentSearchApi.search(query, cat, limit);
    } catch (error) {
      results = [{title: 'failed'}]
    }

    var json = JSON.stringify(results);

    var content = `<pre style="word-wrap: break-word; white-space: pre-wrap;">${json}</pre>`;

    return content;
}

module.exports = { torrent };