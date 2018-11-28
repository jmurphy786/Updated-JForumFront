import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./title.css"; 
import $ from 'jquery';
import Popper from 'popper.js';
import logo from './logo.png';
import { BrowserRouter as Router, Redirect  } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button, FormGroup, FormControl, ControlLabel, nav} from "react-bootstrap";


class title extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirectPath: "",
      isAuthenticated: false

    };
}

    handleHome = event => {
      this.setState({redirectPath : "/"})
    }
    
    handleLogin = event => {
      this.setState({ redirectPath: "login" });
    }

    render() {
    var redirectPath = this.state.redirectPath;
    if (redirectPath === "login") {
      return <Redirect to="/login" />;
    }
    if (redirectPath === "/") {
      return <Redirect to="/" />;
    }

    
      return (
       <div class = "thenav bg-dark border border-light">
        <div class="row ">
             <div class="col-md-2 first">
             <p class="text-warning"><img src={logo} class = "logo" onClick={this.handleHome}></img>     Jforum  </p>
             </div>
        <div class="col-md-6 middle">
        <form class="searchForm form-inline ">
      <div>
          <input type="text" class="input form-control" placeholder="Search"></input>
          </div>
        <button type="submit" class="btn btn-default btn-warning">Search</button>
      </form>
      </div>
      <div class="col-md-2 end">
      <button type="button" class="btn btn-light button1" onClick = {this.handleLogin}>Log In</button>
      <button type="button" class="btn btn-warning button2">Sign Up</button>
             </div>
        </div>
      </div>     
      );
      
    }
}
 
export default title;