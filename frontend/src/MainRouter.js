import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';

import NewPost from './post/NewPost';

// import PrivateRoute from './auth/PrivateRoute';



const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path='/' component={Signin} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/post/create' component={NewPost} /> 
            {/* make it PrivateRoute */}
        </Switch>
    </div>
);

export default MainRouter;
