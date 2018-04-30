import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(){
    super();
    this.state = {
      newSearch:{}
    }
  }

  handleSubmit(e){
    if(this.refs.searchQuery.value === ''){
      alert('Cannot search for empty search query!');
    } else {
      this.setState({searchQuery:{
        searchQuery: this.refs.searchQuery.value,
      }}, function(){
        //console.log(this.state);
        this.props.searchSubreddit(this.state.searchQuery.searchQuery);
      });
    }
    e.preventDefault();
  }  

  render() {
    return (
      <div>
        <div className="container-fluid">
        <h1>Search for subreddit</h1>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <input size="70" placeholder="Search..." type="text" ref="searchQuery" />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <br />
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchBar: React.PropTypes.func
}

export default SearchBar;
