import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './Commonsection.css'

const CommonSection = ({title}) => {
  return (
    <section className="common__section">
      <div className="common__section-bg">
        <div className="floating-elements">
          <i className="ri-plane-line element plane"></i>
          <i className="ri-map-pin-line element pin"></i>
          <i className="ri-compass-3-line element compass"></i>
          <i className="ri-earth-line element globe"></i>
          <i className="ri-suitcase-line element suitcase"></i>
        </div>
      </div>
      <Container>
        <Row>
          <Col lg="12">
            <div className="common__section-content">
              <div className="title-box">
                <div className="title-wrapper">
                  <h1>{title}</h1>
                  <div className="underline">
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CommonSection