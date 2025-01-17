import React from "react";
import CommonSection from "../Shared/CommonSection";
import "../styles/Tour.css";
import useFetch from "../hooks/useFetch";
import TourCard from "./../Shared/TourCard";
import SearchBar from "../Shared/SearchBar";
import Newsletter from "../Shared/Newsletter";
import { Container } from "reactstrap";

const Tours = () => {
  const { data: tours, loading, error } = useFetch("tours");

  if (loading) {
    return (
      <div className="tours-loader-container">
        <div className="tours-loader" />
        <div className="tours-loading-text">Discovering amazing tours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tours-error-container">
        <p className="tours-error-text">
          ⚠️ Oops! Unable to load tours. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="tours-page-container">
      <CommonSection title={"All Tours"} />
      
      <section className="tours-search-section">
        <Container>
          <SearchBar />
        </Container>
      </section>
      
      <section className="tours-content-section">
        <Container>
          <div className="tours-grid">
            {Array.isArray(tours) &&
              tours.map((tour) => (
                <div className="tours-card-wrapper" key={tour._id}>
                  <TourCard tour={tour} />
                </div>
              ))}
          </div>
        </Container>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default Tours;
