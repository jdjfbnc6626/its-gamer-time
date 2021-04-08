import React from "react";
import SearchBar from "./SearchBar";

export default function HomePage() {
  return (
    <div className="main-search" style={searchStyle}>
      <SearchBar/>
    </div>
  );
}

const searchStyle = {
  border: "2px solid gray",
  borderRadius: "10px",
  marginTop: "15%",
  paddingInline: "25%",
  width: "50%",
}