import React, { useEffect, useState, useRef } from 'react';
import Posts from '../post/Posts';
import Post from '../post/Post';
import { Link } from 'react-router-dom';
import { list } from '../post/apiPost';

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
const InfiniteScroll = () => {
    const [postList, setPostList] = useState([]);
    // tracking on which page we currently are
    const [page, setPage] = useState(1);

    const [postCount, setPostCount] = useState(0);
    // add loader reference 
    const loader = useRef(null);

    //New Stuff

    useEffect(() => {
        list()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setPostList(data.slice(0, 5))
                }
            });
    },[])

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

    useEffect(() => {
        // here we simulate adding new posts to List
        list()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    var increment = 5;
                    if (postCount + increment > data.length) {
                        increment = data.length;
                    }
                    setPostList(postList.concat(data.slice(postCount, postCount + increment)))
                    setPostCount(postCount + increment)
                }
            });
    }, [page])

    // here we handle what happens when user scrolls to Load More div
    // in this case we just update page variable
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1)
        }
    }

    return (<div className="container" style={containerStyle}>
        <div className="post-list col-xs-1" align="center">
 
            {postList.map((post, i) => {
                const posterId = post.postedBy ? `${post._id}` : "";
                console.log("posterId", posterId)

                const postedById = post.postedBy ? `${post.postedBy._id}` : ""; 
                console.log("postedById", postedById)


                const posterName = post.postedBy ? post.postedBy.name : " Unknown";
                console.log("posterName", posterName)

                return (
                    <Post posterId={posterId} posterName={posterName} postedById={postedById} created={post.created} body={post.body} />
                )
            })}
            
            <div className="loading" ref={loader}>
                <h2>No more posts! Why not try to create some yourself?</h2>
            </div>
        </div>
    </div>)
}

export default InfiniteScroll;