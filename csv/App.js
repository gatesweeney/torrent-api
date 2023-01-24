import "./App.css";
import { useState } from "react";
import Papa from "papaparse";
import getTorrents from "./getTorrent";
import $ from "jquery";
import { getAllUrlParams } from "./getParams";


let location = document.location.href.split('/')[2];
let domain;
let port = 3004;
try {
  domain  = location.split(':')[0]
} catch (error) {
  domain = location;
};
let site = 'piratebay';
// Set to true to search all sites. Overrides 'site'
let searchAll = false;
// Limits torrent listings
const limit = '30';
// Sets a minimum for seeders
const seedMin = '15';
var allListings = [];


function App() {

  $('#complete').hide();
  $('#submit').hide();
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Create array and push movie names to it
        let movieList = [];
        for (let i = 0; i < results.data.length; i++) {
          var query = [results.data[i].Movie, results.data[i].Year].join(' ');
          movieList.push(query);
        }

        //Log the list for debug purposes
        console.log(movieList);

        //Call the API
        for (let i = 0; i === 0; i++) {
          allListings = getTorrents(movieList, domain, port, site, limit, seedMin, searchAll);
        }
        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  $('.masterList').html(allListings);

  var out = (
      <div>
        <h1>csv-to-movie</h1>
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
        />
        <br />
        <br />
        <div id="results">
          <div id="current-movie">Searching movie: <span>movie</span></div>
          <br />
          <div id="loading">Processed <span id="movie-now">0</span> / <span id="total-movies">0</span> movies.</div>
          <br />
          <div id="myProgress">
            <div id="myBar"></div>
          </div>
          <div id="percent"><span>0</span>%</div>
        </div>
        <br />
        <div id="complete"></div>
        <br />
        <br />
        <br />
        <br />
        <table>
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr class="tRow" key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br>
        </br>
        <button id="submit">Send to Seedbox</button>
      </div>
    );
    return out;
  }

  


export default App;


