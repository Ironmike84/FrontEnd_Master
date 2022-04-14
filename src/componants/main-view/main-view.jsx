//MAIN View
import axios from 'axios';
import React from 'react';
import {Row, Button, Col, Button, Accordion} from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import ProfileView from '../Profile-View/profile-view'
import { LoginView } from '../login-view/login-view';
import NavBar from '../Nav-Bar/NavBar'
import './main-view.scss';
import MoviesView from '../movies/movies-view';
import DirectorView from '../director-view/director-view';

class MainView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        user: null,
        Token: null,
        userInfo: null
    };
  }

  //----------------------------------------------// GET Token
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
      this.getMovies(accessToken);
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.UserName
    });
    this.setState({
      userInfo: authData.user
    })
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.UserName);
    this.getMovies(authData.token);
    this.setState({Token: authData.token})
  }

  onLoggedOut(e) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
        user: null
    });
}
//--------------------------------------------------------------GET T
getMovies(token) {
    axios.get(`https://muvies-app.herokuapp.com/Movies`, {
        headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
      }
      render() {
      const { user, Token, userInfo} = this.state;
      
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
      
      return (
      <>
      <Button className="btn btn-danger LogOut" onClick={() => { this.onLoggedOut() }}>Logout</Button>
      <NavBar/>
      <h5>Welcome {user}!</h5> 
      <Routes>
        <Route path={"/"} element={<ProfileView user={user} token={Token} userInfo={userInfo}/>}></Route>
        <Route path={"/Movies"} element={<MoviesView user={user} token={Token} />}></Route>
        <Route path={"/Directors"} element={<DirectorView  user={user} token={Token}/>}></Route>
      </Routes>  
      </>
    );
  }
}

    

export default MainView;