import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Newsletter from "../Shared/Newsletter";
import CommonSection from "../Shared/CommonSection";
import BookingTable from '../Shared/BookingTable';
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import "./booked.css";

const Booked = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user?.id) {
          setError("Please login to view your bookings");
          setLoading(false);
          return;
        }

        const url = user.role === "admin" 
          ? `${BASE_URL.replace(/\/$/, '')}/booking`
          : `${BASE_URL.replace(/\/$/, '')}/booking/user`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Error fetching bookings");
        }

        setBookings(result.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p className="loading-text">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="ri-error-warning-line"></i>
        <p className="error-text">{error}</p>
        {!user && (
          <button 
            className="primary__btn" 
            onClick={() => navigate("/login")}
          >
            Login to View Bookings
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <CommonSection title={user?.role === "admin" ? "All Bookings" : "Your Bookings"} />
      <section className="booking-section">
        <Container>
          <Row>
            <Col lg="12">
              <div className="booking-header">
                <h2>{user?.role === "admin" ? "All Bookings" : "Your Bookings"}</h2>
              </div>
              <BookingTable bookings={bookings} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Booked;
