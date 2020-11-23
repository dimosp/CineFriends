import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Posts.css';
// import {list} from './apiPost';
import {isAuthenticated, signin} from '../auth';
import { singlePost, remove, like, unlike } from './apiPost';
import { likeIcon, unlikeIcon, commentIcon, uncommentIcon, sharedIcon } from '../images/iconIndex.js';

const cardStyle = {
    height: 'auto'
};

class SinglePost extends Component {
    
    state = {
        post: '',
        deleted: false,
        like: false, 
        likes: 0,
        likeText: 'Like',
        comment: false,
        comments: 0,
        redirectToLandingPage: false,
        // BodyFullyShown: false
    }

    checkLike = (likes) => {
        const userId = isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1
        return match;
    }

    componentDidMount = () => {
        const posterId = this.props.posterId;

        singlePost(posterId)
        .then (data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ 
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comment: this.state.comment,
                    comments: data.comments.length,
                    // share: this.state.share
                    BodyFullyShown: ""
                })
            }
        })
    }

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({
                redirectToLandingPage: true
            })
            return false
        }

        let callAPI = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.posterId;
        // changing to Like and Unlike might confuse people, it is better to distinguish it via color fill of
        // the icon
        const likeText = this.state.like ? 'Like' : 'Liked' 

        callAPI(userId, token, postId)
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length,
                    likeText: likeText
                })
            }
        })
    }

    commentToggle = () => {
        let comment = this.state.comment
        this.setState({
            comment: !comment
        })
    }

    // shareToggle = () => {
    //     let share = this.state.share
    //     this.setState({
    //         share: !share
    //     })
    // }

    deletePost = () => {
        const posterId = this.props.posterId;
        const token = isAuthenticated().token;
    
        remove(posterId, token)
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                this.setState({ deleted: true })            
            }
        })
    } 

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?')
        if (answer) {
            this.deletePost()
        }
    }

    isExpanded = () => {
        if (this.state.BodyFullyShown) {
            this.setState({BodyFullyShown: false})
        } else this.setState({BodyFullyShown: true})
    }

    expandToggle = () => {
        let body = this.state.post.body;
        let BodyFullyShown = this.state.BodyFullyShown;
        console.log("BodyFullyShown", BodyFullyShown)

        if (BodyFullyShown) {
            return (
                <p>
                    {body}
                    <p 
                        className='mt-2 text-primary'
                        style={{cursor: "pointer"}}
                        onClick={this.isExpanded}
                    >
                        <em>Read Less... </em>
                    </p>
                </p>
            ) 
        } else {
            return (
                <p>
                    {`${body.substring(0, 200)} [...]`}
                    <p 
                        className='mt-2 text-primary'
                        style={{cursor: "pointer"}}
                        onClick={this.isExpanded}
                    >
                        <em>Read More...</em>
                    </p>
                </p>
            )
         }
    }

    bodySizeCheck = () => {
        let body = this.state.post.body;
        let BodyFullyShown = this.state.BodyFullyShown;
        
        if (typeof(body) === "string") {
            if (body.length < 200) {
                return body
            } else {
                return this.expandToggle()
            }
        }
    }

    render() {
        const {
            post, 
            deleted, 
            posterId, 
            posterName,
            like,
            likes, 
            likeText,
            comment, 
            comments,
            redirectToLandingPage,
            BodyFullyShown
        } = this.state;

        if (deleted) {
            return <Redirect to={'/home'} />; 
        } else if (redirectToLandingPage) {
            return <Redirect to={'/'} />;
        }

        return(
            <div class="card gedf-card border-secondary m-5 ">
                <div class="card-header" style={cardStyle}>
                    <div class="d-flex justify-content-between align-items-center ">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="mr-2">  
                            <img class="rounded-circle" width="45" src={this.props.photoUrl} alt="" />
                        </div>
                        <div class="ml-2">
                                <div class="h5 m-0 text-left"><Link to={`/user/${this.props.postedById}`}>{this.props.posterName}</Link></div>
                                <div class="text-muted h7 mb-2 font-weight-normal"> <i class="fa fa-clock-o"></i> {new Date(this.props.created).toDateString() + ", " + new Date(this.props.created).toLocaleTimeString()} </div>
                        </div>
                    </div>
                    <div>
                        {isAuthenticated().user &&  
                            isAuthenticated().user._id === this.props.postedById &&  
                            <div class="dropdown">
                                <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                    <div class="h6 dropdown-header">Configuration</div>
                                        <a 
                                            class="dropdown-item edit-dropdown text-dark" 
                                            style={{cursor: "pointer"}}
                                            href={`/post/edit/${this.props.posterId}`}>
                                                Edit
                                        </a>
                                        <a 
                                            class="dropdown-item delete-dropdown text-dark" 
                                            style={{cursor: "pointer"}}
                                            onClick={this.deleteConfirmed}>
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
                    {this.bodySizeCheck()}
                </p>
            </div>
            
            <div className="card-footer d-flex height"> 
                <a 
                    href="#" 
                    className="card-link mr-auto p-2 text-dark">
                        <i className="fa fa-gittip"></i> 
                    {likes} {likeIcon()}
                </a>
                <Link to={`/post/${this.props.posterId}`} >
                <a 
                    href="#" 
                    className="card-link p-2 text-dark">
                        <i className="fa fa-comment"></i> 
                    {comments} {`Comments`}
                </a></Link>
                {/* <a 
                    href="#" 
                    className="card-link p-2">
                        <i className="fa fa-mail-forward"></i> 
                    0 {sharedIcon()} 
                </a> */}
            </div>

            <div className="card-footer d-flex flex-row justify-content-between">
                {like ? (
                    <button 
                        onClick={this.likeToggle} 
                        style={{
                            cursor: "pointer",
                            border: 'none',
                            width: '80%'
                        }}  
                        className="card-link btn bg-transparent primary-full-color">
                            {likeIcon()}
                            <i className="fa fa-gittip"></i>
                            <span className='ml-2'>
                                {`${likeText}`} 
                            </span>
                    </button>

                ) : (
                    <button 
                        onClick={this.likeToggle} 
                        style={{
                            cursor: "pointer",
                            border: 'none',
                            width: '80%'
                        }}  
                        className="card-link btn bg-transparent primary-border-color">
                            {unlikeIcon()}
                            <i className="fa fa-gittip"></i>
                            <span className='ml-3 text-primary'>
                                {`${likeText}`} 
                            </span>
                    </button>
                )}

                {comment ? (
                    <button 
                        onClick={this.commentToggle} 
                        style={{
                            cursor: "pointer",
                            border: 'none',
                            width: '80%'
                        }} 
                        className="card-link btn bg-transparent primary-full-color">
                            {commentIcon()}
                            <i className="fa fa-comment"></i> 
                            <span className='ml-2 text-primary'>
                                {`Commented`} 
                            </span>
                    </button>

                ) : (
                    <Link to={`/post/${this.props.posterId}`} style={{
                        cursor: "pointer",
                        border: 'none',
                        width: '80%'
                    }} >
                        <button 
                            onClick={this.commentToggle} 
                            className="card-link btn bg-transparent primary-border-color">
                                {uncommentIcon()}
                                <i className="fa fa-comment"></i> 
                                <span className='ml-3 text-primary'>
                                    {`Comment`} 
                                </span>
                        </button>
                    </Link>
                )}
            </div>
        </div>
        )
    }
};

export default SinglePost;
