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
  3. https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0 (React with Express)
*/

import React, { Component } from 'react';
import SearchBar from './Components/SearchBar';
import UserAbout from './Components/UserAbout';
import UserOverview from './Components/UserOverview';

import logo from '../public/Reddit.png';
import '../public/css/app.css';

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

var dataFunctions = require("./data-functions.js");

class App extends Component {
  constructor() {
    super();
    this.state = {
      userAbout: {},
      userComments: [],
      userPosts: [],
      showResults: false,
      mostUpvotedComment: {},
      mostDownvotedComment: {},
      mostUpvotedPost: {},
      mostDownvotedPost: {}
    };
  }

  generatePDF() {
    const input = document.getElementById('toPrint'); // element with this id will be selected to print in pdf

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("reddit_report.pdf");
      });
  }

  async sendReportByEmail() {

    try{
      console.log("Sending email to user")
      const response = await fetch('/api/sendEmail');
      const body = await response.json();
  
      if (response.status !== 200) 
        throw Error(body.message);

      console.log({ success: body.message })

    }catch(error){
      console.log({ error: error })
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    
    this.setState({ showResults: false });

  }

  

  async handleSearchUser(searchQuery) {
    this.setState({ showResults: true })

    // fetch user's About and set state
    try {
      var searchResults_userAbout = await fetch(`/reddit/about/${searchQuery}`);
      searchResults_userAbout = await searchResults_userAbout.json();
      this.setState({ userAbout: searchResults_userAbout });
    }
    catch (error) {
      alert(`No reddit user by the name of ${searchQuery}! `);
    }

    // fetch user's comments and set state
    try {
      var searchResults_userComments = await fetch(`/reddit/comments/${searchQuery}`);
      searchResults_userComments = await searchResults_userComments.json();
      this.setState({ userComments: searchResults_userComments });

      var commentStats = dataFunctions.getVotesStats(searchResults_userComments)
      this.setState({ mostUpvotedComment: commentStats.upvoted })
      this.setState({ mostDownvotedComment: commentStats.downvoted })

      // fetch user's posts and set state
      var searchResults_userPosts = await fetch(`/reddit/posts/${searchQuery}`);
      searchResults_userPosts = await searchResults_userPosts.json();
      this.setState({ userPosts: searchResults_userPosts });
      

      let postStats = dataFunctions.getVotesStats(searchResults_userPosts)
      this.setState({ mostUpvotedPost: postStats.upvoted })
      this.setState({ mostDownvotedPost: postStats.downvoted })

      console.log("Avg comment karma is " + commentStats.avg_karma)
      //this.generatePDF()
    } catch (error) {
      console.log("ERROR: " + error);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="logo"><img src={logo} alt='logo' /></div>
        <SearchBar searchUser={this.handleSearchUser.bind(this)} />
        {this.state.showResults ? <UserAbout userAboutData={this.state.userAbout} /> : null}
        {this.state.showResults ? <UserOverview
          userOverviewData_Comments={this.state.userComments}
          userOverviewData_Posts={this.state.userPosts}
          userOverviewData_most_downvoted_comment={this.state.mostDownvotedComment}
          userOverviewData_most_upvoted_comment={this.state.mostUpvotedComment}
          userOverviewData_most_downvoted_post={this.state.mostDownvotedPost}
          userOverviewData_most_upvoted_post={this.state.mostUpvotedPost} /> : null}
          <button type='button' onClick={this.sendReportByEmail}>SEND REPORT BY EMAIL</button>
      </div>
    );
  }
}

export default App;