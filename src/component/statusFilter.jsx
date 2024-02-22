import React, { useState } from "react";
import "./statusFilterDropdown.css";
import tagIcon from "../cil_tag.svg";
import dropdownIcon from "./eva_chevron-down-fill.svg";

const StatusFilterDropdown = ({ statusFilter, onStatusFilterChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onStatusFilterChange(selectedValue);
  };

  return (
    <div className="StatusFilterDropdown">
      <select
        id="statusFilter"
        value={selectedValue}
        onChange={handleStatusChange}
        className="StatusFilterDropdown-select"
        style={{
          backgroundImage: `url(${tagIcon})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "10px center",
          paddingLeft: "45px",
        }}
      >
        <option value="" disabled hidden>
          {selectedValue === "" ? "Status" : ""}
        </option>
        <option value="All">All</option>
        <option value="in transit">In Transit</option>
        <option value="out for delivery">Out for Delivery</option>
        <option value="placed">Placed</option>
        <option value="delivered">Delivered</option>
      </select>

      <div className="StatusFilterDropdown-icon">
        <img src={dropdownIcon} alt="Dropdown Icon" width="30" height="30" />
      </div>
    </div>
  );
};

export default StatusFilterDropdown;
