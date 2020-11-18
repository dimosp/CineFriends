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

    if (deleted) {
        return <Redirect to={'/home'} />;
    }

    return (
        <div>
            <div className="card gedf-card m-5 ">
                <div className="card-header ">
                    <div className="d-flex justify-content-between align-items-center ">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mr-2">
                                <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                            </div>
                            <div className="ml-2">
                                <div className="h5 m-0">
                                    <Link to={`${posterId}`}>
                                        {this.props.posterName}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="dropdown">
                                <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                    <div className="h6 dropdown-header">Configuration</div>
                                    <a className="dropdown-item" href="#">Save</a>
                                    <a className="dropdown-item" href="#">Hide</a>
                                    <a className="dropdown-item" href="#">Report</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <p className="card-text">
                        {`${this.props.body} `}
                        {/* {`${this.props.body.substring(0, 100)} `} */}
                        {/* <Link
                            to={`/post/${posterId}`}
                            className=''
                        > 
                            <em>Read More...</em>
                        </Link> */}
                    </p>
                    <div className="text-muted h7 mb-2 font-weight-normal"> 
                        <i className="fa fa-clock-o"></i> {new Date(this.props.created).toDateString()}
                    </div>
                    
                    {isAuthenticated().user &&  
                        isAuthenticated().user._id === this.props.postedById &&  
                        <>
                            <Link 
                                className='btn btn-primary card-link m-4'
                                to={`/post/edit/${this.props.posterId}`}
                            >
                                Edit
                            </Link>
                            <button 
                                className='btn btn-primary card-link m-4'
                                onClick={this.deleteConfirmed}
                            >
                                Delete
                            </button>
                        </>
                    }
                    
                </div>
                <div className="card-footer">
                    <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                    <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                    <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                </div>
            </div>
        </div>
    )
}};

export default SinglePost;


// function SinglePost(props) {

    
    
//     return(
//         <div class="card gedf-card m-5 ">
//             <div class="card-header ">
//                 <div class="d-flex justify-content-between align-items-center ">
//                     <div class="d-flex justify-content-between align-items-center">
//                         <div class="mr-2">
//                             <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
//                         </div>
//                         <div class="ml-2">
//                             <div class="h5 m-0">
//                                 <Link to={`${props.posterId}`}>
//                                     {props.posterName}
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <div class="dropdown">
//                             <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                 <i class="fa fa-ellipsis-h"></i>
//                             </button>
//                             <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
//                                 <div class="h6 dropdown-header">Configuration</div>
//                                 <a class="dropdown-item" href="#">Save</a>
//                                 <a class="dropdown-item" href="#">Hide</a>
//                                 <a class="dropdown-item" href="#">Report</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div class="card-body">
//                 <p className="card-text">
//                     {`${props.body.substring(0, 100)} `}
//                     <Link
//                         to={`/post/${props.posterId}`}
//                         className=''
//                     > 
//                         <em>Read More...</em>
//                     </Link>
//                 </p>
//                 <div class="text-muted h7 mb-2 font-weight-normal"> <i class="fa fa-clock-o"></i> {new Date(props.created).toDateString()}</div>
                
//                 {isAuthenticated().user &&  
//                     isAuthenticated().user._id === props.posterId &&  
//                     <div>
//                         <button className='btn btn-primary card-link m-4'>
//                             Edit
//                         </button>
//                         <button 
//                             className='btn btn-primary card-link m-4'
//                             onClick={deletePost}
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 }
                
//             </div>
//             <div class="card-footer">
//                 <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
//                 <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
//                 <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
//             </div>
//         </div>
//     )
// }

// export default SinglePost;