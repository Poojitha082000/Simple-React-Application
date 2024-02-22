import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Table from "./component/table";
import jsonData from "./data.json";
import StatusFilterDropdown from "./component/statusFilter";
import SearchBar from "../src/component/searchBar";
import Actions from "./component/actions";
import styles from "./app.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import chevronDownIcon from "./carbon_location.svg";
import "./app.css";
import dropdownIcon from "./component/eva_chevron-down-fill.svg";
const App = () => {
  const [data] = useState(jsonData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [distributionFilter, setDistributionFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [distributionOptions, setDistributionOptions] = useState([]);

  useEffect(() => {
    const uniqueDistributions = Array.from(
      new Set(data.map((row) => row.distribution))
    );
    setDistributionOptions(uniqueDistributions);
  }, [data]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleDistributionFilter = (distribution) => {
    setDistributionFilter(distribution);
  };

  const handleRowSelection = (rowId) => {
    const isSelected = selectedRows.includes(rowId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    const allRowIds = data.map((row) => row.refId);
    setSelectedRows(allRowIds);
  };

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const handleDownloadExcel = () => {
    const selectedData = data.filter((row) => selectedRows.includes(row.refId));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Data");
    XLSX.writeFile(workbook, "selected_data.xlsx");
  };

  const filteredData = data.filter((row) => {
    const matchesSearchTerm = row.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatusFilter =
      statusFilter === "All" ||
      row.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDistributionFilter =
      distributionFilter === "" ||
      distributionFilter === "All" ||
      row.distribution === distributionFilter;
    return (
      matchesSearchTerm && matchesStatusFilter && matchesDistributionFilter
    );
  });

  return (
    <div className={`${styles.container} ${styles.page} row col-lg-12`}>
      <div className={`${styles.searchBar} col-lg-4 pl-0`}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={`${styles.statusBar} col-lg-3 pl-0`}>
        <StatusFilterDropdown
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilter}
        />
      </div>
      <div className="col-lg-2 pl-0">
        <div className="select-container">
          <select
            id="statusFilter"
            value={distributionFilter}
            onChange={(e) => handleDistributionFilter(e.target.value)}
            className="select-dropdown"
          >
            <option value="" disabled hidden>
              Distribution
            </option>
            <option value="All">All</option>
            {distributionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="tag-icon">
            <img
              src={chevronDownIcon}
              alt="Dropdown Icon"
              width="30"
              height="30"
            />
          </div>

          <div className="select-icon">
            <img
              src={dropdownIcon}
              alt="Dropdown Icon"
              width="30"
              height="30"
            />
          </div>
        </div>
      </div>

      <div className="col-lg-3 pl-0">
        <Actions
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onDownloadExcel={handleDownloadExcel}
          selectedRows={selectedRows}
          data={data}
        />
      </div>

      <div className="mt-0">
        <Table
          data={filteredData}
          selectedRows={selectedRows}
          onRowSelection={handleRowSelection}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
        />
      </div>
    </div>
  );
};

export default App;
