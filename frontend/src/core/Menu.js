import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';
import $ from 'jquery';
import './Custom.css';

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: '#000000'}
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
                
                //Άλλαξα το const userResults = searchResults.users γιατί μου επέστρεφε undifined.
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
            <nav className="navbar navbar-expand navbar-dark my-primary navbarCustom sticky-top">
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
                        <li>                            
                            <Link 
                                className="nav-link" 
                                style={isActive(history, '/signin'), { cursor: "pointer", color: '#fff' }} 
                                to='/signin'>
                                <img 
                                    style={{
                                        width:"1.5em", 
                                        height:"1.5em" }}
                                    viewBox="0 0 16 16"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABSElEQVRIid2VvU5CQRCFzxKhk0QTOwvttDaa2PgGCuJ9KH9i8C3sDPQ+gj6AEjUaDbYCncVnwb1kInd/RBo91WZ25ny7s7tZ6V8LqAEZcAncm/hdHjsCqrOaN4EXjMyc1TNw8BNjB7QpkQdQ6BxwKYALj0EMANCOmWeB4hQAQMtnXgUe5wB4AmpFbsUwMknr0R7GtSbpsAyw7ynoS1pyzk0OMB8vS3r31Ey8LGDbk7wiabMkvpFDyrQzFQFGgb6OgD2Tuwt8BPKHk92aooGkRc+KJGkgqbghV5Lqgdyhc64uSQsm2I8A6pKuA/NWb8XAnsFtYnGKbsoAnTkCulOR/KH1Io8oRQ/2oX2HtOYAaAT3Bpz9wvw42jygApzOYH4CVKIAA2qSdiY9Am0JfhCMv8OmpIakLUmr+dSrxte6I6nrnPtMXvmf0xdru85s/d6CnQAAAABJRU5ErkJggg=="> 
                                </img>
                            </Link>
                        </li>
                    </ul>
                </div>
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

                        <li className="nav-item">
                            <Link 
                                className='nav-link' 
                                style={isActive(history, '/users')} 
                                to='/users'>
                                    Users
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
                                {`${isAuthenticated().user.name}'s Profile`}
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
