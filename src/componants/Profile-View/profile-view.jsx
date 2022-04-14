//MAIN View
import axios from 'axios';
import React from 'react';
import './profile-view.scss'
import UserImage from '../Images/user.png'
import {Row, Col, Accordion} from 'react-bootstrap'
import DirectorCard from '../directors-card/director-card'
import DirectorInfo from '../director-info/director-info'
class ProfileView extends React.Component {
constructor(props){
  super(props);
  this.state={
   UserData:null,
   User:props.user,
   Token:props.token,
   UsersName:null,
   UsersEmail:null,
   UsersImage:null,
   UsersBirth:null,
   FavoriteMovies: null,
  }
}
componentDidMount() {
  axios.get(`https://muvies-app.herokuapp.com/users/${this.state.User}`, {
      headers: { Authorization: `Bearer ${this.state.Token}`}
  })
      .then(response => {
          this.setState({
            userData: response.data
          });
          this.setState({
            UsersName: response.data.UserName
          });
          this.setState({
            UsersImage: response.data.ImagePath
          });
          this.setState({
            UsersEmail: response.data.Email
          });
          this.setState({
            UsersBirth: response.data.Birthday
          });
          this.setState({
            FavoriteMovies: response.data.FavoriteMovies
          });
      })
      .catch(function (error) {
          console.log(error);
      });
}

render(){
const { UsersName, UsersImage, UsersEmail, UsersBirth  } = this.state;

  return(
    <div>
      <h2>Profile</h2>
      <div className='profile-card'>
        
        <div className='card-title'>{UsersName}</div>
        <div><img src={UserImage} alt='Mike Gross'></img></div>
        <div>{UsersEmail}</div>
        <div>Favorite Movies:</div>
        <div></div>
      
      </div>
      </div>)
}
}
    

export default ProfileView;