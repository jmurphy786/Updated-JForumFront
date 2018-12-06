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
      username: this.props.username,
      Puser : this.props.post.username,
      id : this.props.post.id,
      upvotes: this.props.post.upvotes,
      title: this.props.post.title,
      message: this.props.post.message,
      date: this.props.post.date,
      allComments : this.props.post.allComments,
      redirectPath : "",
      img : "",
      vidFile : ""
    };
  
  }

  componentWillMount() {
    
      this.setState({ date: this.props.post.date.substring(0,10) + " " +  this.props.post.date.substring(11,19)});

      let request = new XMLHttpRequest();
      request.open("GET", "http://localhost:8080/api/getFile/" + this.state.id);
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Access-Control-Allow-Origin", "*");
      request.send();
      request.onload = () => {
      var extension = request.response;
      console.log(extension);
      if(extension == "jpg" || extension == "JPG"){
         let html = new XMLHttpRequest();
         html.open("GET", "http://localhost:8080/api/Image/" + this.state.id);
         html.setRequestHeader("Content-Type", "application/json");
         html.setRequestHeader("Access-Control-Allow-Origin", "*");
         html.send();
         html.onload = () => {
            this.setState({ img: "data:image/jpeg;base64," + html.response });
         };
      }

      
      if(extension == "gif"){
        let html = new XMLHttpRequest();
        html.open("GET", "http://localhost:8080/api/gif/" + this.state.id);
        html.setRequestHeader("Content-Type", "application/json");
        html.setRequestHeader("Access-Control-Allow-Origin", "*");
        html.send();
        html.onload = () => {
           this.setState({ img: "data:image/gif;base64," + html.response });
        };
      }

      if(extension == "mp4"){
        let html = new XMLHttpRequest();
        html.open("GET", "http://localhost:8080/api/mp4/" + this.state.id);
        html.setRequestHeader("Content-Type", "application/json");
        html.setRequestHeader("Access-Control-Allow-Origin", "*");
        html.send();
        html.onload = () => {
   
           this.setState({ img: "data:video/mp4;base64," + html.response });
           console.log(this.state.img);
        };
      }
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
    xhttp.onload = () => {
      this.setState({upvotes : xhttp.response.upvotes});
       };

  }

  handleDownvote = () =>{
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8080/api/posts/" + this.state.id + "/downvote");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
    xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    xhttp.responseType = 'json';
    xhttp.send();
    xhttp.onload = () => {
     this.setState({upvotes : xhttp.response.upvotes});
      };
  }

  deletePost = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8080/api/posts/" + this.state.id);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
    xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    xhttp.responseType = 'json';
    xhttp.send();
  
    xhttp.onload =() => {
  
      console.log("Deleted");
      };
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
      console.log(this.props.username);

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
            username : this.state.username,
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
        <p class = "text-warning" >{this.state.upvotes}</p>
         <button type = "button" class="btn btn-default btn-primary downvote" onClick = {this.handleDownvote}><span class="glyphicon glyphicon-menu-down"></span></button>
         </div>
         <div class="media-body">
         <h2 class="media-heading bg-dark text-warning d-flex"><a href="" onClick = {this.handleClick}>{this.state.title}</a> -Uploaded at : {this.state.date} By : {this.state.Puser}</h2>
        <p1 class = "text-light d-flex h2">{this.state.message} </p1>
        <img class = "theImg" id="theImg" src={this.state.img} onerror="onError(this)"></img>
        </div>
        <button type = "button" class="btn btn-default btn-dark delete" onClick = {this.deletePost}><span class="
        glyphicon glyphicon-trash"></span></button>
        </div>


        </div>
      );
      
    }
}
 
export default post;