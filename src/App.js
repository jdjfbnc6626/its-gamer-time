import React, { useEffect, useReducer } from "react";
import GameList from "./components/GameList";
import NavBar from "./components/NavBar";
import "./App.css";
import { BrandingWatermark } from "@material-ui/icons";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import DetailPage from './components/DetailPage';




function App() {
  

  return (
    <Router>
      <div className="App">
        <div className="container">
          <div><NavBar /></div>
          <div>
          <Switch>
            {/* <Route exact path="/" render={()=> <SearchBar props={state} />}/> */}
            <Route exact path="/" render={()=> <GameList searchInput={'batman'} />}/> {/* searchInput is hard coded for testing. Gamelist Should be passed a text search from the search Bar*/}
            <Route path="/games/:id" component={DetailPage} />
            <Redirect exact from="/games" to="/" />
          </Switch>
          </div>
        </div>
      </div>
    </Router>

  );
}

export const DispatchContext = React.createContext();
