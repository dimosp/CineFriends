import React, {Component} from 'react';

import {signin, authenticate} from '../auth/index';

class Signin extends Component {
    render() {
        return (
            <div className='jumbotron'>
                <h2>Signin</h2>
            </div>
        );
    };
};

export default Signin;