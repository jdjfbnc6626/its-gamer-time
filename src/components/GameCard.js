import { render } from "@testing-library/react";
import React from "react";
import styles from "../styles/GameCard.modules.css"

//OnClick event will render DetailPage
//Pass in gameID


export default function GameCard({ game }) {
  const { external, thumb, cheapest } = game;

  return (
    <div className="game-card">
      <img src={thumb} alt={external} style={{ height: "200px", width: "500px" }}/> {/*Consider moving image styling into CSS*/}
      <h3>{external}</h3>
      <p>Lowest Price: {cheapest}</p>
    </div>
  );
}