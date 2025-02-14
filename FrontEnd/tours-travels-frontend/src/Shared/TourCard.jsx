import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import "./Tourcard.css";
import calculateAvgRating from "../utils/avgRating";

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // Function to truncate title if it's too long
  const formatTitle = (title) => {
    return title.length > 45 ? title.substring(0, 45) + '...' : title;
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={photo} alt={title} />
          <span className="featured__tag">Featured</span>
          <div className="card__overlay">
            <div className="tour__meta">
              <span className="tour__location">
                <i className="ri-map-pin-line"></i>
                {city}
              </span>
              <span className="tour__rating">
                <i className="ri-star-fill"></i>
                {avgRating === 0 ? "Not rated" : avgRating}
                {totalRating !== 0 && <span>({reviews?.length})</span>}
              </span>
            </div>
            <h5 className="tour__title">
              <Link to={`/tours/${_id}`} onClick={handleScrollToTop}>
                {formatTitle(title)}
              </Link>
            </h5>
            <div className="card__bottom">
              <h5 className="tour__price">
                ${price}
                <span className="price__label">/Per Person</span>
              </h5>
              <Link 
                to={`/tours/${_id}`} 
                className="booking__btn"
                onClick={handleScrollToTop}
              >
                Book Now
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TourCard;
