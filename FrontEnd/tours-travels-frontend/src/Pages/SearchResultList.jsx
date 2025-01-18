import React from "react";
import { useLocation } from "react-router-dom";
import TourCard from "../Shared/TourCard";
import Newsletter from "../Shared/Newsletter";
import { Container, Row, Col } from "reactstrap";

const SearchResultList = () => {
  const location = useLocation();
  const { searchResults, searchQuery } = location.state || {};

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-4">
                {searchResults?.length > 0 
                  ? `Found ${searchResults.length} results${searchQuery?.city ? ` for "${searchQuery.city}"` : ''}`
                  : 'No results found'}
              </h4>
            </Col>

            {searchResults?.map(tour => (
              <Col lg="3" className="mb-4" key={tour._id}>
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;
