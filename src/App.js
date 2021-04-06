import React, { useEffect, useReducer } from "react";
import GameList from "./components/GameList";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    gameList: [],
  });

  const { gameList } = state;

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
      "https://www.cheapshark.com/api/1.0/games?title=batman&limit=20&exact=0",
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
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div>
          {gameList.length > 0 ? <GameList list={gameList} /> : "Loading"}
        </div>
      </div>
    </div>
  );
}

export default App;

// fetch("https://www.cheapshark.com/api/1.0/games?title=batman&steamAppID=35140&limit=20&exact=0", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

/*
[
  {
    gameID: "612",
    steamAppID: "21000",
    cheapest: "14.95",
    cheapestDealID: "tyTH88J0PXRvYALBjV3cNHd5Juq1qKcu4tG4lBiUCt4%3D",
    external: "LEGO Batman",
    internalName: "LEGOBATMAN",
    thumb:
      "https://originassets.akamaized.net/origin-com-store-final-assets-prod/195763/142.0x200.0/1040463_MB_142x200_en_US_^_2017-09-08-15-21-36_d7034d41216b6dc201fb20e0cee37c1e66190a11.jpg",
  },
  {
    gameID: "167613",
    steamAppID: null,
    cheapest: "19.99",
    cheapestDealID: "XBi29i5eAtuiRO2htR8wlQ6JyRZcUl4uMnUaTlQAPxA%3D",
    external: "LEGO Batman 2",
    internalName: "LEGOBATMAN2",
    thumb:
      "https://cdn.fanatical.com/production/product/400x225/4cf0701e-77bf-4539-bda7-129ab3e81f8b.jpeg",
  },


];

*/
