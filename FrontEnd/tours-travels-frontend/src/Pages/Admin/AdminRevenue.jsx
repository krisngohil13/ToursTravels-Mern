import React from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import useFetch from '../../hooks/useFetch';
import CommonSection from '../../Shared/CommonSection';
import './AdminRevenue.css';

const AdminRevenue = () => {
  const { data: revenueStats, loading, error } = useFetch('admin/revenue-stats');

  if (loading) return <h4 className="text-center pt-5">Loading...</h4>;
  if (error) return <h4 className="text-center pt-5">{error}</h4>;

  return (
    <section className="admin-revenue">
      <CommonSection title="Revenue Overview" />
      <Container>
        <Row>
          <Col lg="4" md="6">
            <Card className="revenue-card">
              <div className="revenue-icon">
                <i className="ri-money-dollar-circle-line"></i>
              </div>
              <h3>Total Revenue</h3>
              <h2>${revenueStats?.totalRevenue?.toLocaleString() || 0}</h2>
            </Card>
          </Col>
          <Col lg="4" md="6">
            <Card className="revenue-card">
              <div className="revenue-icon">
                <i className="ri-calendar-check-line"></i>
              </div>
              <h3>Monthly Revenue</h3>
              <h2>${revenueStats?.monthlyRevenue?.toLocaleString() || 0}</h2>
            </Card>
          </Col>
          <Col lg="4" md="6">
            <Card className="revenue-card">
              <div className="revenue-icon">
                <i className="ri-line-chart-line"></i>
              </div>
              <h3>Growth Rate</h3>
              <h2>{revenueStats?.growthRate || 0}%</h2>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminRevenue; 