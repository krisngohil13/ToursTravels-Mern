import React, { useRef } from "react";
import "./searchbar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import axios from "axios";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (!location && !distance && !maxGroupSize) {
      alert("Please fill at least one field");
      return;
    }

    try {
      const params = new URLSearchParams();
      if (location) params.append("city", location);
      if (distance) params.append("distance", distance);
      if (maxGroupSize) params.append("maxGroupSize", maxGroupSize);

      // Clean the base URL and use the correct search endpoint
      const cleanBaseUrl = BASE_URL.replace(/\/+$/, '');
      const response = await axios.get(`${cleanBaseUrl}/search?${params}`);

      if (response.data.success) {
        navigate('/search', { 
          state: { 
            searchResults: response.data.data,
            searchQuery: {
              city: location,
              distance,
              maxGroupSize
            }
          } 
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center" onSubmit={(e) => {
          e.preventDefault();
          searchHandler();
        }}>
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
                min="0"
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
                min="1"
              />
            </div>
          </FormGroup>

          <button 
            className="search__icon" 
            type="submit"
          >
            <i className="ri-search-line" />
            <span>Search</span>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
