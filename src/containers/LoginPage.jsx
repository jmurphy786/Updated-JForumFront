import React, { Component } from 'react';
import "./LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


class LoginPage extends Component {

    
    render() {
    


      return (

       <div>
         <h1></h1>
         <h2 className = "SignIn" class="large bg-dark text-white">Sign In</h2>
         <h3></h3>
         <form>
           <div class="form-group">

           <label for="email">Username:</label>
           <input type = "email" class="form-control" id="email"></input>

           </div>
           <div class="form-group">

           <label for="pwd">Password:</label>
           <input type = "password" class="form-control"  id="pwd"></input>

           </div>
           <div class = "buttons">
           <button type = "signUp" class=" btn-lg btn-secondary mr-sm-2">Sign Up</button>
           <button type = "submit" class=" btn-lg btn-secondary mr-sm-2">Sign In</button>
           </div>
         </form>
      </div>     
      );
      
    }
}
 
export default LoginPage;