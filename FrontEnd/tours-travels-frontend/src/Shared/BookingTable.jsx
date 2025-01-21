import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useFetchDelete from '../hooks/useFetchDelete';
import './booking-table.css';

const BookingTable = () => {
  const navigate = useNavigate();
  const { data: bookings, loading, error } = useFetch('booking');
  const { deleteData, loading: deleteLoading } = useFetchDelete();
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (bookingId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate('/login');
        return;
      }

      await deleteData(`booking/${bookingId}`);
      // Refresh the page to show updated bookings
      window.location.reload();
    } catch (err) {
      setDeleteError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="empty-state">
        <p>No bookings found</p>
      </div>
    );
  }

  return (
    <div className="booking-table__wrapper">
      {deleteError && (
        <div className="error-message">
          {deleteError}
        </div>
      )}
      <table className="booking-table">
        <thead>
          <tr>
            <th>Tour</th>
            <th>User</th>
            <th>Full Name</th>
            <th>Date</th>
            <th>Group Size</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.tourName}</td>
              <td className="email">{booking.userEmail}</td>
              <td>{booking.fullName}</td>
              <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
              <td>{booking.groupSize}</td>
              <td>
                <span className={`status-badge ${booking.status?.toLowerCase()}`}>
                  {booking.status || 'Pending'}
                </span>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(booking._id)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
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
