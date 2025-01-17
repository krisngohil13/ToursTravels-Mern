import React, { useRef } from "react";
import "./searchbar.css";
import { Col, Form, FormGroup } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;
  
    const searchParams = new URLSearchParams();
    if (location) searchParams.append("city", location);
    if (distance) searchParams.append("distance", distance);
    if (maxGroupSize) searchParams.append("maxGroupSize", maxGroupSize);
  
    try {
      // Remove trailing slash from BASE_URL
      const cleanBaseUrl = BASE_URL.replace(/\/+$/, '');
      const response = await axios.get(`${cleanBaseUrl}/search?${searchParams}`);
  
      navigate(`/search?${searchParams}`, { 
        state: { searchResult: response.data.data } 
      });
    } catch (error) {
      alert("Failed to fetch search results: " + error.message);
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center">
          <FormGroup className="form__group">
            <h6>Location</h6>
            <div className="input-wrapper">
              <span><i className="ri-map-pin-line" /></span>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>

          <FormGroup className="form__group">
            <h6>Distance</h6>
            <div className="input-wrapper">
              <span><i className="ri-compass-3-line" /></span>
              <input
                type="number"
                placeholder="Distance k/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup>

          <FormGroup className="form__group">
            <h6>Group Size</h6>
            <div className="input-wrapper">
              <span><i className="ri-group-line" /></span>
              <input 
                type="number" 
                placeholder="0" 
                ref={maxGroupSizeRef}
              />
            </div>
          </FormGroup>

          <button className="search__icon" onClick={searchHandler}>
            <i className="ri-search-line" />
            <span>Search</span>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
