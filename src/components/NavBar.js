import React from "react";
import SearchBar from "./SearchBar";
import PriceSlider from "./PriceSlider";

function NavBar() {
  return (
    <div className="nav-bar">
      <section>
        <img src="https://i.imgur.com/BvJrGqC.png" alt="logo" />
      </section>
      <section className = "page-title">It's Gamer Time</section>
      <section>
        <SearchBar />
        <span>
        <PriceSlider />
        </span>
      </section>
    </div>
  );
}


export default NavBar;
