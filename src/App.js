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
import UserAbout from './Components/UserAbout';
import UserOverview from './Components/UserOverview';

import logo from './Reddit.png';
import './app.css';

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


//var axios = require("axios");
var API_helper_Reddit = require("./API-helper-reddit.js");
//var expiresIn = 0;
//var accessToken = '';
//var accessTokenTimestamp = 0;

class App extends Component {
    constructor() {
        super();
        this.state = {
            userAbout: {},
            userComments: [],
            userPosts: [],
            showResults: false,
            mostUpvotedComment: {},
            mostDownvotedComment: {}
        };
    }

    generatePDF(){
        const input = document.getElementById('toPrint'); // element with this id will be selected to print in pdf
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                //pdf.save("reddit_report.pdf");
            });
    }


    componentWillMount() {
  }

  componentDidMount() {
    this.setState({showResults:false});
    ///\remark Access token not required as yet - hence code below commented out
    /*
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
    */
  }


    async handleSearchUser(searchQuery) {
      this.setState({showResults:true})
        console.log("\nhandleSearchUser!");

        try {
            // fetch user's About and set state
            var searchResults_userAbout = await API_helper_Reddit.getUserAbout(searchQuery);
            this.setState({ userAbout: searchResults_userAbout.data.data });
        }
        catch (error)
        {
            alert(`No reddit user by the name of ${searchQuery}!`);
        }
        try {
            // fetch user's comments and set state
            var searchResults_userComments = await API_helper_Reddit.getUserComments(searchQuery);
            this.setState({ userComments: searchResults_userComments });

            /*var most_upvotes = 0,most_downvotes = searchResults_userComments[0].data.downs;
            var most_upvoted_comment = {}
            var most_downvoted_comment = searchResults_userComments[0].data

            searchResults_userComments.forEach(element => {
                if(element.data.ups > most_upvotes){
                    most_upvotes = element.data.ups
                    most_upvoted_comment = element.data
                }
                
                if(element.data.downs < most_downvotes){
                  most_downvotes = element.data.downs
                  console.log("Downvotes was updated with "+most_downvotes)
                  most_downvoted_comment = element.data
                }
            });
            console.log("Most downvotes are "+most_downvotes)*/

            var commentStats = API_helper_Reddit.getCommentsStats(searchResults_userComments)
            this.setState({ mostUpvotedComment: commentStats.upvoted})
            this.setState({ mostDownvotedComment:commentStats.downvoted})
            // fetch user's posts and set state
            var searchResults_userPosts = await API_helper_Reddit.getUserPosts(searchQuery);
            this.setState({ userPosts: searchResults_userPosts });
        } catch (error) {
            console.log("ERROR: " + error);
        }

    }


    render() {
    return (
      <div className="container">
        <div className="logo"><img src={logo}  alt='logo' /></div>
        <SearchBar searchUser={this.handleSearchUser.bind(this)}/>
        {this.state.showResults? <UserAbout userAboutData={this.state. userAbout} />: null}
        {this.state.showResults? <UserOverview
              userOverviewData_Comments={this.state.userComments}
              userOverviewData_Posts={this.state.userPosts}
              userOverviewData_most_downvoted_comment={this.state.mostDownvotedComment}
              userOverviewData_most_upvoted_comment={this.state.mostUpvotedComment}/> : null}
      </div>
    );
  }
}

export default App;
