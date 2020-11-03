import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: '#000000'}
    else return {color: '#ffffff'}
}

const Menu = ({history}) => (
    <div>
        <ul className='nav nav-tabs bg-info'>
            <li className='nav-item'>
                <Link className='nav-link' style={isActive(history, '/'), {cursor: "pointer", color:'#fff'}} to='/home'>Home</Link>
            </li>
            
//             {!isAuthenticated() && (
//                 <>
//                     <li className='nav-item'>
//                         <Link className='nav-link' style={isActive(history, '/signin')} to='/signin'>Sign In</Link>
//                     </li>
//                     <li className='nav-item'>
//                         <Link className='nav-link' style={isActive(history, '/signup')} to='/signup'>Sign Up</Link>
//                     </li>
//                 </>
//             )}

            {isAuthenticated() && (
                <>
                    <li className='nav-item'>
                        <Link className='nav-link' style={isActive(history, '/post/create')} to={`/post/create`}>Create Post</Link>
                    </li>


                    <li className='nav-item'>
                        <a className='nav-link' style={isActive(history), {cursor: "pointer", color:'#fff'}}>{isAuthenticated().user.name}</a>   
                    </li>

                    <li className='nav-item'>
                        <a className='nav-link' style={isActive(history, '/signup'), {cursor: "pointer", color:'#fff'}} 
                        onClick={() => signout(() => history.push('/'))}>Sign Out</a>   
                    </li>
                </>
            )}

        </ul>        
    </div>
);

export default withRouter(Menu);
