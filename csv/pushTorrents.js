import $ from "jquery";

export default async function pushTorrents(list, domain) {

    $('#submit').text('Sending...');
    console.log(list);

    await fetch(`http://${domain}:3004/seedbox/`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(list)
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    .then(response => $('#submit').text('Sent'))
}
  
  