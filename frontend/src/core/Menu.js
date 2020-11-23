import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';
import $ from 'jquery';
import './Custom.css';
import { HomeIcon, PeopleIcon } from '../images/iconIndex.js';


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

                console.log(userResults[0])
                setSearchResults(userResults);
            },

            error: (xhr, status, err) => {
                console.error("Failed to fetch")
            }
        });

    }, [searchTerm]);

    
    if (history.location.pathname === "/"){
        return (            
                <p class="mt-5 mb-3 text-muted fixed-bottom" align="center"><a href="https://github.com/dimosp/CineFriends">SKG.CODE Binge</a> &copy; 2020-2021</p>        
        );
    }
    else if (!isAuthenticated()) {
        return (
            <nav className="navbar navbar-expand-md navbar-dark my-primary navbarCustom sticky-top">              
                <div class="navbar-collapse w-100 order-1 order-md-0 dual-collapse2 col-xs-1" align="center">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active my-auto">
                            <Link 
                                className="nav-link" 
                                style={isActive(history, '/'), { cursor: "pointer", color: '#fff' }} 
                                to='/'>
                                    {HomeIcon()}
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
                    <ul className="navbar-nav mr-auto ">
                        <div className='container icon-backround icon-backround-home'> 
                            <li className="nav-item active my-auto mx-auto">
                                <Link 
                                    
                                    style={isActive(history, '/'), { cursor: "pointer", color: '#fff'}} 
                                    to='/home'>
                                        {HomeIcon()}
                                        
                                </Link>
                            </li>
                            {/* <li className='nav-item mx-auto'>
                                <Link
                                    className='nav-link' 
                                    style={isActive(history, '/'), { cursor: "pointer", color: '#fff' }} 
                                    to={`/home`}
                                >
                                    Home
                                </Link>
                            </li> */}
                        </div>
 

                        <div className='container icon-backround'> 
                            <li className='nav-item my-auto mx-auto '> 
                                <Link 
                                    className="nav-link mr-2"
                                    to={`/users`}>
                                    {PeopleIcon()}
                                </Link>
                            </li>
                            <li className='nav-item mx-auto'>
                                <Link
                                    className='nav-link' 
                                    style={isActive(history, '/users')} 
                                    to={`/users`}
                                >
                                    Discover
                                </Link>
                            </li>
                        </div>
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
                            {searchResults.map(user => user).filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.trim() != "").map(user => (
                                <li class="list-group-item" >
                                    <Link
                                        className="nav-link"
                                        style={isActive(history, '/'), { cursor: "pointer", color: '#000000' }}
                                        to={'/user/' + user._id}>
                                        {user.name}

                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>

                <div class="navbar-collapse w-100 order-3 dual-collapse2" id="sign-out">
                    <ul class="navbar-nav ml-auto">
                        <div className='container icon-backround'> 
                            <li className='nav-item my-auto mx-auto '> 
                                <Link to={`/user/${isAuthenticated().user._id}`}>
                                    <img 
                                        className="rounded-circle mr-2" 
                                        width="30" 
                                        src={`${process.env.REACT_APP_API_URL}/users/photo/${isAuthenticated().user._id}`} 
                                        alt="" 
                                        style={{'box-shadow': '3px 3px 3px 3px #212122'}}
                                    />
                                </Link>
                            </li>
                            <li className='nav-item mx-auto'>
                                <Link
                                    className='nav-link' 
                                    style={isActive(history, `/user/${isAuthenticated().user._id}`)} 
                                    to={`/user/${isAuthenticated().user._id}`}
                                >
                                    {`${isAuthenticated().user.name}`}
                                </Link>
                            </li>
                        </div>

                        {isAuthenticated().user &&  
                            <div class="dropdown d-flex flex-row-reverse">
                                <button class="btn btn-link dropdown-toggle dropdown-arrow" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right text-center" aria-labelledby="gedf-drop1">
                                    <div class="h6 dropdown-header">My account</div>
                                        <li className='nav-item item-dropdown '>
                                            <Link 
                                                className='nav-link text-dark'
                                                
                                                to={`/user/edit/${isAuthenticated().user._id}`} >
                                                Edit Profile
                                            </Link>
                                        </li>
                                        <li className='nav-item item-dropdown' >
                                            <a 
                                                className='nav-link text-dark' 
                                                style={isActive(history, '/signup'), { cursor: "pointer", color: '#fff' }}
                                                onClick={() => signout(() => history.push('/'))}>
                                                Sign Out
                                            </a>
                                        </li>
                                </div>
                            </div>
                        }
                    </ul>
                </div>
            </nav>
            
        );
    }

}

export default withRouter(Menu);
