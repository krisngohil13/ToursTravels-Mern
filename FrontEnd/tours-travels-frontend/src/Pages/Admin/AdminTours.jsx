import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import './AdminTours.css';
import { useNavigate } from 'react-router-dom';
import AddTourModal from './AddTourModal';
import CommonSection from '../../Shared/CommonSection';

const AdminTours = () => {
  const { isAdmin } = useContext(AuthContext);
  const { data: tours, loading, error } = useFetch('tours');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  if (loading) return (
    <div className="loading-state">
      <div>Loading tours data...</div>
    </div>
  );
  
  if (error) return (
    <div className="error-state">
      <div>Error: {error}</div>
    </div>
  );

  return (
    
    <section className="admin-tours">
      <CommonSection title={"Tours Management"} />
      <Container>
        <Row>
          <Col lg="12">
            <Card className="tours-table-card">
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours?.map((tour) => (
                    <tr key={tour._id}>
                      <td>
                        <img 
                          src={tour.photo} 
                          alt={tour.title} 
                          className="tour-thumb" 
                        />
                      </td>
                      <td>{tour.title}</td>
                      <td>${tour.price}</td>
                      <td>{tour.featured ? 'Yes' : 'No'}</td>
                      <td>
                        <Button 
                          color="warning" 
                          size="sm" 
                          className="me-2 edit-btn"
                        >
                          <i className="ri-edit-line"></i> Edit
                        </Button>
                        <Button 
                          color="danger" 
                          size="sm"
                          className="delete-btn"
                        >
                          <i className="ri-delete-bin-line"></i> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>

      {isAddModalOpen && <AddTourModal onClose={() => setIsAddModalOpen(false)} />}
    </section>
  );
};

export default AdminTours; 