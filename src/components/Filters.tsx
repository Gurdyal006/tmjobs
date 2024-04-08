"use client";

import { Button } from "antd";

const Filters = ({ filters, setFilters, getData, handleReset }: any) => {
  const handleSearchTextChange = (e: any) => {
    setFilters({ ...filters, searchText: e.target.value });
  };

  // const handleLocationChange = (e: any) => {
  //   setFilters({ ...filters, location: e.target.value });
  // };

  const handleSearch = () => {
    getData();
  };

  return (
    <div className="flex  gap-3 my-3 items-end">
      <div>
        {/* <span>Search</span> */}
        <input
          type="text"
          value={filters.searchText}
          onChange={handleSearchTextChange}
          placeholder="search job title"
        />
      </div>
      {/* <div>
        <span>Search Location</span>
        <select value={filters.location} onChange={handleLocationChange}>
          <option value="none">select location</option>
          <option value="Mohali">Mohali</option>
          <option value="Pune">Pune</option>
          <option value="Pathankot">Pathankot</option>
        </select>
      </div> */}
      {/* {filters.searchText !== "" && ( */}
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
      {/* )} */}
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
};

export default Filters;
