//MAIN View
import axios from 'axios';
import React from 'react';
import {Row, Col, Accordion} from 'react-bootstrap'
import DirectorCard from '../directors-card/director-card'
import DirectorInfo from '../director-info/director-info'
class DirectorView extends React.Component {
constructor(){
  super();
  this.state={
    Directors:[],
    selectedDirector: null,
  }
  this.setSelectedDirector= this.setSelectedDirector.bind(this)

}

setSelectedDirector(newSelectedDirector) {
  this.setState({
    selectedDirector: newSelectedDirector
  });
}

componentDidMount() {
  axios.get(`https://muvies-app.herokuapp.com/Directors`, {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQ1NjcsIlVzZXJOYW1lIjoiSm9obiIsIlBhc3N3b3JkIjoiJDJiJDEwJGJzUU5NcVUyeHVPZnFlSVJtaWJUenVBcFJXNkZQMDNUU3FzUHdoSExjUDZWL2Vzb1g5MGltIiwiRW1haWwiOiJKb2huQGdtYWlsLmNvbSIsIkZhdm9yaXRlTW92aWVzIjpbbnVsbF0sIl9fdiI6MCwiaWF0IjoxNjQ5NDMxMzQ0LCJleHAiOjE2NTAwMzYxNDQsInN1YiI6IkpvaG4ifQ.4YKFy80Clcgw_HYmpoAtmz5qlau0aSpGbg3yKFrivRc'}
  })
      .then(response => {
          this.setState({
              Directors: response.data
          });
          console.log(response.data)
      })
      .catch(function (error) {
          console.log(error);
      });
}



render(){

const { Directors, selectedDirector } = this.state;

  return(
      
      <div>
        <h2>Directors</h2>
        <Row className="main-view">
  
    {selectedDirector
          ? (
              <DirectorInfo Director={selectedDirector} onBackClick={newSelectedDirector => { this.setSelectedDirector(newSelectedDirector); }} />
          )
          : Directors.map(Director => (
            <Col md={3}>
              <DirectorCard key={Director._id} Director={Director} onDirectorClick={newSelectedDirector => { this.setSelectedDirector(newSelectedDirector) }}/>
            </Col>
          ))
        }
            </Row> 
      </div>)
}
}
    

export default DirectorView;