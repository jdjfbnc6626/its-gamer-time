import React, { useEffect, useReducer } from "react";
import GameList from "./components/GameList";
import NavBar from "./components/NavBar";
import "./App.css";

export default function App() {
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

  return (
    <DispatchContext.Provider value={dispatch}>
      <div className="App">
        <div className="container">
          <div>
            <NavBar />
          </div>
          <div>
            <GameList list={gameList} />
          </div>
        </div>
      </div>
    </DispatchContext.Provider>
  );
}

export const DispatchContext = React.createContext();
