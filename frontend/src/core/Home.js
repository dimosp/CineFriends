import React from 'react';
import Posts from '../post/Posts';
import { isAuthenticated } from '../auth/index';
import InfiniteScroll from "./infiniteScroll.js";
import NewPost from '../post/NewPost';

const Home = () => (
    <div>
        <div className=' card text-center col-xs-1 p-5' align="center">
            <NewPost/>
        </div>

        <div className='container'>
            <InfiniteScroll/>
        </div> 
    </div>
);

export default Home;