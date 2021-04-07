import React, { useEffect, useReducer } from "react";
import GameList from "./components/GameList";
import NavBar from "./components/NavBar"
import "./App.css";
import { BrandingWatermark } from "@material-ui/icons";



function App() {
  

  return (
    <div className="App">
      <div className="container">
        <div><NavBar /></div>
        <div>
          <GameList searchInput={'batman'}/> {/* searchInput is hard coded for testing. Gamelist Should be passed a text search from the search Bar*/}
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
