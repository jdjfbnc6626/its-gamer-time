import React from 'react'
import SearchBar from "./SearchBar"

function NavBar() {
  return (
    <div className='nav-bar'>
      <section>
        
        <img src='https://i.imgur.com/BvJrGqC.png' alt='logo' />
      </section>
      <section style={{fontSize: "40px", color:"black"}}>
        <strong>It's Gamer Time</strong>
      </section>
      <section >
        <SearchBar/>
      </section>
    </div>
  )
}

export default NavBar
