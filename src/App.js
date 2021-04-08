import React, { useEffect, useReducer } from "react";
import GameList from "./components/GameList";
import NavBar from "./components/NavBar";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import DetailPage from './components/DetailPage';
import SearchBar from './components/SearchBar'




export default function App() {

  
 
  return (
    <Router>

      <div className="App">
        <div className="container">
          <div><NavBar /></div>
          <div>
          <Switch>
            <Route className="main-search" exact path="/" render={()=> <SearchBar />}/>
            <Route path ="/search/:game" component={GameList} />
            <Route path="/games/:id" component={DetailPage} />
            <Redirect exact from="/games" to="/" />
            {/* <Redirect exact from="/search" to="/"/> */}
          </Switch>
          </div>
        </div>
      </div>

    </Router>

  );
}


