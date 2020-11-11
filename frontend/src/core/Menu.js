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
                const userResults = searchResults.users
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
            <nav className="navbar navbar-expand navbar-dark my-primary navbarCustom sticky-top ">
                <div class="navbar-collapse w-100 order-1 order-md-0 dual-collapse2 col-xs-1" align="center">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" style={isActive(history, '/'), { cursor: "pointer", color: '#fff' }} to='/home'>Home</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );


    }
    else if (isAuthenticated()){
        return (

            <nav className="navbar navbar-expand-md navbar-dark my-primary sticky-top ">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-nav, #sign-out" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-collapse w-100 order-1 order-md-0 dual-collapse2 col-xs-1" align="center" id="main-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" style={isActive(history, '/'), { cursor: "pointer", color: '#fff' }} to='/home'>Home</Link>
                        </li>

                        <li className='nav-item'>
                            <Link className='nav-link' style={isActive(history, '/post/create'), { cursor: "pointer", color: '#fff' }} to={`/post/create`}>Create Post</Link>
                        </li>

                        <li className='nav-item'>
                            <a className='nav-link' style={isActive(history), { cursor: "pointer", color: '#fff' }}>{isAuthenticated().user.name}</a>
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

                            <ul component="nav" aria-label="user results" class="list-group ">
                                {searchResults.map(user => user.name).filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.trim() != "").map(name => (
                                    <li class="list-group-item" >

                                        <Link className="nav-link" style={isActive(history, '/'), { cursor: "pointer", color: '#000000' }} to='/home'>{name}</Link>
                                        
                                    </li>
                                ))}

                        </ul>
                    </form>
                </div>

                <div class="navbar-collapse w-100 order-3 dual-collapse2" id="sign-out">
                    <ul class="navbar-nav ml-auto">
                        <li className='nav-item d-flex flex-row-reverse' >
                            <a className='nav-link' style={isActive(history, '/signup'), { cursor: "pointer", color: '#fff' }}
                                onClick={() => signout(() => history.push('/'))}>Sign Out</a>
                        </li>
                    </ul>
                </div>

            </nav>
        );
    }
   
}

export default withRouter(Menu);
