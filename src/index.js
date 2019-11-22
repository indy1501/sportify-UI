import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPage from './components/UserPage';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import {createBrowserHistory} from 'history';
import LogInPage from './components/LogInPage';
import SearchBusiness from './business/SearchBusiness';
import BusinessDetails from './business/BusinessDetails';
import AdminPageBusiness from './business/AdminPageBusiness';
import CreateBusiness from './business/CreateBusiness';
import UpdateBusiness from './business/UpdateBusiness';

const history =  createBrowserHistory();
/*
        <Route path="/users" component={Users} />
        <Route path="/contact" component={Contact} />

*/
const routing = (
    <BrowserRouter history={history}>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/login" component={LogInPage}/>
                <Route path="/user" component={UserPage} />
                <Route path="/search" component={SearchBusiness}/> 
                <Route path="/businessDetails/:id" component={BusinessDetails}/> 
                <Route path="/businessAdmin" component={AdminPageBusiness}/> 
                <Route path="/createBusiness" component={CreateBusiness}/>
                <Route path="/updateBusiness/:id" component={UpdateBusiness}/>
            </Switch>
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
