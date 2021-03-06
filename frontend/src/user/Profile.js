import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';
import DefaultProfile from '../images/avatar.png';
import DeleteUser from './DeleteUser';
import ProfileTabs from './ProfileTabs';
import { listByUser } from '../post/apiPost';
import FollowProfileButton from './FollowProfileButton';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: "",
            posts: []
        };
    }


    // check if you are following this user
    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
        // one id has many other ids (followers) and vice versa
        return follower._id === jwt.user._id;
        });
        return match;
    };

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        callApi(userId, token, this.state.user._id).then(data => {
        if (data.error) {
            this.setState({ error: data.error });
        } else {
            this.setState({ user: data, following: !this.state.following });
        }
        });
    };

    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.setState({ posts: data });
          }
        });
      };

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({redirectToSignin: true});
            } else {
                let following = this.checkFollow(data);
                this.setState({ user: data });
                this.setState({ user: data, following });
                this.loadPosts(data._id);
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);     
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);     
    }

    render() {
        const {redirectToSignin, user, posts} = this.state;
        if (redirectToSignin) return <Redirect to='/signin' />;

        const photoUrl = user._id 
        ? `${process.env.REACT_APP_API_URL}/users/photo/${user._id}?${new Date().getTime()}` 
        : DefaultProfile;

        return (
            <div className='container'>
                <h2 className='mt-5 mb-5'>Profile</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        <img 
                            style={{height: '200px', width: 'auto'}} 
                            className='img-thumbnail'
                            src={photoUrl} 
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name} 
                        />
                    </div>
                    <div className='col-md-6'>
                        <div className='lead mt-2'>
                        <h4>Profile Information</h4>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>
                                {`Joined: ${new Date(user.created).toDateString()}`}
                            </p>
                        </div>
                        {isAuthenticated().user &&
                            isAuthenticated().user._id === user._id && (
                                <div>
                                    <div className='d-inline-block'>
                                        <Link className='btn btn-raised btn-success mr-5' to={`/user/edit/${user._id}`} >
                                            Edit Profile
                                        </Link>
                                    </div>
                                        <DeleteUser userId={user._id} />
                                </div>
                            )
                        }
                        {isAuthenticated().user &&
                            isAuthenticated().user._id !== user._id && (
                                <div>
                                    <FollowProfileButton
                                        following={this.state.following}
                                        onButtonClick={this.clickFollowButton}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='row'>
                    <div className='col md-12 mt-5 mb-5'>
                    <h4>About me...</h4>
                    <hr/>
                        <p className='lead'>
                            {user.about}
                        </p>
                    <hr/>

                    <ProfileTabs
                        followers={user.followers}
                        following={user.following}
                        posts={posts}
                        user={user}
                    />

                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;