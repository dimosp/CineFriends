import React, { useState } from 'react';
import {MainContainer, MainBg, VideoBg, MainContent, MainH1, MainP, MainBtnWrapper, ArrowForward, ArrowRight } from './MainElements';
import {Button} from '../ButtonElement';
import Video from '../../videos/video2.mp4';

const MainSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <MainContainer>
            <MainBg>
                <VideoBg autoPlay loop muted src={Video} type="video/mp4"/>;
            </MainBg>
            <MainContent>
            <MainH1>Join a loving cinephile community</MainH1>
            <MainP>
            From giving your thoughts on the latest releases, to finding recommendations from your friends, Binge is your go-to place to share everything cinema related.
            </MainP>
            <MainBtnWrapper>
                <Button to='/Signup'onMouseEnter={onHover} onMouseLeave={onHover}
                primary='true' dark='true' >Get Started{hover ? <ArrowForward/> : <ArrowRight/>} </Button>
            </MainBtnWrapper>
            </MainContent>
        </MainContainer>
    )
}
export default MainSection;
