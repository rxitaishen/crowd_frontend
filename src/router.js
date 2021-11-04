import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Details from './pages/details';
import Login from './pages/login';
import Register from './pages/register';

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/detail" component={Details}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;