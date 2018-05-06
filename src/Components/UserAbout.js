import React, { Component } from 'react';

class UserAbout extends Component {
  constructor() {
    super();
    this.state = {
      userAboutData: {}
    }
  }

  render() {
    console.log("Recieved object: "+this.props.userAboutData.name);
    return (
      <div className="col-sm-12 col-md-6 col-lg-6">
        <div className="card text-center">
          <div className="card-header">User About</div>
          <div><img height="270" width="270" src={this.props.userAboutData.icon_img} alt="Unavailable" /></div>
          <div className="card-text">Name: {this.props.userAboutData.name}</div>
          <br />
        </div>
      </div>
    );
  }
}

UserAbout.propTypes = {
  userAboutData: React.PropTypes.object
}

export default UserAbout;
