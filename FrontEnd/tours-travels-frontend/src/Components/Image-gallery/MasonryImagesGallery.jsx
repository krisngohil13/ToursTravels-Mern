import React from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import galleryImages from './galleryImage'
import './MasonryGallery.css'

const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter="1rem">
        {galleryImages.map((item, index) => (
          <div className="gallery__card" key={index} data-aos="fade-up">
            <img
              src={item}
              alt={`gallery-${index}`}
              className="gallery__img"
              loading="lazy"
            />
            <div className="gallery__content">
              <div className="gallery__info">
                <i className="ri-map-pin-line"></i>
                <span>Beautiful Place</span>
              </div>
              <button className="view__btn">
                <i className="ri-eye-line"></i>
              </button>
            </div>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default MasonryImagesGallery