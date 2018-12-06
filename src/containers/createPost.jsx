import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createPost.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

var theId;
class createPost extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = { id : "",
        selectedFile: "",
        img : ""};

        
      }
    

    handleCreatePost = event => {


        var Thetitle = document.getElementById("title").value;

        var Themessage = document.getElementById("message").value;
        console.log(this.props.username);
        var input = JSON.stringify({"title" : Thetitle , "message" : Themessage, "username" : this.props.username});
   
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8080/api/posts");
        //xhttp.setRequestHeader("Content-Type", "multipart/form-data");
        //xhttp.setRequestHeader("Key", "file");
        request.setRequestHeader("Content-type", "application/json");
        request.setRequestHeader('Access-Control-Allow-Origin','*');
        request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
        request.responseType = 'json';
        request.send(input);

        request.onload = () => { 
            console.log(request.response.id);
            theId = request.response.id;
            this.setState({id : request.response.id});

            if(!(this.state.selectedFile == "")){
            const fd = new FormData();
            fd.append("file", this.state.selectedFile);
            console.log(theId);
            console.log(this.state.id);
        
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost:8080/api/posts/" + theId + "/upload" );
            xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
            xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
            xhttp.send(fd);
            xhttp.onload = () => { 
            
            ;}
            }  
          };
      }
      imgfileSelectedHandler = event => {
        this.setState({
          selectedFile: event.target.files[0]
        })
        console.log(event.target.files[0]);
     }

     vidfileSelectedHandler = event => {
      this.setState({
        selectedFile: event.target.files[0]
      })
      console.log(event.target.files[0]);
   }

    render() {
    


      return (

       <div>

         <form>
           <div class="form-group">

           <label for="PostTitle">PostTitle:</label>
           <input type = "title" class="form-control" id="title"></input>

           </div>
           <div class="form-group">

           <label for="PostMessage">Message:</label>
           <input type = "message" class="form-control"  id="message"></input>

           </div>
         </form>

            <div id="upload_button">
            <label class = "uploadPic">
            <input type = "file"  ngf-select onChange={this.imgfileSelectedHandler} nv-file-select uploader="$ctrl.uploader" multiple/>
            <span class="glyphicon glyphicon-picture btn-warning btn-lg"></span>
            </label>
            
            <label class = "uploadFile">
            <input type = "file"  ngf-select onChange={this.vidSelectedHandler} nv-file-select uploader="$ctrl.uploader" multiple/>
            <span class="glyphicon glyphicon-film btn-warning btn-lg"></span>
            </label>
            </div>

          

           <div class = "buttons">
           <button type = "createPost" onClick = {this.handleCreatePost} class=" btn-lg btn-secondary mr-sm-2">CreatePost</button>
           </div>
      </div>     
      );
      
    }
}
 
export default createPost;