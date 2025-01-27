import React, { useState } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input,
  Row,
  Col,
  Alert
} from 'reactstrap';
import './AddTourModal.css';  // Import the new CSS file

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const MAX_IMAGE_DIMENSION = 600; // Reduced from 800 to 600
const COMPRESSION_QUALITY = 0.5; // Reduced from 0.7 to 0.5

const AddTourModal = ({ tour, onClose, onSubmit }) => {
  const [tourData, setTourData] = useState({
    title: tour?.title || '',
    city: tour?.city || '',
    address: tour?.address || '',
    distance: tour?.distance || 0,
    photo: tour?.photo || '',
    desc: tour?.desc || '',
    price: tour?.price || 0,
    maxGroupSize: tour?.maxGroupSize || 0,
    featured: tour?.featured || false
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTourData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > MAX_IMAGE_DIMENSION) {
              height *= MAX_IMAGE_DIMENSION / width;
              width = MAX_IMAGE_DIMENSION;
            }
          } else {
            if (height > MAX_IMAGE_DIMENSION) {
              width *= MAX_IMAGE_DIMENSION / height;
              height = MAX_IMAGE_DIMENSION;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          // Use better image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          // Try to further reduce size by converting to JPEG with lower quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
          
          // Create a temporary image to check final dimensions
          const tempImg = new Image();
          tempImg.src = compressedDataUrl;
          
          tempImg.onload = () => {
            // If still too large, compress again
            if (compressedDataUrl.length > 800 * 1024) { // If larger than 800KB
              const secondCanvas = document.createElement('canvas');
              const scale = Math.min(1, Math.sqrt(800 * 1024 / compressedDataUrl.length));
              
              secondCanvas.width = tempImg.width * scale;
              secondCanvas.height = tempImg.height * scale;
              
              const ctx2 = secondCanvas.getContext('2d');
              ctx2.imageSmoothingEnabled = true;
              ctx2.imageSmoothingQuality = 'high';
              ctx2.drawImage(tempImg, 0, 0, secondCanvas.width, secondCanvas.height);
              
              resolve(secondCanvas.toDataURL('image/jpeg', 0.4));
            } else {
              resolve(compressedDataUrl);
            }
          };
          
          tempImg.onerror = reject;
        };
        
        img.onerror = reject;
      };
      
      reader.onerror = reject;
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (file.size > MAX_FILE_SIZE) {
          setError(`File size should be less than ${Math.round(MAX_FILE_SIZE/1024)}KB`);
          return;
        }

        setError('Processing image...');
        const compressedImage = await compressImage(file);
        
        // Final size check
        const sizeInMB = compressedImage.length / (1024 * 1024);
        if (sizeInMB > 1) {
          setError('Image is still too large. Please choose a smaller image.');
          return;
        }

        setTourData(prev => ({
          ...prev,
          photo: compressedImage
        }));
        setError('');
      } catch (err) {
        setError('Error processing image. Please try another image.');
        console.error('Error processing image:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    
    try {
      // Validate required fields
      if (!tourData.title || !tourData.city || !tourData.address || 
          !tourData.photo || !tourData.desc || !tourData.price || 
          !tourData.maxGroupSize) {
        setError('Please fill in all required fields');
        return;
      }

      // Convert string values to numbers where needed
      const formattedData = {
        ...tourData,
        price: Number(tourData.price) || 0,
        maxGroupSize: Number(tourData.maxGroupSize) || 0,
        distance: Number(tourData.distance) || 0,
        featured: Boolean(tourData.featured)
      };

      // Validate numeric values
      if (formattedData.price <= 0) {
        setError('Price must be greater than 0');
        return;
      }

      if (formattedData.maxGroupSize <= 0) {
        setError('Max group size must be greater than 0');
        return;
      }

      await onSubmit(formattedData);
    } catch (err) {
      console.error('Submit Error:', err);
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <Modal isOpen={true} toggle={onClose} size="lg" className="tour-modal">
      <ModalHeader toggle={onClose}>
        {tour ? 'Edit Tour' : 'Create New Tour'}
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="title">Title*</Label>
                <Input
                  type="text"
                  name="title"
                  value={tourData.title}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="city">City*</Label>
                <Input
                  type="text"
                  name="city"
                  value={tourData.city}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label for="address">Address*</Label>
            <Input
              type="text"
              name="address"
              value={tourData.address}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="distance">Distance (km)*</Label>
                <Input
                  type="number"
                  name="distance"
                  value={tourData.distance}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="price">Price*</Label>
                <Input
                  type="number"
                  name="price"
                  value={tourData.price}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label for="photo">Tour Photo* (Max size: 500KB)</Label>
            <div className="photo-upload-container">
              <Input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="photo-input"
              />
              {tourData.photo && (
                <div className="photo-preview">
                  <img src={tourData.photo} alt="Preview" />
                </div>
              )}
            </div>
          </FormGroup>

          <FormGroup>
            <Label for="desc">Description*</Label>
            <Input
              type="textarea"
              name="desc"
              value={tourData.desc}
              onChange={handleChange}
              rows="3"
              required
            />
          </FormGroup>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="maxGroupSize">Max Group Size*</Label>
                <Input
                  type="number"
                  name="maxGroupSize"
                  value={tourData.maxGroupSize}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup check className="mt-4">
                <Label check>
                  <Input
                    type="checkbox"
                    name="featured"
                    checked={tourData.featured}
                    onChange={handleChange}
                  />{' '}
                  Featured Tour
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} className="cancel-button">
            <span>Cancel</span>
          </Button>
          <Button type="submit" className="create-button">
            <span>{tour ? 'Update Tour' : 'Create Tour'}</span>
            <i className={tour ? "ri-check-line" : "ri-add-line"}></i>
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AddTourModal; 