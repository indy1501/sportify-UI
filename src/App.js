import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import UserPage from './components/UserPage';
import LogInPage from './components/LogInPage';
import Home from './components/Home';
import Login from './components/auth/Login';
import { Link } from 'react-router-dom';
import SearchBusiness from './business/SearchBusiness';
import AdminPageBusiness from './business/AdminPageBusiness';
import { Navbar } from 'react-bootstrap';
import LogOut from './components/LogOut';
var jwt = require('jsonwebtoken');

function App(props) {


  if (props.location && props.location.hash) {
    console.log(props.location.hash);
    const tokenArr = props.location.hash.split("&");
    if (tokenArr.length > 0) {
      const token = tokenArr[0].replace("#id_token=", "").replace("#access_token=", "")
      sessionStorage.setItem("token", token);
    }
  }

  const sessionToken = sessionStorage.getItem("token")
  var decoded = jwt.decode(sessionToken);
  // get the decoded payload and header
  var decoded = jwt.decode(sessionToken, { complete: true });
  //console.log(decoded.header);
  //console.log(decoded.payload);

  const isValid = sessionToken != undefined && sessionToken.length > 0;
  console.log("IsValid", isValid);
  if (isValid) {
    var userObj = decoded.payload;
    sessionStorage.setItem("userEmail", userObj.email);
    sessionStorage.setItem("userName", userObj["cognito:username"]);
    sessionStorage.setItem("userObj", JSON.stringify(userObj));
    console.log("userObj", userObj);
    var isAdmin = userObj && userObj["cognito:groups"] && userObj["cognito:groups"].filter(g => g == "AdminGroup").length > 0;
  }

  

  return (
    <Fragment>
      {isValid && !isAdmin &&
        <SearchBusiness />
      }
      {
        isValid && isAdmin &&
        <div>

          <AdminPageBusiness />
        </div>

      }
      {
        !isValid &&
        <LogInPage></LogInPage>
      }



    </Fragment>

  );
}

export default App;
