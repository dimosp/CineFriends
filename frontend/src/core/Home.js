import React from 'react';
import Posts from '../post/Posts';
import { isAuthenticated } from '../auth/index';
import InfiniteScroll from "./infiniteScroll.js";
import NewPost from '../post/NewPost';

const Home = () => (
    <div>
        {!isAuthenticated() && (
        <div className='jumbotron'>
                <h2>Home</h2>
                <p className='lead'>Welcome to Binge</p>
            </div>
        )}

        {isAuthenticated() && (
            <div>
                <div className='card row text-center col-xs-1 p-5' align="center">
                    <NewPost/>
                </div>
                <div className='container'>
                    <InfiniteScroll/>
                </div> 
            </div> 
        )}
    </div>
);

export default Home;