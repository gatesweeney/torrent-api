const search = require('./api/search');
const magnet = require('./seedbox/magnet');



const express = require('express')
var bodyParser = require('body-parser')
  
// create application/json parser
var jsonParser = bodyParser.json()


const app = express()

const cors = require('cors');
app.use(cors({
    origin: '*'
}));


//const http = require('http');

const hostname = '10.0.1.25';
const port = 3004;

/*
const server = http.createServer( async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'json');
  res.end(await App(req.url));
});
*/
global.__basedir = __dirname;
global.localKey = 'bhgs1hq17goxf8go4y9tl8n0y7upt1t438qwo43zkoxi0ge61acivf8gfl';

app.get('/api/', async (req, res) => {
  //console.log(req);
  res.send(await search.torrent(req.url))
})

app.post('/seedbox/', jsonParser, async (req, res) => {
  //console.log(req);
  res.send(await magnet.getMagnets(req.body))
})

app.get('/csv/', async (req, res) => {
  res.send('poop')
})


app.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.listen(port, '127.0.0.1', async () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});