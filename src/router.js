import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Details from './pages/details';
import Login from './pages/login';
import Register from './pages/register';
import RaiseCrowd from './pages/raisecrowd';
import MyCrowd from './pages/mycrowd'
import SortPage from './pages/sortpage';
import Completepage from './pages/completepage';
const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/detail" component={Details}/>
            {/* <Route exact path="/historyProject" component={Details}/> */}
            <Route exact path="/raiseCrowd" component={RaiseCrowd}/>
            <Route exact path="/mycrowd" component={MyCrowd}/>
            <Route exact path="/sortPage" component={SortPage}/>
            <Route exact path="/comletepage" component={Completepage}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;