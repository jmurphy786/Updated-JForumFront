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
      date : "",
      upvotes : ""

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

    this.setState({upvotes : xhttp.response.upvotes});
    }
  }

deleteComments = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:8080/api/posts/" + this.props.postId + "/comments/" + this.props.comment.id);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
  xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  xhttp.responseType = 'json';
  xhttp.send();

  xhttp.onload =() => {

    console.log("Deleted");
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

  xhttp.onload = ()=>{
      this.setState({upvotes : xhttp.response.upvotes});
    }
}

componentDidMount() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/api/comments/" + this.props.comment.id + "/upvotes");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
  xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  xhttp.responseType = 'json';
  xhttp.send();

  xhttp.onload =() => {
    this.setState({ date: this.props.comment.createdDate.substring(0,10) + " " +  this.props.comment.createdDate.substring(11,19), 
    id:this.props.comment.upvotes, username : this.props.comment.username, upvotes : xhttp.response.upvotes});
}
}
    render() {
      var x = this.state.id;

    
      return (
       <div>
         <div class="media bg-white" >
        <div class="media-left votes border" >
        <button type = "button" class="btn btn-default btn-primary upvote" onClick = {this.handleCommentUpvote}><span class="glyphicon glyphicon-menu-up"></span></button>
        <p class = "text-warning">{this.state.upvotes}</p>
         <button type = "button" class="btn btn-default btn-primary downvote" onClick = {this.handleCommentDownvote}><span class="glyphicon glyphicon-menu-down"></span></button>
         </div>
         <div class="media-body">
         <h4 class="media-heading bg-white text-warning d-flex">{this.props.comment.username} : {this.state.date}</h4>
        <p1 class = "text-dark d-flex h4 border border-light">{this.props.comment.message}    <button type = "button" class="btn btn-default btn-dark delete" onClick = {this.deleteComments}><span class="
        glyphicon glyphicon-trash"></span></button></p1>

        </div>
        </div>
      </div>     
      );
      
    }
}
 
export default comments;