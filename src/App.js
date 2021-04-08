import React from "react";
import GameList from "./components/GameList";
import NavBar from "./components/NavBar";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import DetailPage from "./components/DetailPage";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <div>
            <NavBar />
          </div>
          <div>
            <Switch>
              <Route path="/search/:game/:price" component={GameList} />
              <Route path="/games/:id" component={DetailPage} />
              <Redirect exact from="/games" to="/" />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
