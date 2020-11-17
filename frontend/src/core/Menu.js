import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';
import $ from 'jquery';
import './Custom.css';

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: '#778899'}
    else return {color: '#ffffff'}
}

function Menu({ history }) {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        const urlString = `${process.env.REACT_APP_API_URL}/users`
        $.ajax({
            url: urlString,

            success: (searchResults) => {
                console.log("Success data fetch")
                const userResults = searchResults 
                
                // Changed the "const userResults = searchResults.users" because it returned undifined.
                // const userResults = searchResults.users

                console.log(userResults[0])
                setSearchResults(userResults);
            },

            error: (xhr, status, err) => {
                console.error("Failed to fetch")
            }
        });

    }, [searchTerm]);

    if (!isAuthenticated()) {
        return (
            <nav className="navbar navbar-expand-md navbar-dark my-primary navbarCustom sticky-top">              
                <div class="navbar-collapse w-100 order-1 order-md-0 dual-collapse2 col-xs-1" align="center">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link 
                                className="nav-link" 
                                style={isActive(history, '/'), { cursor: "pointer", color: '#fff' }} 
                                to='/'>
                                <svg 
                                    width="1.5em" 
                                    height="1.5em" 
                                    viewBox="0 0 16 16" 
                                    class="bi bi-house-fill align-top" 
                                    fill="currentColor" 
                                    style={{color: 'white'}}
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        fill-rule="evenodd" 
                                        d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                    <path 
                                        fill-rule="evenodd" 
                                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>   
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>

                <p class="mt-5 mb-3 text-muted fixed-bottom" align="center"><a href="https://github.com/dimosp/CineFriends">SKG.CODE Binge</a> &copy; 2020-2021</p>
                
            </nav>
        );
    }
    else if (isAuthenticated()){
        return (

            <nav className="navbar navbar-expand-md navbar-dark my-primary sticky-top ">
                <button 
                    class="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#main-nav, #sign-out" 
                    aria-controls="main-nav sign-out" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div 
                    class="navbar-collapse w-100 order-1 order-md-0 dual-collapse2 col-xs-1" 
                    align="center" 
                    id="main-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link 
                                className="nav-link" 
                                style={isActive(history, '/'), { cursor: "pointer", color: '#fff' }} 
                                to='/home'>
                                <svg 
                                    width="1.5em" 
                                    height="1.5em" 
                                    viewBox="0 0 16 16" 
                                    class="bi bi-house-fill align-top" 
                                    fill="currentColor" 
                                    style={{color: 'white'}}
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        fill-rule="evenodd" 
                                        d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                    <path 
                                        fill-rule="evenodd" 
                                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>   
                                </svg>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link 
                                className='nav-link' 
                                style={isActive(history, '/users')} 
                                to='/users'>
                                    Discover
                            </Link>
                        </li>

                        {/*
                        <li className='nav-item'>
                            <Link 
                                className='nav-link' 
                                style={isActive(history, '/post/create')} 
                                to={`/post/create`}>
                                    Create Post
                            </Link>
                        </li>
                        */}

                        <li className='nav-item'>
                            <Link 
                                className='nav-link' 
                                style={isActive(history, `/user/${isAuthenticated().user._id}`)} 
                                to={`/user/${isAuthenticated().user._id}`}
                            >
                                {`My Profile`}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div class="mx-auto order-0">
                    <form className="form-inline my-2 my-lg-0 navbar-form">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <ul 
                            component="nav" 
                            aria-label="user results" 
                            class="list-group"
                        >
                            {searchResults.map(user => user.name).filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.trim() != "").map(name => (
                                    <li class="list-group-item" >
                                        <Link 
                                            className="nav-link" 
                                            style={isActive(history, '/'), { cursor: "pointer", color: '#000000' }} 
                                            to='/'>
                                                {name}
                                        </Link>  
                                    </li>
                                ))}
                        </ul>
                    </form>
                </div>

                <div class="navbar-collapse w-100 order-3 dual-collapse2" id="sign-out">
                    <ul class="navbar-nav ml-auto">
                        <li className='nav-item d-flex flex-row-reverse' >
                            <span 
                                className='nav-link' 
                                style={isActive(history, '/signup'), { cursor: "pointer", color: '#fff' }}
                                onClick={() => signout(() => history.push('/'))}>
                                    Sign Out
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
            
        );
    }
}

export default withRouter(Menu);
