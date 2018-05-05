import React, { Component } from 'react';

class UserOverview extends Component {
  constructor() {
    super();
    this.state = {
      userOverviewData: {}
    }
  }

  render() {
    console.log("Recieved object: "+this.props.userOverviewData.name);
    return (
      <div className="col-sm-12 col-md-6 col-lg-6">
        <div className="card text-center">
          <div className="card-header">User Overview</div>
          <div><img height="270" width="270" src={this.props.userOverviewData.icon_img} alt="Unavailable" /></div>
          <div className="card-text">Name: {this.props.userOverviewData.name}</div>
          <br />
        </div>
      </div>
    );
  }
}

UserOverview.propTypes = {
  userOverviewData: React.PropTypes.object
}

export default UserOverview;
