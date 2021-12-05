import React from 'react';
import { BrowserRouter, Router,Route, Switch } from 'react-router-dom';
import App from './App';
import Details from './pages/details';
import Login from './pages/login';
import Register from './pages/register';
import RaiseCrowd from './pages/raisecrowd';
import MyCrowd from './pages/mycrowd'
import SortPage from './pages/sortpage';
import Completepage from './pages/completepage';
import Pinfo from './pages/pinfo';
import Pfrom from './pages/pinfo/pfrom';
import ProjectFrom from './pages/pinfo/projectfrom';
const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/detail" component={Details} />
            <Route path="/raiseCrowd" component={RaiseCrowd} />
            <Route path="/mycrowd" component={MyCrowd} />
            <Route path="/sortPage" component={SortPage} />
            <Route path="/completepage" component={Completepage} />
            <Route  path="/pinfo" component={Pinfo}/>
            <Route  path="/" component={App} />

        </Switch>
    </BrowserRouter>
);


export default BasicRoute;