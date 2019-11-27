import React from 'react';
import ReactDOM from 'react-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import './index.css';
import App from './App';

import Login from './components/auth/Login';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPage from './components/UserPage';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import {createBrowserHistory} from 'history';
import Home from './components/Home';
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
// function onAuthRequired({ history }) {
//   history.push('/login');
// }

const routing = (
    <BrowserRouter history={history}>
            <Security
              issuer="https://dev-810207.okta.com/oauth2/default"
              client_id="0oa1x4j4t9mmLgVD1357"
              redirect_uri={window.location.origin + '/implicit/callback'}
              //onAuthRequired={onAuthRequired}
            >
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/home" exact component={Home}/>
                <Route path="/login" component={LogInPage}/>
                <Route path="/user" component={UserPage} />
                <Route path="/search" component={SearchBusiness}/> 
                <Route path="/businessDetails/:id" component={BusinessDetails}/> 
                <Route path="/businessAdmin" component={AdminPageBusiness}/> 
                <Route path="/createBusiness" component={CreateBusiness}/>
                <Route path="/Redirect" component={App}/>
                <Route path="/updateBusiness/:id" component={UpdateBusiness}/>
                <Route path="/loginokta" render={() => ( <Login baseUrl="https://dev-810207.okta.com" /> )}/>
                <Route path="/implicit/callback" component={ImplicitCallback} />
            </Switch>
            </Security>
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
