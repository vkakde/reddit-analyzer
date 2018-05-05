/*
Reddit API: 

Authentication for Reddit API requests
1. URL: https://github.com/reddit-archive/reddit/wiki/OAuth2
2. For API requests not requiring confidential user data from reddit, refer "Application only OAuth"
   section of wiki at above URL.
*/

/*
  References
  1. https://github.com/hortinstein/reddit-user-dump/blob/master/index.js
  2. https://github.com/anhuynh/reddit-user-stats/blob/master/src/App.js (React)
  3. 
*/

import React, { Component } from 'react';
import SearchBar from './Components/SearchBar';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


var axios = require("axios");
var expiresIn = 0;
var accessToken = '';
var accessTokenTimestamp = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      accessToken
    };
  }

  generatePDF(){

    const input = document.getElementById('toPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        //pdf.save("reddit_report.pdf");

      })
    ;
  }



  componentWillMount() {
  }

  componentDidMount() {
    //this.generatePDF();

    if (accessTokenTimestamp === 0 || Date.now() - accessTokenTimestamp <= 100) {
      axios.request({
        url: "https://www.reddit.com/api/v1/access_token",
        method: "post",
        auth: {
          ///\remark Client ID and secret belong to dev account of reddit username: cs554acc1
          username: "BGW4aLakJfAdmQ",
          password: "jhZ8Amx4HTmXdZjDGodRFdZhlwQ"
        },
        data: {
          "grant_type": "client_credentials",
          "scope": "public"
        }
      }).then(function (res) {
        expiresIn = res.data.expires_in;
        accessToken = res.data.access_token;
        accessTokenTimestamp = Date.now();
        console.log("Access Token acquired successfully. Expires in: " + expiresIn + "\nToken timestamp: " + accessTokenTimestamp);

      });

      

    }

  }

  handleSearchUser(searchQuery) {
    console.log("\nhandleSearchUser!");
  }

  render() {
    return (
      <div id="toPrint" className="container">
        <SearchBar searchUser={this.handleSearchUser.bind(this)} />
      </div>
    );
  }
}

export default App;
