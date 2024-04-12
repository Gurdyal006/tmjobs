"use client";

import { Button, Col, Form, Input, Row } from "antd";

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
    <Form className="flex  gap-3 my-3 items-end">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item>
            <input
              type="text"
              value={filters.searchText}
              onChange={handleSearchTextChange}
              placeholder="Search job title"
              style={{ width: "300px" }}
            />
          </Form.Item>
        </Col>
        {/* <div>
        <span>Search Location</span>
        <select value={filters.location} onChange={handleLocationChange}>
          <option value="none">select location</option>
          <option value="Mohali">Mohali</option>
          <option value="Pune">Pune</option>
          <option value="Pathankot">Pathankot</option>
        </select>
      </div> */}
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button onClick={handleReset} style={{ marginLeft: 8 }}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
