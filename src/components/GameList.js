
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";

export default function GameList({searchInput}) {


  const [state, dispatch] = useReducer(reducer, {
    gameList: [],
  });

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
  }, []); //loading the fetch once might become an issue as new searches are made? could be avoided by calling a new list each time?

  //conditional render if the gameList has not been updated by the fetch request
  if(state.gameList.length === 0){
    return <div className="game-list">Loading</div>
  }else{
    return (

      <div className="game-list">

        {state.gameList.map((game) => {
          return (
            <div key={game.gameID}>
              <Link to={`/games/${game.gameID}`}>
                <GameCard game={game} />
              </Link>
            </div>
          )}
        )}

      </div>
    );
        }

}

//https://www.cheapshark.com/api/1.0/games?title=batman

// {
//     "info": {
//       "title": "LEGO Batman",
//       "steamAppID": "21000",
//       "thumb": "https://originassets.akamaized.net/origin-com-store-final-assets-prod/195763/142.0x200.0/1040463_MB_142x200_en_US_^_2017-09-08-15-21-36_d7034d41216b6dc201fb20e0cee37c1e66190a11.jpg"
//     },
//     "cheapestPriceEver": {
//       "price": "3.99",
//       "date": 1543028665
//     },
//     "deals": [
//       {
//         "storeID": "23",
//         "dealID": "tyTH88J0PXRvYALBjV3cNHd5Juq1qKcu4tG4lBiUCt4%3D",
//         "price": "4.23",
//         "retailPrice": "19.99",
//         "savings": "78.839420"
//       },
//       {
//         "storeID": "21",
//         "dealID": "Dtzv5PHBf71720cIYjxx3oHvvZK3iHUbQjv6fWLVpd8%3D",
//         "price": "4.59",
//         "retailPrice": "19.99",
//         "savings": "77.038519"
//       },
//       {
//         "storeID": "28",
//         "dealID": "atibivJQyXsOousolMoHm2iwPKyZaYMxbJ0sR0030M4%3D",
//         "price": "5.00",
//         "retailPrice": "19.99",
//         "savings": "74.987494"
//       },
//       {
//         "storeID": "24",
//         "dealID": "gxfmQjEJ%2Fk7JylG%2FKYHcmK4RcZY51YLVWfGF4CRkPIY%3D",
//         "price": "17.99",
//         "retailPrice": "19.99",
//         "savings": "10.005003"
//       },
//       {
//         "storeID": "15",
//         "dealID": "2G7cvZxDvSCoqSOpvARBvMXuwrA70L3j1%2FelPGxhddw%3D",
//         "price": "19.99",
//         "retailPrice": "19.99",
//         "savings": "0.000000"
//       },
//       {
//         "storeID": "8",
//         "dealID": "S8sC6rS2qZS5e0tROfV8hBgYeJPbG1T61BNmcz5Z%2BwE%3D",
//         "price": "19.99",
//         "retailPrice": "19.99",
//         "savings": "0.000000"
//       },
//       {
//         "storeID": "29",
//         "dealID": "%2B7VX8im%2FkdTZIoOpHzeQ0X3roxf655hXC6oq6iruQCM%3D",
//         "price": "19.99",
//         "retailPrice": "19.99",
//         "savings": "0.000000"
//       }
//     ]
//   }
