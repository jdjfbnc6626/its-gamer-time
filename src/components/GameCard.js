import React from "react";
import "../styles/GameCard.modules.css";

export default function GameCard({ game }) {
  const { title, steamAppID, salePrice, thumb } = game;
  const image =
    steamAppID === null
      ? thumb
      : `https://steamcdn-a.akamaihd.net/steam/apps/${steamAppID}/header.jpg`;

  return (
    <div className="game-card">
      <img className="game-card-image"
        src={image}
        alt={title}
      />
      <h3>{title}</h3>
      <p>Sale Price: ${salePrice}</p>
    </div>
  );
}
