import React, { Component } from 'react'
import axios from 'axios'
import MovieView from '../movie-view/movie-view'
import MovieCard from '../movie-card/movie-card'
import {Button, Row, Col } from 'react-bootstrap'
 class MoviesView extends Component {
    constructor(props){
        super(props);
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null,
          Token: props.token,
        };
      }
    

    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

    componentDidMount() {
        axios.get(`https://muvies-app.herokuapp.com/Movies`, {
            headers: { Authorization: `Bearer ${this.state.Token}`}
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

render(){

const { movies, selectedMovie, Token } = this.state;

    return (
  <>
          <Row className="main-view justify-content-md-center">
                {selectedMovie
          ? (
            <Col md={4}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={4}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
          }
        </Row>    
    </>
    )
  }
}

export default MoviesView;