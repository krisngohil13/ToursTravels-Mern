import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import './booking-table.css';

const BookingTable = ({ bookings = [] }) => {
  const [localBookings, setLocalBookings] = useState(bookings);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    setLocalBookings(bookings || []);
  }, [bookings]);

  const handleDelete = async (_id) => {
    try {
      const cleanedBaseUrl = BASE_URL.replace(/\/+$/, "");
      const response = await axios.delete(`${cleanedBaseUrl}/booking/${_id}`);
      
      if (response.data.success) {
        setLocalBookings(localBookings.filter(booking => booking._id !== _id));
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBookings = isAdmin
    ? localBookings
    : localBookings.filter(booking => booking.userId === user.id);

  return (
    <div className="booking-table__wrapper">
      <table className="booking-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Tour</th>
            <th>Group Size</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map(({ _id, username, fullName, userEmail, tourName, groupSize, phone }) => (
            <tr key={_id} onClick={handleScrollToTop}>
              <td>
                <span className="username">{username}</span>
              </td>
              <td>
                <div className="user-info">
                  <p className="full-name">{fullName}</p>
                  <p className="email">{userEmail}</p>
                </div>
              </td>
              <td>
                <span className="tour-badge">{tourName}</span>
              </td>
              <td>
                <span className="group-size">{groupSize}</span>
              </td>
              <td>
                <span className="phone">{phone}</span>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(_id);
                    setTimeout(() => navigate("/"), 1000);
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
