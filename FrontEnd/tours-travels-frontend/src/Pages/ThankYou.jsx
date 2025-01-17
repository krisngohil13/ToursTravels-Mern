import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import "../styles/ThankYou.css"

const ThankYou = () => {
  return (
    <section className="thank-you__section">
      <Container>
        <Row>
          <Col lg="12">
            <div className="thank-you__wrapper">
              <div className="thank-you__card">
                <div className="check-mark">
                  <i className="ri-checkbox-circle-line"></i>
                </div>
                <h1>Thank You!</h1>
                <h3>Your tour has been booked successfully</h3>
                <p>You will receive a confirmation email shortly</p>
                <div className="thank-you__actions">
                  <Link to="/tours" className="secondary__btn">
                    Browse More Tours
                  </Link>
                  <Link to="/" className="primary__btn">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ThankYou