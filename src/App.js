import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import './App.css';
import MainPage from './containers/MainPage';
import PostPage from './containers/PostPage';
import CreatePost from './containers/createPost';
import Login from './containers/components/LoginPage';




class App extends Component {

  constructor(props) {
    super(props); 
  }

  render() {
   

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/postPage" component={PostPage} />
          <Route path="/createPost" component={CreatePost} />
          <Route path="/Main" component={MainPage} />
        </div>
      </Router>
      
    );
  }
}

export default App;