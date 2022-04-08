//MAIN View
import axios from 'axios';
import React from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import {Row, Col, Accordion} from 'react-bootstrap'
import './main-view.scss';
class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }
  componentDidMount(){
    axios.get('https://muvies-app.herokuapp.com/Movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
       console.log(error);
     });
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

  onLoggedOut() {
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
        const { user, movies, selectedMovie } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    if (movies.length === 0) return <div className="main-view" />;
    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
        }
      </Row>
    );
  }
}

    

export default MainView;