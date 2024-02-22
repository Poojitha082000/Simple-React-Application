import React from "react";
import "./styles.css";
import styles from '../app.module.scss';

const Table = ({
  data,
  selectedRows,
  onRowSelection,
  onSelectAll,
  onDeselectAll,
}) => {
  const isAnyRowSelected = selectedRows.length > 0;

  const handleToggleHeaderCheckbox = () => {
    if (isAnyRowSelected) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  const headerCheckboxState = isAnyRowSelected ? "checked" : "";

  const handleRowCheckboxChange = (rowId) => {
    onRowSelection(rowId);
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <colgroup>
          <col style={{ width: "40px" }} /> {/* Checkbox column */}
          <col style={{ width: "100px" }} /> {/* Ref.ID column */}
          <col style={{ width: "150px" }} /> {/* Customer column */}
          <col style={{ width: "170px" }} /> {/* Products column */}
          <col style={{ width: "100px" }} /> {/* Date column */}
          <col style={{ width: "100px" }} /> {/* Distribution column */}
          <col style={{ width: "100px" }} /> {/* Status column */}
          <col style={{ width: "100px" }} /> {/* Price column */}
        </colgroup>
        <thead>
          <tr>
            <th>
              <input
                className={`${styles.checkbox}`}
                type="checkbox"
                onChange={handleToggleHeaderCheckbox}
                checked={selectedRows.length > 0 && selectedRows.length === data.length}
              />
            </th>
            <th className={`${styles.tableRowData}`}> ALL ORDERS </th>
            <th>{`(${selectedRows.length} orders selected)`}</th>
          </tr>
          <tr>
            <th>
              <input
                className={`${styles.checkbox} rounded-circle`}
                type="checkbox"
                onChange={handleToggleHeaderCheckbox}
                checked={headerCheckboxState === "checked"}
              />
            </th>
            <th>Ref.ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Date</th>
            <th>Distribution</th>
            <th>Status</th>
            <th>Price (in Rs.)</th>
          </tr>
        </thead>
        
        <tbody>
          {data.map((row) => (
            <tr
              className={`${styles.tableData} ${styles.roundedRow}`} 
              key={row.refId}
            >
              <td>
                <input
                  className={`${styles.checkbox}`}
                  type="checkbox"
                  checked={selectedRows.includes(row.refId)}
                  onChange={() => handleRowCheckboxChange(row.refId)}
                />
              </td>
              <td>{row.refId}</td>
              <td>{row.customer}</td>
              <td>{row.products}</td>
              <td>{row.date}</td>
              <td>{row.distribution}</td>
              <td>{row.status}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
