const search = require('./api/search');

const express = require('express')
const app = express()


//const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

/*
const server = http.createServer( async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'json');
  res.end(await App(req.url));
});
*/

app.get('/api/', async (req, res) => {
  res.send(await search.torrent(req.url))
})


app.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});