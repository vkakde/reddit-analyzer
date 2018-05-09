import React, { Component } from 'react';
import './UserOverview.css';
class UserOverview extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        return (
            <div className="user-info">
                <h2>User Comment Overview</h2>
                <div className="card text-center">
                    <br />
                    <br />
                    <div className="user-row">
                        <div className="user-circle">
                            <div className="comment-info">{this.props.userOverviewData_Comments.length}</div>
                            <span>Comments</span>
                        </div>
                        <div className="user-circle">
                            <div className="comment-info">{this.props.userOverviewData_Upvotes}</div>
                            <span>Most Upvotes</span>
                        </div >
                        <div className="user-circle">
                            <div className="comment-info">{this.props.userOverviewData_Posts.length}</div>
                            <span>Total Posts</span>
                        </div>
                    </div>
                    <br />
                    <div className="user-row">
                        <div className="user-circle">
                            <div className="comment-info">{this.props.userOverviewData_Comments.length}</div>
                            <span>Comments</span>
                        </div>
                        <div className="user-circle">
                            <div className="comment-info">{this.props.userOverviewData_Upvotes}</div>
                            <span>Most Upvotes</span>
                        </div >
                        <div className="user-circle">
                            <div className="comment-info">{this.props.userOverviewData_Posts.length}</div>
                            <span>Total Posts</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserOverview.propTypes = {
    userOverviewData_Comments: React.PropTypes.array,
    userOverviewData_Posts: React.PropTypes.array,
    userOverviewData_Upvotes: React.PropTypes.array
}

export default UserOverview;
