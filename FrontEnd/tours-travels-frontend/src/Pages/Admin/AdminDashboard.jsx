import React, { useContext } from 'react';
import { Container } from 'reactstrap';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import './AdminDashboard.css';

// Icons import (you can use any icon library like react-icons)
const icons = {
  users: '👥',
  tours: '🗺️',
  bookings: '📅',
  revenue: '💰'
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  
  const { 
    data: statsData, 
    loading, 
    error 
  } = useFetch('admin/dashboard-stats');

  const stats = {
    totalUsers: statsData?.stats?.totalUsers || 0,
    totalTours: statsData?.stats?.totalTours || 0,
    totalBookings: statsData?.stats?.totalBookings || 0,
    totalRevenue: statsData?.stats?.totalRevenue || 0
  };

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const dashboardCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: icons.users,
      color: '#7d59fc',
      link: '/admin/users'
    },
    {
      title: 'Total Tours',
      value: stats.totalTours.toLocaleString(),
      icon: icons.tours,
      color: '#9c27b0',
      link: '/admin/tours'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      icon: icons.bookings,
      color: '#673ab7',
      link: '/booked'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: icons.revenue,
      color: '#5e35b1',
      link: '/admin/revenue'
    }
  ];

  if (loading) {
    return (
      <div className="admin-loading-state">
        <div>
          <span>Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-state">
        <div>
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <section className="admin-dashboard-container">
      <Container>
        <h2 className="admin-dashboard-title">Admin Dashboard</h2>
        
        {/* Stats Cards */}
        <div className="admin-cards-grid">
          {dashboardCards.map((card, index) => (
            <Link 
              to={card.link} 
              className="text-decoration-none" 
              key={index}
            >
              <div 
                className="admin-stat-card" 
                style={{ '--index': index }}
              >
                <div className="admin-card-icon-wrapper">
                  <div 
                    className="admin-card-icon"
                    style={{ 
                      background: `linear-gradient(135deg, ${card.color}20, transparent)`,
                      color: card.color 
                    }}
                  >
                    <span>{card.icon}</span>
                  </div>
                </div>
                <div className="admin-card-content">
                  <h3>{card.title}</h3>
                  <p className="admin-stat-value">{card.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AdminDashboard; 