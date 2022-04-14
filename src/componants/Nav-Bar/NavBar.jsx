import React from 'react'
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './NavBar.scss'
import MoviesView from '../movies/movies-view'
function NavBar() {
  return (
    <div className='NavBar'>
      <Link to={'/'}><Button className='btn btn-link' variant='dark'>Profile</Button></Link>
      <Link to={'/Movies'}><Button className='btn btn-link' variant='dark'>Movies</Button></Link>
      <Link to={'/Directors'}><Button className='btn btn-link' variant='dark'>Directors</Button></Link>
      <Button className='btn btn-link' variant='dark'>Favorites</Button>
    </div>
  )
}

export default NavBar