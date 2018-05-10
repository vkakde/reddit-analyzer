import React, { Component } from 'react';
import '../../public/css/UserOverview.css';
class UserOverview extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div id="toPrint"
            className="user-info">
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
                            <div className="comment-info">{this.props.userOverviewData_most_upvoted_comment.ups}</div>
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
                            <div className="comment-info">{this.props.userOverviewData_most_upvoted_comment.ups}</div>
                            <span>Most Upvotes</span>
                        </div >
                        <div>
                            <div>{this.props.userOverviewData_most_upvoted_comment.body}</div>
                        </div>
                        <div>
                        </div>
                    </div>

                    <div className="user-row">

                        <div className="user-circle">
                            <div className="comment-info">{this.props.userOverviewData_most_downvoted_comment.downs}</div>
                            <span>Most Downvotes</span>
                        </div >
                        <div>
                            <div>{this.props.userOverviewData_most_downvoted_comment.body}</div>
                        </div>
                        <div>
                        </div>
                    </div>

                    <div className="user-row">

                        <div className="user-circle">
                            <div className="comment-info">{this.props.userOverviewData_most_upvoted_post.ups}</div>
                            <span>Most Upvotes for Posts</span>
                        </div >

                        <div>
                            <div>{this.props.userOverviewData_most_upvoted_post.body}</div>
                        </div>

                        <div>
                        </div>
                    </div>

                    <div className="user-row">

                        <div className="user-circle">
                            <div className="comment-info">{this.props.userOverviewData_most_downvoted_post.downs}</div>
                            <span>Most Downvotes for Posts</span>
                        </div>

                        <div>
                            <div>{this.props.userOverviewData_most_downvoted_post.body}</div>
                        </div>

                        <div>
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
    // userOverviewData_Upvotes: React.PropTypes.array
}

export default UserOverview;
