//MAIN View
import axios from 'axios';
import React from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import {Row, Button,Routes, Col, Accordion} from 'react-bootstrap'
import { BrowserRouter as Router, Route } from "react-router-dom";


import './main-view.scss';
class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null
    };
  }
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      // this.setState({
      //   user: localStorage.getItem('user')
      // });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.UserName
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.UserName);
    this.getMovies(authData.token);
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
  const { movies, user } = this.state;

  if (!user) return <Row>
    <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    </Col>
  </Row>
  if (movies.length === 0) return <div className="main-view" />;

  return (
    <Router>
      <Routes>
      <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          return movies.map(m => (
            <Col md={3} key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ))
        }} />
        <Route path="/movies/:movieId" render={({ match }) => {
          return <Col md={8}>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
          </Col>
        }} />

      </Row>
      </Routes>
    </Router>
  );
}
}

export default MainView;