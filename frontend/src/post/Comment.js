import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

const commentStyle = {
    height: 'auto'
};

const containerStyle = {
    maxWidth: '800px',
    margin: '0',
}

class Comment extends Component {
    state = {
        text: "",
        error: ""
    };

    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0) {
            this.setState({
                error:
                    "Comment should not be empty!"
            });
            return false;
        }
        return true;
    };

    addComment = e => {
        e.preventDefault();

        if (!isAuthenticated()) {
            this.setState({ error: "Please signin to leave a comment." });
            return false;
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;

            comment(userId, token, postId, { text: this.state.text }).then(
                data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        this.setState({ text: "" });
                        // dispatch fresh list of coments to parent (SinglePost)
                        this.props.updateComments(data.comments);
                    }
                }
            );
        }
    };

    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    };

    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };

    render() {
        const { comments } = this.props;
        const { error } = this.state;

        return (
            <div>
                <h4 className="mt-5 mb-5">Comment Section</h4>

                <form onSubmit={this.addComment}>
                    <div className="form-group col-lg-5">
                        <textarea
                            onChange={this.handleChange}
                            type='text'
                            placeholder="Leave a comment..."
                            className='form-control'
                            value={this.state.text}
                        />
                        <br></br>
                        <button className="btn my-create-comment-button">
                            Post
                        </button>
                    </div>
                </form>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div className="col-md-12">
                    <h5 className="text-dark">{comments.length} Comments</h5>
                    <hr />
                    
                    <div className="container" style={containerStyle}>
                        <div className="post-list col-xs-1" align="center">
                            {/* create a copy of the comment array and reverse it, to show comments from oldest to newer */}
                            {comments.slice(0).reverse().map((comment, i) => (
                                <div key={i}>


                                <div class="card gedf-card d-flex border-secondary m-5 ">
                                    <div class="card-header" style={commentStyle}>
                                        <div class="d-flex justify-content-between align-items-center ">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="mr-2">  
                                                <img class="rounded-circle" width="45" src={`${process.env.REACT_APP_API_URL}/users/photo/${comment.postedBy._id}`} alt="" />
                                            </div>
                                            <div class="ml-2">
                                                    <div class="h5 m-0 text-left"><Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</Link></div>
                                                    <div class="text-muted h7 mb-2 font-weight-normal"> <i class="fa fa-clock-o"></i> {new Date(comment.created
                                                ).toDateString() + ", " + new Date(comment.created).toLocaleTimeString()} </div>
                                            </div>
                                        </div>

                                        <div>
                                            {isAuthenticated().user &&  
                                                isAuthenticated().user._id === comment.postedBy._id &&  
                                                <div class="dropdown">
                                                    <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i class="fa fa-ellipsis-h"></i>
                                                    </button>
                                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                                        <div class="h6 dropdown-header">Configuration</div>
                                                            <a 
                                                                class="dropdown-item delete-dropdown text-dark" 
                                                                style={{cursor: "pointer"}}
                                                                onClick={() =>
                                                                    this.deleteConfirmed(
                                                                        comment
                                                                    )
                                                                }>
                                                                    Delete
                                                            </a>
                                                    </div>
                                                </div>
                                            }
                                        </div>


                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <p class="card-text text-left">
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>

                                </div>
                            ))}
                    
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Comment;
