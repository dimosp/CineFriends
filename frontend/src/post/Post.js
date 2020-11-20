import React, { Component, useEffect, useState, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Posts.css';
import {list} from './apiPost';
import {isAuthenticated, signin} from '../auth';
import { singlePost, remove, like, unlike } from './apiPost';

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
        redirectToLandingPage: false 
    }

    checkLike = (likes) => {
        const userId = isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1
        return match;
    }

    // ** Commented this because it breaks at length
    // componentDidMount = () => {
    //     const posterId = this.props.posterId;

    //     singlePost(posterId)
    //     .then (data => {
    //         if (data.error) {
    //             console.log(data.error)
    //         } else {
    //             this.setState({ 
    //                 post: data,
    //                 likes: data.likes.length,
    //                 like: this.checkLike(data.likes),
    //                 comment: this.state.comment,
    //                 share: this.state.share
    //             })
    //         }
    //     })
    // }
    

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

    shareToggle = () => {
        let share = this.state.share
        this.setState({
            share: !share
        })
    }

    deletePost = () => {
        const posterId = this.props.posterId;
        const token = isAuthenticated().token;
    
        remove(posterId, token)
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                this.setState({ deleted: true })            }
        })
    } 

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?')
        if (answer) {
            this.deletePost()
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
            redirectToLandingPage
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
                        <div class="dropdown">
                            <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-ellipsis-h"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                <div class="h6 dropdown-header">Configuration</div>
                                    {isAuthenticated().user &&  
                                                isAuthenticated().user._id === this.props.postedById &&  
                                                <>
                                                    <a class="dropdown-item" href={`/post/edit/${this.props.posterId}`}>Edit</a>
                                                    <a class="dropdown-item delete-dropdown" onClick={this.deleteConfirmed}>Delete</a>
                                                </>
                                    }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="card-body">


                <p class="card-text text-left">
                    {this.props.body.substring(0, 100)}
                </p>
            </div>

            {/*
            <div class="card-footer d-flex">
                <a href="#" class="card-link mr-auto p-2"><i class="fa fa-gittip"></i> Like</a>
                <a href="#" class="card-link p-2"><i class="fa fa-comment"></i> Comment</a>
            </div>
            */}
            {/* ** Commented it because it breaks in length */}
            {/* <div className="card-footer d-flex">
                <a 
                    href="#" 
                    className="card-link mr-auto p-2">
                        <i className="fa fa-gittip"></i> 
                    {likes}  Likes 
                </a>
                <a 
                    href="#" 
                    className="card-link p-2">
                        <i className="fa fa-comment"></i> 
                    {this.props.comments.length} Comments 
                </a>
                <a 
                    href="#" 
                    className="card-link p-2">
                        <i className="fa fa-mail-forward"></i> 
                    0 Shares 
                </a>
            </div> */}

            <div className="card-footer d-flex flex-row justify-content-between">
                {like ? (
                            <button 
                            onClick={this.likeToggle} 
                            style={{
                                cursor: "pointer",
                                border: 'none',
                                width: '80%'
                            }}  
                            className="card-link btn bg-transparent">
                                <svg 
                                    width="1em" 
                                    height="1em" 
                                    viewBox="0 0 16 16" 
                                    class="bi bi-heart-fill" 
                                    fill="currentColor" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        fill-rule="evenodd" 
                                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
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
                                className="card-link btn bg-transparent">
                                    <svg 
                                        width="1em" 
                                        height="1em" 
                                        viewBox="0 0 16 16" 
                                        class="bi bi-heart" 
                                        fill="currentColor" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <path 
                                            fill-rule="evenodd"
                                            d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                    </svg>
                                    <i className="fa fa-gittip"></i>
                                    <span className='ml-3'>
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
                                className="card-link btn bg-transparent">
                                <svg 
                                    width="1em" 
                                    height="1em" 
                                    viewBox="0 0 16 16" 
                                    class="bi bi-chat-right-fill" 
                                    fill="currentColor" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        fill-rule="evenodd" 
                                        d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"
                                    />
                                </svg>
                                <i className="fa fa-comment"></i> 
                                <span className='ml-3'>
                                    {`Commented`} 
                                </span>
                            </button>

                        ) : (

                            <button 
                                onClick={this.commentToggle} 
                                style={{
                                    cursor: "pointer",
                                    border: 'none',
                                    width: '80%'
                                }} 
                                className="card-link btn bg-transparent">
                                    <svg 
                                        width="1em" 
                                        height="1em" 
                                        viewBox="0 0 16 16" 
                                        class="bi bi-chat-right" 
                                        fill="currentColor" 
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path 
                                            fill-rule="evenodd" 
                                            d="M2 1h12a1 1 0 0 1 1 1v11.586l-2-2A2 2 0 0 0 11.586 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"
                                        />
                                    </svg>
                                    <i className="fa fa-comment"></i> 
                                    <span className='ml-3'>
                                        {`Comment`} 
                                    </span>
                            </button>
                        )}
            </div>

        </div>
        )
    }

};

export default SinglePost;
