import React, { useEffect, useState, useRef } from 'react';
import Posts from '../post/Posts';
import Post from '../post/Post';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { list, fetchFollowerPosts, test } from '../post/apiPost';
import $ from 'jquery';

const divStyle = {
    color: 'blue',
    height: '250px',
    textAlign: 'center',
    padding: '5px 10px',
    background: '#eee',
    marginTop: '15px'
};


const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
}

//Helper function to sort post in descending date order
function sortByDate(a, b) {
    return new Date(b.created).getTime() - new Date(a.created).getTime();
}

//NOTE: When the word follower is used, it is meant the users that the user *follows*, not the users that *follow* the user. Oops
const InfiniteScroll = () => {

    //Hook that contains all posts (since there is no pagination)
    const [allPosts, setAllPosts] = useState([]);

    //Hook responsible for tracking on which page we currently are
    const [page, setPage] = useState(1);

    //Counter that holds the info on which post we are on
    const [postCount, setPostCount] = useState(0)

    // add loader reference 
    const loader = useRef(null);

    //Hook that holds the posts that are loaded into the view
    const [postList, setPostList] = useState([]);

    //Array used to store the fetched posts
    var postArray = []

    //Function that fetches all posts
    const getPostsUsers = async () => {

        //url for the api call to get the followers (Dummy all users used now)
        const urlString = `${process.env.REACT_APP_API_URL}/users`
        //const userId = isAuthenticated().user._id;
        //const urlString = `${process.env.REACT_APP_API_URL}/users/${userId}`


        //Ajax call to get all followers (Dummy get all users now)
        $.ajax({
            //Url to make the call on
            url: urlString,

            //On success
            success: (searchResults) => {
                console.log("Success data fetch")
                console.log(searchResults.followers)
                //Get auth token from user, to make the post api calls
                const token = isAuthenticated().token;

                //Array to holde the Promises for each follower's posts api call
                var promises = []

                //For each follower call fetchFOllowerPosts, which makes the api call to get all posts by the follower
                searchResults.map(user => {

                    promises.push(fetchFollowerPosts(token, user._id))

                })

                //Resolve all promises
                Promise.all(promises)
                    .then(responses => {
                        return Promise.all(responses.map(response => {
                            return response.json();
                        }))
                    })
                    .then(data => {
                        data.map(data => {
                            if (data.error) {
                                console.log(data.error);
                            } else {
                                //If the follower has no posts skip. Otherwise, concat the array of posts into our postArray
                                if (data.length != 0) {
                                    postArray = postArray.concat(data)
                                }
                            }

                        })
                        //Then update the allPosts hook with the array of all posts
                    }).then(() => { postArray.sort(sortByDate); setAllPosts(postArray); })




            },
            //Print error, if any, during ajax call
            error: (xhr, status, err) => {
                console.error("Failed to fetch")
            }
        })
    };

    //Function that fetches all posts by followers
    const getPostsFollowers = async () => {
        //Get Token and UserId
        const token = isAuthenticated().token;
        const userId = isAuthenticated().user._id;

        //Api Call to get the user info
        return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            return response.json()
        }).then(user => {

            //Get the ids of the user's followers
            var followerIds = user.followers;
            followerIds = followerIds.push(userId);


            //Array to holde the Promises for each follower's posts api call
            var promises = [];

            //For each follower call fetchFOllowerPosts, which makes the api call to get all posts by the follower
            followerIds.map(followerId => {

                promises.push(fetchFollowerPosts(token, followerId))

            })

            //Resolve all promises
            Promise.all(promises)
                .then(responses => {
                    return Promise.all(responses.map(response => {
                        return response.json();
                    }))
                })
                .then(data => {
                    data.map(data => {
                        if (data.error) {
                            console.log(data.error);
                        } else {
                            //If the follower has no posts skip. Otherwise, concat the array of posts into our postArray
                            if (data.length != 0) {
                                postArray = postArray.concat(data)
                            }
                        }

                    })
                    //Then update the allPosts hook with the array of all posts
                }).then(() => { postArray.sort(sortByDate); setAllPosts(postArray); })




        })
            .catch(err => console.log(err));


    }




    //Called once in the render, to get all posts
    useEffect(() => {
        getPostsUsers(); //CHANGE TO getPostsFollowers() to show follower's posts
    }, [])

    //Called when all posts are fetched
    useEffect(() => {

        //Load the first 5 into the view
        setPostList(postList.concat(allPosts.slice(0, 5)))

        //Update post counter
        setPostCount(postCount + 5)
    }, [allPosts])

    //Called once in the render, to initialize IntersectionObserver
    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }

    }, []);

    //Called each time we scroll to the bottom of the page
    useEffect(() => {
        //Variable that indicates how many posts to load each time
        var increment = 5;

        //Update feedview with the next {increment} posts, by concating itself with the next {increment} posts of the allPosts hook
        setPostList(postList.concat(allPosts.slice(postList.length, postList.length + increment)))

        //Update postCount 
        setPostCount(postCount + increment)

    }, [page])



    //Here we handle what happens when user scrolls to load more posts
    //If that happens, we just update the page hook
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1)
        }
    }


    return (<div className="container" style={containerStyle}>
        <div className="post-list col-xs-1" align="center">
 
            {postList.map((post, i) => {
                const userId = post.postedBy ? `${post.postedBy._id}` : ""
                const posterId = post.postedBy ? `${post._id}` : "";
                const postedById = post.postedBy ? `${post.postedBy._id}` : ""; 
                const posterName = post.postedBy ? post.postedBy.name : " Unknown";
                const profilePic = `${process.env.REACT_APP_API_URL}/users/photo/${userId}`

                return (
                    <Post posterId={posterId} posterName={posterName} postedById={postedById} created={post.created} body={post.body} photoUrl={profilePic} />
                )
            })}
            
            <div className="loading" ref={loader}>
                <h2>No more posts! Why not try to create some yourself?</h2>
            </div>
        </div>
    </div>)
}

export default InfiniteScroll;