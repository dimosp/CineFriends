import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";
import { isAuthenticated } from '../auth';
import Post from '../post/Post';

const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
}

class ProfileTabs extends Component {

    constructor() {
        super();
        this.state = {
            user: ""
        };
    }

    render() {
        const { following, followers, posts, user } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="text-primary">
                            {followers.length} Followers
                        </h4>
                        <hr />
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${
                                                process.env.REACT_APP_API_URL}/users/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p>
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <h4 className="text-primary">
                            {following.length} Following
                        </h4>
                        <hr />
                        {following.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${process.env.REACT_APP_API_URL}/users/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p >
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
                <br></br>
                
                <div className="col-md-4"><h4 className="text-primary">{posts.length} Posts</h4></div>
                {/* if you want only to allow a user to see his own posts
                {isAuthenticated().user &&  
                    isAuthenticated().user._id === user._id && */}
                    
                    <div className="card text-center col-xs-1 p-5">
                            
                            <div className="container" style={containerStyle}>
                                <div className="post-list col-xs-1" align="center">
                        
                                    {posts.map((post, i) => {
                                        const userId = post.postedBy ? `${post.postedBy._id}` : ""
                                        const posterId = post.postedBy ? `${post._id}` : "";
                                        const postedById = post.postedBy ? `${post.postedBy._id}` : ""; 
                                        const posterName = post.postedBy ? post.postedBy.name : " Unknown";
                                        const profilePic = `${process.env.REACT_APP_API_URL}/users/photo/${userId}`

                                        return (
                                            <Post posterId={posterId} posterName={posterName} postedById={postedById} created={post.created} body={post.body} photoUrl={profilePic} />
                                        )
                                    })}
            
                                </div>
                            </div>


                            <hr />

                            {/* if we wanted to have the posts numbered by date
                            {posts.map((post, i) => (
                                <div key={i}>
                                    <div>
                                        <Link to={`/post/${post._id}`}>
                                            <div>
                                                <p>{i+1}. {new Date(post.created).toDateString()}, {new Date(post.created).toLocaleTimeString()}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))} */}
                    </div>
                {/* } */}
            </div>
        );
    }
}

export default ProfileTabs;