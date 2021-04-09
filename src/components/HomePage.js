import React from "react";
import SearchBar from "./SearchBar";
import "../styles/HomePage.modules.css";

export default function HomePage() {
  return (
    <div>
      <div className="emboss-txt">
        <strong>IT'S GAMER TIME</strong>
      </div>
      <div className="main-search">
        <SearchBar />
      </div>
    </div>
  );
}
