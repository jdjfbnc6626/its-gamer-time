import { useEffect, useReducer } from "react";
import getStoreList from "./storeList.js";
import styles from "../styles/DetailPage.modules.css";

const storeList = getStoreList();

const initalState = {
  imageURL: "",
  title: "",
  regularPrice: "",
  bestPrice: "",
  bestPriceStore: "",
  historicLow: "",
  isLoading: true,
};

function reducer(state, action) {
  //action = {type:, data:, stores:}
  switch (action.type) {
    case "initalFetch":
      let bestDeal = action.data.deals[0] //api already sorts by best deal making 0th the same deal
      let boxArt

        if(action.data.info.steamAppID === null){
          boxArt = action.data.info.thumb
        }else{
          boxArt = `https://steamcdn-a.akamaihd.net/steam/apps/${action.data.info.steamAppID}/header.jpg`
        }


      return {
        imageURL: boxArt,
        title: action.data.info.title,
        regularPrice: bestDeal.retailPrice,
        bestPrice: action.data.deals[0].price, 
        bestPriceStore: action.stores[bestDeal.storeID],
        historicLow: action.data.cheapestPriceEver.price,
        isLoading: false,
      };
    default:
      return state;
  }
}


//Expects input of game id as string, and an input object of key value paired store ID and names
//Create a fetch request per id with API call, replace 'NUMBER' with ID https://www.cheapshark.com/api/1.0/games?id='NUMBER'
//returns JSX element

export default function DetailPage({ match }) {
  const gameID = match.params.id;
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    //fetch request for the passed in gameID
    fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${gameID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: "initalFetch", data: result, stores: storeList })
      )
      .catch((error) => console.log("error", error));
  }, []);


  //if the fetch request is not complete yet, rended a loading screen.
  if (state.isLoading === true) {
    return (
      <div className="Detail-View">
        <div> 'Loading...' </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="head">
          <h1>{state.title}</h1>
        </div>
        <div className="gameImage">
          <img src={state.imageURL} alt={`Box Art of ${state.title}`}/>
        </div>
        <div className="staticInfo">
          <div className="regularPrice"><strong>Regular Price:</strong> ${state.regularPrice}</div>
          <div className="bestPrice"><strong>Best Price:</strong> ${state.bestPrice}</div>
          <div className="bestPriceStore"><strong>Available On:</strong> {state.bestPriceStore}</div>
          <div className="historicLow"><strong>Historic low:</strong> ${state.historicLow}</div>
        </div>
      </div>
    );
  }
}
