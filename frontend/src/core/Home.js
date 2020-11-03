import React from 'react'
import logo from '../images/Home Binge Logo.png';

const Home = () => (
    <div className='jumbotron'>
        <h2>Home</h2>
        <p className='lead'>Welcome to Binge</p>
        <img src={logo} alt="Binge Logo" />
    </div>
);

export default Home;