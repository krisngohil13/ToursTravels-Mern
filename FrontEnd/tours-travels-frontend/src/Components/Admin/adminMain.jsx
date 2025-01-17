import React from 'react';
import { Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import TourCard from '../../Shared/TourCard';

export default function AdminMain() {
  const { data: featuredTours, loading } = useFetch('tours');

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {Array.isArray(featuredTours) &&
        featuredTours.map((tour) => (
          <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))}
      <div className="viall__btn">
        <NavLink to="/tours">
          <button className="btn primary__btn">View All Tours</button>
        </NavLink>
      </div>
    </>
  );
}
