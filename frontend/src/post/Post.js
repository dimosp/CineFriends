import React, { Component, useEffect, useState, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Posts.css';
import {list} from './apiPost';
import {isAuthenticated, signin} from '../auth';
import { singlePost, remove } from './apiPost';

class SinglePost extends Component {
    
    state = {
        post: '',
        deleted: false 
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
            posterName
        } = this.state;

        // if (deleted) {
        //     return <Redirect to={'/home'} />;
        // }

        return(
            <div class="card gedf-card border-secondary m-5 ">
                <div class="card-header ">
                    <div class="d-flex justify-content-between align-items-center ">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="mr-2">
                            <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
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
                                <a class="dropdown-item" href={`/post/edit/${this.props.posterId}`}>Edit</a>
                                <a class="dropdown-item" href="#">Delete</a>
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
            <div class="card-footer">
                <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
                <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
            </div>
        </div>
        )
    }

};

export default SinglePost;
