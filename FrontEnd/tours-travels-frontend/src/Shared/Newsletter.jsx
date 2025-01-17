import React from 'react'
import "./Newsletter.css"
import { Container, Row, Col } from 'reactstrap'
import MaleTourist from "../assets/images/male-tourist.png"

const Newsletter = () => {
  return (
    <section className='travel__newsletter'>
      <Container>
        <Row className="align-items-center">
          <Col lg="6">
            <div className="travel__newsletter-content" data-aos="fade-right">
              <h2>Subscribe Now to Get<br />Useful Traveling Information</h2>

              <div className="travel__newsletter-input">
                <input type="email" placeholder='Enter your email' />
                <button className='btn travel__newsletter-btn'>
                  Subscribe <i className="ri-send-plane-line"></i>
                </button>
              </div>

              <p>
                Join our community of travel enthusiasts and get exclusive access to 
                destination guides, travel tips, and special offers delivered straight 
                to your inbox.
              </p>

              <div className="travel__newsletter-features">
                <div className="travel__feature">
                  <i className="ri-check-double-line"></i>
                  <span>Weekly Travel Updates</span>
                </div>
                <div className="travel__feature">
                  <i className="ri-check-double-line"></i>
                  <span>Exclusive Deals & Offers</span>
                </div>
                <div className="travel__feature">
                  <i className="ri-check-double-line"></i>
                  <span>Travel Tips & Guides</span>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="travel__newsletter-img" data-aos="fade-left">
              <div className="travel__shape"></div>
              <img src={MaleTourist} alt="Tourist with camera" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Newsletter