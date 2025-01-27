import React, { useState, useContext } from 'react';
import { Container, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import useFetchPost from '../../hooks/useFetchPost';
import useFetchDelete from '../../hooks/useFetchDelete';
import './AdminTours.css';
import { useNavigate } from 'react-router-dom';
import AddTourModal from './AddTourModal';
import CommonSection from '../../Shared/CommonSection';

const AdminTours = () => {
  const { isAdmin } = useContext(AuthContext);
  const { data: tours, loading, error: fetchError } = useFetch('tours');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [tourToDelete, setTourToDelete] = useState(null);
  const navigate = useNavigate();
  const { postData, updateData } = useFetchPost();
  const { deleteData: deleteDataFromUseFetchDelete, loading: deleteLoading } = useFetchDelete();
  const [formError, setFormError] = useState(null);

  const handleCreateTour = async (tourData) => {
    try {
      setFormError(null);
      const response = await postData('tours', tourData);
      
      if (response.success) {
        setIsAddModalOpen(false);
        window.location.reload();
      } else {
        throw new Error(response.message || 'Failed to create tour');
      }
    } catch (err) {
      console.error("Error creating tour:", err);
      setFormError(err.message || 'Failed to create tour. Please try again.');
    }
  };

  const handleEditTour = async (tourId, tourData) => {
    try {
      const response = await updateData(`tours/${tourId}`, tourData);
      if (response.success) {
        setSelectedTour(null);
        window.location.reload();
      }
    } catch (err) {
      console.error("Error updating tour:", err);
    }
  };

  const handleDeleteClick = (tour) => {
    setTourToDelete(tour);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteDataFromUseFetchDelete(`/tours/${tourToDelete._id}`.replace(/\/+/g, '/'));
      if (response.success) {
        setTourToDelete(null);
        window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting tour:", err);
    }
  };

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
  
  if (fetchError) return (
    <div className="error-state">
      <div>Error: {fetchError}</div>
    </div>
  );

  return (
    <section className="admin-tours">
      <CommonSection title={"Tours Management"} />
      <Container>
        {formError && (
          <div className="alert alert-danger mb-4">
            {formError}
          </div>
        )}
        <div className="tours-grid">
          <div className="tour-card add-tour-card" onClick={() => setIsAddModalOpen(true)}>
            <div className="add-tour-content">
              <i className="ri-add-circle-line"></i>
              <h3>Add New Tour</h3>
              <p>Create a new tour package</p>
            </div>
          </div>

          {tours?.map((tour) => (
            <div className="tour-card" key={tour._id}>
              <div className="tour-image">
                <img src={tour.photo} alt={tour.title} className="tour-thumb" />
                <div className="tour-actions">
                  <div 
                    className="icon-btn edit" 
                    title="Edit"
                    onClick={() => setSelectedTour(tour)}
                  >
                    <i className="ri-edit-line"></i>
                  </div>
                  <div 
                    className="icon-btn delete" 
                    title="Delete"
                    onClick={() => handleDeleteClick(tour)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </div>
                </div>
              </div>
              <div className="tour-info">
                <h3 className="tour-title">{tour.title}</h3>
                <div className="tour-meta">
                  <span className="tour-price">${tour.price}</span>
                  {tour.featured ? (
                    <span className="featured-badge">Featured</span>
                  ) : (
                    <span className="not-featured-badge">Not Featured</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={!!tourToDelete} 
        toggle={() => setTourToDelete(null)}
        className="delete-modal"
      >
        <ModalBody>
          <div className="delete-modal-content">
            <i className="ri-error-warning-line warning-icon"></i>
            <h3>Delete Tour</h3>
            <p>Are you sure you want to delete "{tourToDelete?.title}"? This action cannot be undone.</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button 
            className="cancel-button" 
            onClick={() => setTourToDelete(null)}
          >
            <span>Cancel</span>
          </Button>
          <Button 
            className="delete-button" 
            onClick={handleDeleteConfirm}
            disabled={deleteLoading}
          >
            <span>{deleteLoading ? 'Deleting...' : 'Delete Tour'}</span>
            <i className={deleteLoading ? "ri-loader-4-line" : "ri-delete-bin-line"}></i>
          </Button>
        </ModalFooter>
      </Modal>

      {isAddModalOpen && (
        <AddTourModal 
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleCreateTour}
        />
      )}
      
      {selectedTour && (
        <AddTourModal 
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
          onSubmit={(data) => handleEditTour(selectedTour._id, data)}
        />
      )}
    </section>
  );
};

export default AdminTours; 