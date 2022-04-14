//MAIN View
import axios from 'axios';
import React from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import MoviesView from '../movies/movies-view'
import {Row, Button, Col, Button, Accordion} from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import ProfileView from '../Profile-View/profile-view'
import NavBar from '../Nav-Bar/NavBar'

import './main-view.scss';
import MoviesView from '../movies/movies-view';
class MainView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        user: null,
        Token: null,
    };
  }
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    // if (accessToken !== null) {
      // this.setState({
      //   user: localStorage.getItem('user')
      // });
      this.getMovies(accessToken);
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.UserName
    });
  
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
        const { user, movies, Token, selectedMovie } = this.state;
      
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        
        return (
      <>
      <Button className="btn btn-danger LogOut" onClick={() => { this.onLoggedOut() }}>Logout</Button>
      <NavBar/>
      <h5>Welcome {user}!</h5> 
      <Routes>
        <Route path={"/"} element={<ProfileView user={user}/>}></Route>
        <Route path={"/Movies"} element={<MoviesView token={Token} user={user} />}></Route>
      </Routes>  
      </>
    );
  }
}

    

export default MainView;