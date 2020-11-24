import React from 'react';
import { isAuthenticated } from '../auth/index';
import InfiniteScroll from "./infiniteScroll.js";
import NewPost from '../post/NewPost';
import './Custom.css';
import { Box, Flex } from 'rebass'; 

const Home = () => (

    <Flex
        sx={{
            flexDirection: 'column',
            minHeight: '100vh'
        }}
    >
        <Box 
            className='container mt-5 box-container mx-auto'
            sx={{
                display: 'grid',
                flex: 1,
                minHeight: '100vh',
                gridTemplateAreas: [
                ' "b a" "c a"   ',
                ],
                gridGap: 50,
                margin: 'auto',
            }}
        >
            <Box
                className='Max-Height card col-xs-1 p-3 text-center mb-1' align="center"
                sx={{
                    flex: 1,
                    gridArea: 'b',
                }}
                style={{
                    width: '100%'
                }}
            >
                <NewPost className='newpost'/>
            </Box> 

            <Box
                className=''
                sx={{
                    flex: 1,
                    gridArea: 'a'
                }}
                
            >
                <InfiniteScroll/>
            </Box>
                
        </Box>
    </Flex>
);

export default Home;