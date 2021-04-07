import React from "react";

export default function GameCard({ game }) {
  const { external, thumb, cheapest } = game;


  return (
    <div className='game-card'>
      <img src={thumb} alt={external} style={{height:"200px", width:"500px"}}/>
      <h3>{external}</h3>
      <p>Lowest Price: {cheapest}</p>
    </div>
  );
}