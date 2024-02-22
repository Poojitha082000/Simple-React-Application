import React, { useState, useEffect } from "react";

const DistributionFilter = ({ onSelectDistribution }) => {
  const [distribution, setDistributions] = useState([]);
  const [selectedDistribution, setSelectedDistribution] = useState("");

  useEffect(() => {
    fetch("./distributions.json")
      .then((response) => response.json())
      .then((data) => {
        setDistributions(data);
      })
      .catch((error) => {
        console.error("Error fetching distributions:", error);
      });
  }, []);
  const handleDistributionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedDistribution(selectedValue);
    onSelectDistribution(selectedValue);
  };

  return (
    <div>
      <label htmlFor="distribution">Distribution:</label>
      <select
        id="distribution"
        value={selectedDistribution}
        onChange={handleDistributionChange}
      >
        <option value="">All</option>
        {distribution.map((distributions) => (
          <option key={distributions} value={distributions}>
            {distributions}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistributionFilter;
