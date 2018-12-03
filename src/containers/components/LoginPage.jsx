import React, { Component } from 'react';
import "./LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';
import logo from './logo.png';
import { BrowserRouter as Router, Redirect  } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button, FormGroup, FormControl, ControlLabel, Nav, span} from "react-bootstrap";
import { timingSafeEqual } from 'crypto';



class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = { username : "",
    redirectPath : "", 
    loggedIn : "",
    pathname : ""
  }
}
  

  handleLogin=()=> {
      this.setState({pathname : "/login"});
      var uName = document.getElementById("uname").value;
      var pass = document.getElementById("pwd").value;

      var params = JSON.stringify({"username" : uName , "password" : pass});
      console.log(params);

      let request = new XMLHttpRequest();
      request.open("POST", "http://localhost:8080/api/person/login");
      request.setRequestHeader("Content-type", "application/json");
      request.setRequestHeader('Access-Control-Allow-Origin','*');
      request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
      request.responseType = 'json';
      request.send(params);
  
      request.onload = ()=>{
   
            if(request.response == true){
              this.setState({redirectPath : request.response, username : uName, loggedIn : "true"})
              console.log("correct login");
            }
            else{
              console.log("Incorrect Login");
            }
        }
      }
  

    render() {
    
      var redirectPath = this.state.redirectPath;

      if (redirectPath == true) {
        return <Redirect to=
        {{pathname: "/Main", 
          state : {
          username : this.state.username,
          loggedIn : this.state.loggedIn,
          pathname : this.state.pathname}}}/>
      }

      return (

       <div>
         <form>
           <div class="form-group">

           <label for="uname">Username:</label>
           <input type = "username" class="form-control" id="uname"></input>

           </div>
           <div class="form-group">

           <label for="pwd">Password:</label>
           <input type = "password" class="form-control"  id="pwd"></input>
           </div>
         </form>
         <button  class=" btn-lg btn-secondary mr-sm-2" onClick = {this.handleLogin}>Sign In</button>
      </div>     
      );
      
    }
}
 
export default LoginPage;