import React from 'react'
import styles from '../styles/NavBar.modules.css'
import SearchBar from "./SearchBar"
import {Link} from "react-router-dom";

function NavBar() {
  return (
    <div className='nav-bar'>
      <Link to={`/`} className="nav-bar-logo">
        <img className="nav-bar-logo" src='https://i.imgur.com/BvJrGqC.png' alt='logo' />
      </Link>
      <span className="nav-bar-title">It's Gamer Time</span>
      <span className="nav-bar-search">
        <SearchBar/>
      </span>
    </div>
  )
}

export default NavBar
