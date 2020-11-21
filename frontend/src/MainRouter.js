import React from 'react';
import { Route, Switch} from 'react-router-dom';
import LandingPage from './pages/index';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import PrivateRoute from './auth/PrivateRoute';
import NewPost from './post/NewPost';
import EditPost from './post/EditPost';

const MainRouter = () => (
    <div>
     <Menu />
        <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            <PrivateRoute exact path='/home' component={Home} /> 
            <PrivateRoute exact path='/users' component={Users} />
            <PrivateRoute exact path='/post/edit/:postId' component={EditPost} />
            <PrivateRoute exact path='/user/edit/:userId' component={EditProfile} />
            <PrivateRoute exact path='/findpeople' component={FindPeople} />
            <PrivateRoute exact path='/user/:userId' component={Profile} />
            <PrivateRoute exact path='/post/create' component={NewPost} /> 
        </Switch>
    </div>
);

export default MainRouter;