import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';
import $ from 'jquery';

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
        const urlString = "http://localhost:8080/api/users"
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


    return (
        <div>
            <ul className='nav nav-tabs bg-info'>
                <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/'), { cursor: "pointer", color: '#fff' }} to='/home'>Home</Link>
                </li>

                {/* {!isAuthenticated() && (
                <>
                    <li className='nav-item'>
                        <Link className='nav-link' style={isActive(history, '/signin')} to='/signin'>Sign In</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' style={isActive(history, '/signup')} to='/signup'>Sign Up</Link>
                    </li>
                </>
            )} */}

                {isAuthenticated() && (
                    <>
                        <li className='nav-item'>
                            <Link className='nav-link' style={isActive(history, '/post/create'), { cursor: "pointer", color: '#fff' }} to={`/post/create`}>Create Post</Link>
                        </li>

                        <li className='nav-item'>
                            <a className='nav-link' style={isActive(history), { cursor: "pointer", color: '#fff' }}>{isAuthenticated().user.name}</a>
                        </li>

                        <li className='nav-item'>
                            <a className='nav-link' style={isActive(history, '/signup'), { cursor: "pointer", color: '#fff' }}
                                onClick={() => signout(() => history.push('/'))}>Sign Out</a>
                        </li>

                        <li className='nav-item'>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleChange}
                            />
                        </li>

                        <ul component="nav" aria-label="user results" className='nav-item'>
                            {searchResults.map(user => user.name).filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.trim() != "").map(name => (
                                <li >

                                   {name}

                                </li>
                            ))}
                        </ul>
                    </>
                )}

            </ul>
        </div>
    );
}

export default withRouter(Menu);
