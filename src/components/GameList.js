import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";
import "../styles/GameList.modules.css";

export default function GameList({ match }) {
  let searchName =
    match.params.game === "allgames" ? "" : `title=${match.params.game}&`;
  const searchUpperPrice = match.params.price;

  const [state, dispatch] = useReducer(reducer, {
    gameList: ["sadness"],
  });

  let { gameList } = state;
  let searchLowerPrice = 0;

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
    dispatch({
      type: "searchByGameName",
      payload: { gameArray: ["sadness"] },
    });

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://www.cheapshark.com/api/1.0/deals?${searchName}&exact=0&upperPrice=${searchUpperPrice}&lowerPrice=${searchLowerPrice}`,
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
  }, [searchName, searchUpperPrice, searchLowerPrice]);

  function getLowestPrice(arr) {
    let filteredArray = [];
    arr.forEach((game) => {
      let currentGame = game.internalName;
      let lowerPrice = game.salePrice;
      if (!filteredArray.includes(game.internalName)) {
        arr.forEach((nextGame) => {
          if (
            currentGame === nextGame.internalName &&
            Number(nextGame.salePrice) < Number(lowerPrice)
          )
            lowerPrice = nextGame.salePrice;
        });
        game.salePrice = lowerPrice;
        filteredArray.push(game.internalName, game);
      }
    });
    return filteredArray.filter((game) => typeof game === "object");
  }

  return gameList[0] === "sadness" ? (
    <div className="results-text">Loading Results...</div>
  ) : gameList.length > 0 ? (
    <div className="game-list">
      {getLowestPrice(gameList).map((game) => (
        <div key={game.gameID}>
          <Link to={`/games/${game.gameID}`} style={{ textDecoration: "none" }}>
            <GameCard game={game} />
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div className="results-text">
      <div>
        <div>We're sorry.</div>
        <div>
          Your search for{" "}
          <span style={{ color: "red" }}>{match.params.game}</span> for under{" "}
          <span style={{ color: "green" }}>${match.params.price}</span> returned
          no results.
        </div>
      </div>
    </div>
  );
}
