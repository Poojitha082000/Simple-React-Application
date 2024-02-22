import React from "react";
import downIcon from "../akar-icons_download.svg";
import "./actions.css";

const Actions = ({ onDownloadExcel }) => {
  return (
    <div className="Actions-container">
      <button className="Actions-button" onClick={onDownloadExcel}>
        <img src={downIcon} alt="Download Icon" className="Actions-icon" />
        Export orders
      </button>
    </div>
  );
};

export default Actions;
