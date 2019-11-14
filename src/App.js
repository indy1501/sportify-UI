import React, { Fragment } from 'react';
import './App.css';
import UserPage from './components/UserPage';
import LogInPage from './components/LogInPage';
import { Link } from 'react-router-dom';
import SearchBusiness from './business/SearchBusiness';

function App(props) {
  

  if (props.location && props.location.hash) {
    console.log(props.location.hash);
    const tokenArr = props.location.hash.split("&");
    if(tokenArr.length > 0) {
      const token = tokenArr[0].replace("#id_token=", "").replace("#access_token=", "")
      sessionStorage.setItem("token", token);
    }
  }

  const sessionToken = sessionStorage.getItem("token")

  const isValid =  sessionToken != undefined &&  sessionToken.length>0 ;

  console.log("IsValid", isValid);

  return (
    <Fragment>
         {isValid && 
         <SearchBusiness></SearchBusiness>
        } 
        {
          !isValid && 
          <LogInPage></LogInPage>
        }

        

       


    </Fragment>
   
  );
}

export default App;
