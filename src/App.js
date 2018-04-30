/*
Reddit API: 

Authentication for Reddit API requests
1. URL: https://github.com/reddit-archive/reddit/wiki/OAuth2
2. For API requests not requiring confidential user data from reddit, refer "Application only OAuth"
   section of wiki at above URL.
*/


import React, { Component } from 'react';
var axios = require("axios");
var expiresIn=0;
var accessToken = '';
var accessTokenTimestamp=0;

class App extends Component {
  constructor(){
    super();
    this.state = {
    };
  }

  componentWillMount(){
  }

  componentDidMount(){
    ///\cite https://github.com/spotify/web-api/issues/321
    if(accessTokenTimestamp === 0 || Date.now() - accessTokenTimestamp <= 100){
      axios.request({
        url: "https://www.reddit.com/api/v1/access_token",
        method: "post",
        //baseURL: "https://cs-554-spotify-proxy.herokuapp.com/api",
        auth: {
          ///\remark Client ID and secret belong to dev account of reddit username: cs554acc1
          username: "BGW4aLakJfAdmQ",
          password: "jhZ8Amx4HTmXdZjDGodRFdZhlwQ"
        },
        data: {
          "grant_type": "client_credentials",
          "scope": "public"
        }
      }).then(function(res) {
        expiresIn = res.data.expires_in;
        accessToken = res.data.access_token;
        accessTokenTimestamp = Date.now();
        console.log("Access Token acquired successfully. Expires in: "+expiresIn+"\nToken timestamp: "+accessTokenTimestamp);
      });
    }
  }

  render() {
    return (
      <div className="container">
      </div>
    );
  }
}

export default App;
