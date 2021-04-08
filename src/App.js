import React, { useEffect, useReducer } from "react";
import GameList from "./components/GameList";
import NavBar from "./components/NavBar";
import styles from './styles/App.modules.css'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import DetailPage from './components/DetailPage';
import SearchBar from './components/SearchBar'




export default function App() {
 
  return (
    <Router>

      <div className="App">
        <div className="grid-container">
          <header className="header">
            <NavBar/>
          </header>
          <main className="main">
            <Switch>
              <Route exact path="/" render={()=> <div className="main-search"><SearchBar /></div>}/>  {/* div required here to allow for class naming*/}
              <Route path="/search/:game/:price" component={GameList} />
              <Route path="/games/:id" component={DetailPage} />
              <Redirect exact from="/games" to="/" />
              <Redirect exact from="/search" to="/"/>
            </Switch>
          </main>
        </div>
      </div>

    </Router>

  );
}


