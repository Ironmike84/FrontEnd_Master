import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  
  
  render() {
  
    const ImageStyle = { 
      marginTop: '15px',
      marginLeft: '22%',
      width: '200px',
      height: '300px'
    }

    const BodyStyle ={
      margin: '20px',
      width: '350px',
      height: '570px',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.17)',
      boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
    }
    
    const { movie, onMovieClick } = this.props;




    return (
      <Card style={BodyStyle}>
        <Card.Img style={ImageStyle} variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}