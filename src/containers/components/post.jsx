import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './post.css'
import $ from 'jquery';
import Popper from 'popper.js';
import logo from './logo.png';
import { BrowserRouter as Router, Redirect  } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button, FormGroup, FormControl, ControlLabel, Nav, span} from "react-bootstrap";
import { timingSafeEqual } from 'crypto';

var x = 0;

class post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      id : this.props.post.id,
      upvotes: this.props.post.upvotes,
      title: this.props.post.title,
      message: this.props.post.message,
      date: this.props.post.date,
      allComments : this.props.post.allComments,
      redirectPath : "",
      img : ""
    };
  
  }

  componentWillMount() {
    
      this.setState({ date: this.props.post.date.substring(0,10) + " " +  this.props.post.date.substring(11,19)});
      let html = new XMLHttpRequest();
    
      html.open("GET", "http://localhost:8080/api/Image/" + this.state.id);
  
      html.setRequestHeader("Content-Type", "application/json");
  
      html.setRequestHeader("Access-Control-Allow-Origin", "*");
  
      html.send();
  
      html.onload = () => {
        this.setState({ img: "data:image/jpeg;base64," + html.response });
      };
  }

  handleUpvote = () =>{
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8080/api/posts/" + this.state.id + "/upvote");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
    xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    xhttp.responseType = 'json';
    xhttp.send();
 
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/api/posts/" + this.state.id + "/upvote");
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader('Access-Control-Allow-Origin','*');
    request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    request.responseType = 'json';
    request.send();

    request.onload = ()=>{
     x = request.response;
      }

  }

  handleDownvote = () =>{
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8080/api/posts/" + this.state.id + "/downvote");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
    xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    xhttp.responseType = 'json';
    xhttp.send();
 
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/api/posts/" + this.state.id + "/upvote");
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader('Access-Control-Allow-Origin','*');
    request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    request.responseType = 'json';
    request.send();

    request.onload = ()=>{
     x = request.response;

      }

  }


  onError(img){
    delete img.onerror;
    // Change the url
    //img.src = 'images/noload.jpg';
    
    // or just hide it (jQuery)
    //jQuery(img).hide();
}

  handleClick = event => {
    this.setState({ redirectPath: "postPage" });
  }

    render() {

      if(this.state.img == "none"){
        this.setState({img : ""});
        document.getElementById("theImg").style.display = "none";
      }
      if(!(x == 0)){
      this.setState({upvotes : x.upvotes});
      }

      var redirectPath = this.state.redirectPath;

      if (redirectPath === "postPage") {
        return <Redirect to=
        {{pathname: "/postPage",
          state : {id : this.props.post.id,
            upvotes: this.props.post.upvotes,
            title: this.props.post.title,
            message: this.props.post.message,
            allComments : this.props.post.allComments,
            date: this.props.post.date}}}/>;
      }


      return (
        <div>
        <div class="media bg-dark">
        <div class="media-left votes border border-dark">
        <button type = "button" class="btn btn-default btn-primary upvote" onClick = {this.handleUpvote}><span class="glyphicon glyphicon-menu-up"></span></button>
        <p class = "text-warning">{this.state.upvotes}</p>
         <button type = "button" class="btn btn-default btn-primary downvote" onClick = {this.handleDownvote}><span class="glyphicon glyphicon-menu-down"></span></button>
         </div>
         <div class="media-body">
         <h2 class="media-heading bg-dark text-warning d-flex"><a href="" onClick = {this.handleClick}>{this.state.title}</a> -Uploaded at : {this.state.date}</h2>
        <p1 class = "text-light d-flex h2">{this.state.message} </p1>
        <img class = "theImg" id="theImg" src={this.state.img} onerror="onError(this)"></img>
        </div>
        </div>


        </div>
      );
      
    }
}
 
export default post;