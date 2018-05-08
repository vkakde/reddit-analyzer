import React, { Component } from 'react';

class UserOverview extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="col-sm-12 col-md-12 col-lg-12">
        <div className="card text-center">
          <div className="card-header">User Overview - Comments</div>
          <div className="card-text">Total Comments: {this.props.userOverviewData_Comments.length}</div>
          <br />
        </div>
      </div>
    );
  }
}

UserOverview.propTypes = {
  userOverviewData_Comments: React.PropTypes.array
}

export default UserOverview;
