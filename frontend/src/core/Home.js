import React from 'react';
import { isAuthenticated } from '../auth/index';
import InfiniteScroll from "./infiniteScroll.js";
import NewPost from '../post/NewPost';
import './Custom.css';


const Home = () => (
    <div className='Scrolling-Backround'>
        <div className=' card text-center col-xs-1 p-5' align="center">
            <NewPost/>
        </div>  

        <div className='container'>
            <InfiniteScroll/>
        </div> 
    </div>
);

export default Home;