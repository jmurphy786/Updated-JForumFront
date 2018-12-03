import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./comment.css"; 
import $ from 'jquery';
import Popper from 'popper.js';
import logo from './logo.png';
import { BrowserRouter as Router, Redirect  } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button, FormGroup, FormControl, ControlLabel, nav} from "react-bootstrap";

var x;

class comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upvotes : "",
      email: "",
      password: "",
      redirectPath: "",
      isAuthenticated: false,
      date : ""

    };
}

handleCommentUpvote = () =>{
  let xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:8080/api/comments/" + this.props.comment.id + "/upvote");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
  xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  xhttp.responseType = 'json';
  xhttp.send();

  xhttp.onload =() => {
  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8080/api/comments/" + this.props.comment.id + "/upvote");
  request.setRequestHeader("Content-type", "application/json");
  request.setRequestHeader('Access-Control-Allow-Origin','*');
  request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  request.responseType = 'json';
  request.send();

  request.onload = ()=>{
    this.setState({id : request.response.id});
    }
  }

}

handleCommentDownvote = () =>{
  let xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:8080/api/comments/" + this.props.comment.id + "/downvote");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
  xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  xhttp.responseType = 'json';
  xhttp.send();

  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8080/api/comments/" + this.props.comment.id + "/upvote");
  request.setRequestHeader("Content-type", "application/json");
  request.setRequestHeader('Access-Control-Allow-Origin','*');
  request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  request.responseType = 'json';
  request.send();

  request.onload = ()=>{
      this.setState({id : request.response.id});
    }


}


componentDidMount() {
    
    this.setState({ date: this.props.comment.createdDate.substring(0,10) + " " +  this.props.comment.createdDate.substring(11,19), 
    id:this.props.comment.upvotes, username : this.props.comment.username});
}
    render() {
      var x = this.state.id;

    
      return (
       <div>
         <div class="media bg-white" >
        <div class="media-left votes border" >
        <button type = "button" class="btn btn-default btn-primary upvote" onClick = {this.handleCommentUpvote}><span class="glyphicon glyphicon-menu-up"></span></button>
        <p class = "text-warning">{this.state.id}</p>
         <button type = "button" class="btn btn-default btn-primary downvote" onClick = {this.handleCommentDownvote}><span class="glyphicon glyphicon-menu-down"></span></button>
         </div>
         <div class="media-body">
         <h4 class="media-heading bg-white text-warning d-flex">{this.props.comment.username} : {this.state.date}</h4>
        <p1 class = "text-dark d-flex h4 border border-light">{this.props.comment.message} </p1>
        </div>
        </div>
      </div>     
      );
      
    }
}
 
export default comments;