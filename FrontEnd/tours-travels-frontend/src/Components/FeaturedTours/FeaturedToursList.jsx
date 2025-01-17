import React from 'react';
import TourCard from '../../Shared/TourCard';
import { Col, Row, Container } from 'reactstrap';
import useFetch from '../../hooks/useFetch';
import { NavLink } from 'react-router-dom';

const FeaturedToursList = () => {
  const { data: featuredTours, loading } = useFetch(`tours/featured`);
  
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        {Array.isArray(featuredTours) &&
          featuredTours.map((tour) => (
            <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
              <TourCard tour={tour} />
            </Col>
          ))}
      </Row>
      <div className="viall__btn">
        <NavLink to="/tours">
          <button className="primary__btn">
            View All Tours
          </button>
        </NavLink>
      </div>
    </Container>
  );
};

export default FeaturedToursList;
