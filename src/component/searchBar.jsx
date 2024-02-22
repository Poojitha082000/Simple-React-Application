import React from "react";
import styles from "../app.module.scss";
import "./searchBar.css";
import searchIcon from "./akar-icons_search.svg";

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        className={`${styles.searcpla} SearchBar-input`}
      />
      <div className="SearchBar-icon">
        <img src={searchIcon} alt="Search Icon" width="20" height="20" />
      </div>
    </div>
  );
};

export default SearchBar;
