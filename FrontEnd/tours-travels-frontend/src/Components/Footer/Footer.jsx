import React from "react";
import "./footer.css";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Logo and About Section */}
          <Col lg="4" md="6" sm="12" className="footer__section">
            <div className="footer__logo">
              <div className="logo-text" onClick={() => navigate('/')}>
                <span className="tours">Tours</span>
                <span className="and">&</span>
                <span className="travels">Travels</span>
              </div>
              <p className="footer__text">
                Discover the world with us. Experience unique destinations and
                create unforgettable memories through our curated travel experiences.
              </p>
              <div className="social__links">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="facebook"
                >
                  <i className="ri-facebook-fill"></i>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <i className="ri-instagram-fill"></i>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="twitter"
                >
                  <i className="ri-twitter-fill"></i>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="youtube"
                >
                  <i className="ri-youtube-fill"></i>
                </a>
              </div>
            </div>
          </Col>

          {/* Quick Links Section */}
          <Col lg="4" md="6" sm="12" className="footer__section">
            <h5 className="footer__title">Discover</h5>
            <ul className="footer__links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/tours">Tours</Link>
              </li>
              <li>
                <Link to="/blogs">Travel Blog</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
            </ul>
          </Col>

          {/* Contact Information */}
          <Col lg="4" md="12" sm="12" className="footer__section">
            <h5 className="footer__title">Contact Us</h5>
            <ul className="footer__contact">
              <li>
                <i className="ri-map-pin-line"></i>
                <span>Rajkot, Gujarat, India</span>
              </li>
              <li>
                <i className="ri-mail-line"></i>
                <a href="mailto:support@travelworld.com">
                  support@travelworld.com
                </a>
              </li>
              <li>
                <i className="ri-phone-line"></i>
                <a href="tel:+91123456789">
                  +91 123456789
                </a>
              </li>
              <li>
                <i className="ri-time-line"></i>
                <span>Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row>
          <Col lg="12" className="footer__bottom">
            <p>
              © {year} Travel World. All rights reserved. Designed with{" "}
              <i className="ri-heart-fill"></i> by{" "}
              <a
                href="https://www.instagram.com/gohil.krisn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gohil Krishna
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
