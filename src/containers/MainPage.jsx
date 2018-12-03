import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Title from "./components/title.jsx";
import CreatePost from "./createPost.jsx";
import Post from "./components/post.jsx";
import { BrowserRouter as Router, Redirect  } from 'react-router-dom';
import ImgsViewer from 'react-images-viewer'
import { isUndefined } from 'util';


class MainPage extends Component {
    constructor(props) {
        super(props);
        

        this.state = { allPosts: [],
        selectedFile: null,
        img: "",
        redirectPath: "",
        username : "",
        message : "",
        username : ""};
      }


      componentDidMount() {
        if((this.state.username == "")){
          this.setState({message : "Welcome back! " + this.props.location.state.username, username : this.props.location.state.username});
          }


        let request = new XMLHttpRequest();
    
        request.open("GET", "http://localhost:8080/api/posts");
    
        request.setRequestHeader("Content-Type", "application/json");
    
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
    
        request.responseType = "json";
    
        request.send();
    
        request.onload = () => {

          this.setState({ allPosts: request.response });
        };


        let html = new XMLHttpRequest();
    
        html.open("GET", "http://localhost:8080/api/Image/1");
    
        html.setRequestHeader("Content-Type", "application/json");
    
        html.setRequestHeader("Access-Control-Allow-Origin", "*");
    
        html.send();
    
        html.onload = () => {
          this.setState({ img: "data:image/jpeg;base64," + html.response });
        };
      }

      handleCreatePost = event => {
        this.setState({ redirectPath: "createPost" });
      }

   



    render() {


        var redirectPath = this.state.redirectPath;
        var myUser = this.state.username;
        if (redirectPath === "createPost") {
          return <Redirect to="/createPost" />;
        }



      return (

       <div>
           <div>
               <Title />
           </div>
       
           <div>
            <h2 class = "welcome">{this.state.message}</h2>
           <button class = "postbtn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Make A Post!</button>
           <div class="modal" id="myModal">
                     <div class="modal-dialog">
                        <div class="modal-content">
                 <div class="modal-header">
                    <h4 class="modal-title">Make a Post</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                 <div class="modal-body">
                 </div>
                     <CreatePost username = {myUser}/>
                 </div>
              </div>
             </div>
            </div>

            <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           Sort By:
           </button>
           <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" onClick = "sortByUpvotes">Number of Upvotes.</a>
              <a class="dropdown-item" href="#">Recently Created.</a>
            </div>
          </div>
            <div class="table-responsive ">          
                <table class="table table-bordered">
                <thead class = "bg-warning">
                    <tr>
                         <th>Posts</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.allPosts
                .map(function(item, key) {
                return (
          
                <tr key = {key}>
                     <td ><Post post = {item} username = {myUser}/></td>
                </tr>
                );})}
               </tbody>
               </table>
            </div>     

      </div>     
      );
      
    }
}
 
export default MainPage;