import React, { useState } from 'react';
import { Container, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import useFetch from '../../hooks/useFetch';
import useFetchDelete from '../../hooks/useFetchDelete';
import useFetchPut from '../../hooks/useFetchPut';
import CommonSection from '../../Shared/CommonSection';
import './AdminUsers.css';

const AdminUsers = () => {
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const { data: users, loading, error } = useFetch('users');
  const { deleteData, loading: deleteLoading } = useFetchDelete();
  const { putData } = useFetchPut();

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteData(`users/${userToDelete._id}`);
      setUserToDelete(null);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await putData(`users/${userToEdit._id}`, {
        role: userToEdit.role === 'user' ? 'admin' : 'user'
      });
      setUserToEdit(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) return <h4 className="text-center pt-5">Loading...</h4>;
  if (error) return <h4 className="text-center pt-5">{error}</h4>;

  return (
    <section className="admin-users-section">
      <CommonSection title="Users Management" />
      <Container>
        <div className="admin-users-grid">
          {users?.map((user) => (
            <div className="admin-user-card" key={user._id}>
              <span className={`admin-role-badge ${user.role}`}>
                {user.role}
              </span>
              <div className="admin-user-header">
                <div className="admin-user-avatar">
                  <div className="admin-avatar-inner">
                    <i className="ri-user-line admin-avatar-icon"></i>
                  </div>
                </div>
                <div className="admin-user-info">
                  <h3 className="admin-user-name">{user.username}</h3>
                  <p className="admin-user-email">{user.email}</p>
                </div>
              </div>
              <div className="admin-user-actions">
                <Button
                  className="admin-btn admin-edit-btn"
                  onClick={() => handleEditClick(user)}
                >
                  <i className="ri-edit-line"></i>
                  Change Role
                </Button>
                <Button
                  className="admin-btn admin-delete-btn"
                  onClick={() => handleDeleteClick(user)}
                  disabled={user.role === 'admin'}
                >
                  <i className="ri-delete-bin-line"></i>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={!!userToDelete} toggle={() => setUserToDelete(null)}>
          <ModalBody className="admin-modal-body">
            Are you sure you want to delete user "{userToDelete?.username}"?
          </ModalBody>
          <ModalFooter className="admin-modal-footer">
            <Button 
              className="admin-btn admin-modal-btn secondary-btn" 
              onClick={() => setUserToDelete(null)}
            >
              Cancel
            </Button>
            <Button 
              className="admin-btn admin-modal-btn admin-delete-btn"
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </ModalFooter>
        </Modal>

        {/* Edit Role Modal */}
        <Modal isOpen={!!userToEdit} toggle={() => setUserToEdit(null)}>
          <ModalBody className="admin-modal-body">
            Change role of "{userToEdit?.username}" from {userToEdit?.role} to {userToEdit?.role === 'user' ? 'admin' : 'user'}?
          </ModalBody>
          <ModalFooter className="admin-modal-footer">
            <Button 
              className="admin-btn admin-modal-btn secondary-btn" 
              onClick={() => setUserToEdit(null)}
            >
              Cancel
            </Button>
            <Button 
              className="admin-btn admin-modal-btn admin-edit-btn"
              onClick={handleEditSubmit}
            >
              Change Role
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </section>
  );
};

export default AdminUsers; 