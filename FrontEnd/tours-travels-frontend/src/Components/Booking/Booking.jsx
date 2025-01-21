import React, { useState, useContext } from "react";
import "./Booking.css";
import { Form, FormGroup, ListGroup, Button, ListGroupItem, Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config"; // Import your BASE_URL configuration

const Booking = ({ tour, avgRating, totalRating, reviews }) => {
  const { price, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?.id || user?._id, // Handle both id formats
    userEmail: user?.email,
    tourName: title,
    fullName: "",
    phone: "",
    bookAt: "",
    groupSize: "",
  });

  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
  const [isBookingFailed, setIsBookingFailed] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);

  const [error, setError] = useState(null);  // Define the setError for error handling

  const handleChange = async (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Get token from sessionStorage instead of localStorage
    const token = sessionStorage.getItem("token");
    
    if (!token) {
      setIsLoginAlertVisible(true);
      return;
    }
  
    if (!user || !user.id) {
      setIsLoginAlertVisible(true);
      setError("User is not logged in or _id is missing.");
      return;
    }
  

    const bookingData = {
      userId: user?.id || user?._id,
      username: user?.username,
      userEmail: user?.email,
      tourName: title,
      fullName: booking.fullName,
      groupSize: booking.groupSize,
      phone: booking.phone,
      bookAt: booking.bookAt,
    };
  
    console.log("Booking Data to be Sent:", bookingData);

    // Clean up the BASE_URL and make the POST request
    const cleanedBaseUrl = BASE_URL.replace(/\/+$/, "");  // Remove trailing slashes
    const response = await fetch(`${cleanedBaseUrl}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: user?.id || user?._id,
        username: user?.username,
        userEmail: user?.email,
        tourName: title,
        fullName: booking.fullName,
        groupSize: booking.groupSize,
        phone: booking.phone,
        bookAt: booking.bookAt,
      }),
    });
    

    

    const result = await response.json();
    console.log("Backend Response:", result); 
    if (response.ok) {
      setIsBookingSuccessful(true);
      setIsBookingFailed(false);
      setBooking({
        fullName: "",
        phone: "",
        bookAt: "",
        groupSize: "",
      });
      setTimeout(() => {
        navigate("/thank-you");
      }, 1000); // 1-second delay before navigating to the "thank you" page
    } else {
      setIsBookingSuccessful(false);
      setIsBookingFailed(true);
      setError(result.message || "Error occurred while booking.");  // Display error message
    }
  };

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  const taxes = (0.05 * price * (booking.groupSize || 1)).toFixed(2);
  const total = (price * (booking.groupSize || 1) * 1.05).toFixed(2);

  return (
    <div className="booking">
      {isBookingSuccessful && (
        <Alert color="success">
          Booking Successful
        </Alert>
      )}

      {isBookingFailed && (
        <Alert color="danger">
          Failed to book. Please try again.
        </Alert>
      )}

      {isLoginAlertVisible && (
        <Alert color="warning">
          Please login to proceed with the booking.
        </Alert>
      )}

      {error && (
        <Alert color="danger">
          {error} {/* Display error message */}
        </Alert>
      )}

      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/Per Person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center gap-1">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating}
          {totalRating === 0 ? (
            <span>Not Rated</span>
          ) : (
            <span>({reviews.length || 0})</span>
          )}
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
              value={booking.fullName}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
              value={booking.phone}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder="Date"
              id="bookAt"
              required
              onChange={handleChange}
              value={booking.bookAt}
              min={currentDate} // Set min attribute to current date
            />
            <input
              type="number"
              placeholder="Group Size"
              id="groupSize"
              required
              onChange={handleChange}
              value={booking.groupSize}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i>
              {booking.groupSize || 1} Person
            </h5>
            <span>${price * (booking.groupSize || 1)}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Taxes</h5>
            <span>${taxes}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${total}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
