import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const AddTourModal = ({ onClose }) => {
  return (
    <Modal isOpen={true} toggle={onClose}>
      <ModalHeader toggle={onClose}>Add New Tour</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" id="title" placeholder="Enter tour title" />
          </FormGroup>
          {/* Add other form fields as needed */}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary">Add Tour</Button>
        <Button color="secondary" onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddTourModal; 