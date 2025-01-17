import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";

const BookingTable = ({ bookings }) => {
  const [localBookings, setLocalBookings] = useState(bookings); // Local state to store bookings
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User Data from LocalStorage:", user);  // Log user data for debugging

  const isAdmin = user?.role === "admin"; // Check if user is an admin
  console.log("Is Admin:", isAdmin);  // Log if user is admin or not

  useEffect(() => {
    setLocalBookings(bookings);
  }, [bookings]);

  const handleDelete = async (_id) => {
    try {
      const cleanedBaseUrl = BASE_URL.replace(/\/+$/, "");  // Clean up BASE_URL to avoid double slashes
      const response = await axios.delete(`${cleanedBaseUrl}/booking/${_id}`);
      
      if (response.data.success) {
        setLocalBookings(localBookings.filter(booking => booking._id !== _id));
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Debugging: Log all bookings before filtering
  console.log("All Bookings:", localBookings);

  // Filter bookings based on user role
  const filteredBookings = isAdmin
    ? localBookings
    : localBookings.filter(booking => booking.userId === user.id);  // Use `user.id` instead of `user._id`

  // Debugging: Log filtered bookings
  console.log("Filtered Bookings:", filteredBookings);  // Log the filtered bookings for debugging

  return (
    <table className="table table-striped table-hover align-middle">
      <thead className="table-dark">
        <tr>
          <th scope="col">UserName</th>
          <th scope="col">Name</th>
          <th scope="col">Title</th>
          <th scope="col">Group Size</th>
          <th scope="col">Phone No</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredBookings.map(({ _id, userId,username, fullName, userEmail, tourName, groupSize, phone }) => (
          <tr onClick={handleScrollToTop} key={_id}>
            <td>
              <p className="fw-bold mb-1">{username}</p> {/* Show the username of the current user or the admin */}
            </td>
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <p className="fw-bold mb-1">{fullName}</p>
                  <p className="text-muted mb-0">{userEmail}</p>
                </div>
              </div>
            </td>
            <td>
              <span className="badge bg-success">{tourName}</span>
            </td>
            <td>{groupSize}</td>
            <td>{phone}</td>
            <td>
              <button
                className="btn btn-link btn-sm text-danger"
                onClick={() => {
                  handleDelete(_id);
                  setTimeout(() => {
                    navigate("/");
                  }, 1000);
                }}
              >
                <FaTrash /> {/* Display the trash icon for delete */}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingTable;
