import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Shared/SearchBar";
import Newsletter from "../Shared/Newsletter";
import CommonSection from "../Shared/CommonSection";
import BookingTable from '../Shared/BookingTable';
import { AuthContext } from "../context/AuthContext"; // Ensure you're getting the correct user data

const Booked = () => {
  const { user } = useContext(AuthContext);  // Get user from context
  const [bookings, setBookings] = useState([]); // Store bookings data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!user || !user.id) {
      setError("User not logged in or user data is missing.");
      setLoading(false);
      return;
    }

    // Build the URL dynamically based on the user's role
    const fetchBookings = async () => {
      let url = `http://localhost:4000/api/v1/booking/user`;  // Default to user-specific bookings
      if (user.role === "admin") {
        url = `http://localhost:4000/api/v1/booking`;  // Admin gets all bookings
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`,  // Add Authorization header
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Error fetching bookings");
        }

        setBookings(result.data); // Set the fetched bookings data
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        setError(err.message); // Set error if any
        setLoading(false); // Set loading to false
      }
    };

    fetchBookings(); // Fetch bookings once the component mounts
  }, [user]); // Depend on user changes, especially after login

  // Loading state UI
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return <div className="error__msg">Error loading booked details: {error}</div>;
  }

  return (
    <div>
      <CommonSection title={"Booked Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {/* Pass bookings to BookingTable */}
            <BookingTable bookings={bookings || []} /> 
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Booked;
