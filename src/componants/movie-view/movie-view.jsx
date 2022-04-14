//MOVIE VIEW 
import React from 'react';
import './movie-view.scss';
import { Link } from 'react-router-dom'
class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img className='movie-image' src={movie.ImagePath}/>
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
      
        <div className='details'>Details:</div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre}</span>
          </div>
        <div className="movie-rating">
          <span className="label">Rating: </span>
          <span className="value">{movie.Rating}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/Director/${movie.Director}`}>Director</Link>
          <span className="value">{movie.Director}</span>
        </div>
        

   
          <div className='Actors-Title'>Actors:</div>
        <div className="Star-Actor">
          <span className="label">StarActor: </span>
          <span className="value">{movie.StarActor}</span>
        </div>
        <div className="Supporting-Actor">
          <span className="label">SupportingActor: </span>
          <span className="value">{movie.SupportingActor}</span>
        </div>
        <div className="Cast">
          <span className="label">Cast: </span>
          <span className="value">{movie.Cast}</span>
        </div>
   
        <button class='btn btn-link Movie-Btn'  onClick={() => { onBackClick(null); }}>Back</button>
  
      </div>
      
    );
  }
}

export default MovieView;