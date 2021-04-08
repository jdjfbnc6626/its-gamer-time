
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";
import styles from "../styles/GameList.modules.css"

export default function GameList({match}) {

  const searchInput = match.params.game

  const [state, dispatch] = useReducer(reducer, {
    gameList: [],
  });

  const {gameList} = state

  function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
      case "searchByGameName":
        return { ...state, gameList: payload.gameArray };
      default:
        return state;
    }
  }

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${searchInput}&limit=20&exact=0`, //limit of 20 results is hard coded here
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        dispatch({
          type: "searchByGameName",
          payload: { gameArray: result },
        })
      )
      .catch((error) => console.log("error", error));
  }, [searchInput]); //loading the fetch once might become an issue as new searches are made? could be avoided by calling a new list each time?

  //conditional render if the gameList has not been updated by the fetch request
  return (gameList.length > 0 ? (
    <div className="game-list">
      {gameList.map((game) => (
        <div key={game.gameID}>
          <Link to={`/games/${game.gameID}`}>
            <GameCard game={game} />
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div style={{margin: "200px"}}>No results found</div> //consider moving inline to CSS
  ))
}
