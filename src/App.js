import React from "react";
import GameList from "./components/GameList";
import NavBar from "./components/NavBar";
import "./styles/App.modules.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import DetailPage from "./components/DetailPage";
import HomePage from "./components/HomePage";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="grid-container">
          <header className="header">
            <Route render={({ location }) =>["/"].includes(location.pathname) ? null : <NavBar/>}/> {/* conditional render of the nav bar if on the home page */}
          </header>
          <main className="main">
            <Switch>
              {/* div required here to allow for class naming*/}
              <Route exact path="/" component={HomePage}/>
              <Route path="/search/:game/:price" component={GameList} />
              <Route path="/games/:id" component={DetailPage} />
              <Redirect exact from="/games" to="/" />
              <Redirect exact from="/search" to="/" />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
}
