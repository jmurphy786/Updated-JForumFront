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


class MainPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = { allPosts: [],
        selectedFile: null,
        img: "",
        redirectPath: ""};
      }

      


      componentDidMount() {
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
        console.log(this.state.img);

        var redirectPath = this.state.redirectPath;

        if (redirectPath === "createPost") {
          return <Redirect to="/createPost" />;
        }
  

      return (

       <div>
           <div>
               <Title />
           </div>
           <div>
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
                     <CreatePost />
                 </div>

              </div>
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
                     <td ><Post post = {item} /></td>
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