import React, { useEffect, useState, useRef } from 'react';
import Posts from '../post/Posts';
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
    maxWidth: '1280px',
    margin: '0 auto',
}
const InfiniteScroll = () => {
    const [postList, setPostList] = useState([]);
    // tracking on which page we currently are
    const [page, setPage] = useState(1);

    const [testPost, setTestPost] = useState(5);
    // add loader refrence 
    const loader = useRef(null);


    //New Stuff

    useEffect(() => {
        list()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setPostList(data.slice(0,5))

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

                    setPostList(postList.concat(data.slice(testPost, testPost+5)))//data.slice(0, testPost + 5))
                    setTestPost(testPost + 5)
                    console.log(postList.concat(data.slice(testPost, testPost + 5)))


                }
            });
        console.log("Hello")
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
        <div className="post-list">
            {
                postList.map(post => {
                    return (<div className="post" style={divStyle}>
                        <h2> {post.body} </h2>
                    </div>)
                })
            }
            <div className="loading" ref={loader}>
                <h2>Load More</h2>
            </div>
        </div>
    </div>)
}

export default InfiniteScroll;