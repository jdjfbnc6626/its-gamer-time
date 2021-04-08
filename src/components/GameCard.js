import React from "react";

export default function GameCard({ game }) {
  const { title, thumb, salePrice } = game;

  return (
    <div className="game-card" >
      <img src={thumb} alt={title} style={{ height: "200px", width: "500px" }}/>
      <h3>{title}</h3>
      <p>Sale Price: ${salePrice}</p>
    </div>
  );
}