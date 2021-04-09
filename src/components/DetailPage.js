import { useEffect, useReducer } from "react";
import getStoreList from "./storeList.js";
import "../styles/DetailPage.modules.css";

const storeList = getStoreList();

function reducer(state, action) {
  const { data, type, stores } = action;
  const { deals, info, cheapestPriceEver } = data;
  //action = {type:, data:, stores:}
  switch (type) {
    case "initalFetch":
      let bestDeal = deals[0]; //api already sorts by best deal making 0th the same deal
      let boxArt =
        info.steamAppID === null
          ? info.thumb
          : `https://steamcdn-a.akamaihd.net/steam/apps/${info.steamAppID}/header.jpg`;

      return {
        imageURL: boxArt,
        title: info.title,
        regularPrice: bestDeal.retailPrice,
        bestPrice: deals[0].price,
        bestPriceStore: stores[bestDeal.storeID],
        historicLow: cheapestPriceEver.price,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default function DetailPage({ match }) {
  const gameID = match.params.id;
  const [state, dispatch] = useReducer(reducer, {
    imageURL: "",
    title: "",
    regularPrice: "",
    bestPrice: "",
    bestPriceStore: "",
    historicLow: "",
    isLoading: true,
  });

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
  }, [gameID]);

  //if the fetch request is not complete yet, rended a loading screen.
  const {title, imageURL, regularPrice, bestPrice, bestPriceStore, historicLow, isLoading} = state;

  return isLoading === true ? (
    <div className="Detail-View"> 'Loading...' </div>
  ) : (
    <div className="container">
      <div className="head">
        <h1>{title}</h1>
      </div>
      <div className="gameImage">
        <img src={imageURL} alt={`Box Art of ${title}`} />
      </div>
      <div className="staticInfo">
        <div className="regularPrice">
          <strong>Regular Price:</strong> ${regularPrice}
        </div>
        <div className="bestPrice">
          <strong>Best Price:</strong> ${bestPrice}
        </div>
        <div className="bestPriceStore">
          <strong>Available On:</strong> {bestPriceStore}
        </div>
        <div className="historicLow">
          <strong>Historic low:</strong> ${historicLow}
        </div>
      </div>
    </div>
  );
}
