import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Menu from './core/Menu';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';


const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path='/' component={Signin} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/home' component={Home} />
        </Switch>
    </div>
);

export default MainRouter;