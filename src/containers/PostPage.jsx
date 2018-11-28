import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostPage.css'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Title from "./components/title.jsx";
import Post from "./components/post.jsx";
import Comments from "./components/comments.jsx";


class PostPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = { allComments: [], 
                       postId : ""};
      }


       componentDidMount() {
        let request = new XMLHttpRequest();
    
        request.open("GET", "http://localhost:8080/api/posts/" + this.props.location.state.id + "/comments");
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader('Access-Control-Allow-Origin','*');
        request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
        request.responseType = 'json';
    
        request.send();
    
        request.onload = () => { 
          this.setState({allComments : request.response.content});
          
        };
      }

      handleCreateMessage = () =>{

        var Themessage = document.getElementById("commentMessage").value;

        var input = JSON.stringify({"message" : Themessage});
   
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8080/api/posts/" + this.props.location.state.id + "/comments");
        //xhttp.setRequestHeader("Content-Type", "multipart/form-data");
        //xhttp.setRequestHeader("Key", "file");
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader('Access-Control-Allow-Origin','*');
        request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
        request.responseType = 'json';
        request.send(input);

        request.onload = () => { 
      }
    }

    
    render() {
        console.log(this.state.allComments);
        console.log(this.props.location.state.id);

      return (

      
          <div>
               <Title />
                <div class = "middle">
                
                <table class="postTable table-bordered">
                <thead class = "bg-warning">
                    <tr>
                         <th class = "h1">Post</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                     <td ><Post post = {this.props.location.state} /></td>
                </tr>
               </tbody>
               </table>
               <button class = "commentbtn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Make a comment!</button>
              
                <div class="modal" id="myModal">
                     <div class="modal-dialog">
                        <div class="modal-content">
                 <div class="modal-header">
                    <h4 class="modal-title">Make a comment</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                 <div class="modal-body">
                     <form>
                         <div class="form-group">
                            <label for="commentMessage">Message:</label>
                             <input type = "commentMessage" class="form-control"  id="commentMessage"></input>
                      </div>
                     </form>
                     <button type = "createMessage" onClick = {this.handleCreateMessage} class=" btn btn-secondary mr-sm-2">CreateMessage</button>
                 </div>
                 <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

              </div>
             </div>
            </div>
                <table class="postTable" >
                <tbody >
                {this.state.allComments
                .map(function(item, key) {
                return (
                <tr key = {key}>
                     <th ><Comments comment = {item}/></th>
                </tr>
                );})}
               </tbody>
               </table>
                    </div>
    
        </div>
        
      );
      
    }
}
 
export default PostPage;