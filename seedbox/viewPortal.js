const params = require('./getParams');

function viewPortal(url) {
    var remoteKey = params.getAllUrlParams(url).key;
  
  if (remoteKey === localKey) {
    console.log('Good');

    var content = fetch('http://localhost:9091')

    return content;


  } else {return 'access denied'}
}

module.exports = { viewPortal }