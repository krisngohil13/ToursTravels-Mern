import React, { useEffect, useState } from 'react'
import "../styles/Home.css"
import {Container,Row, Col} from 'reactstrap'
import heroImg from "../assets/images/hero-img1.jpg"
import heroImg2 from "../assets/images/hero-image2.jpg"
import heroVideo from "../assets/images/hero-video.mp4"
import Subtitle from '../Shared/Subtitle'
import worldImg from "../assets/images/world.png"
import experienceImage from "../assets/images/experience.png"
import SearchBar from '../Shared/SearchBar'
import ServiceList from '../Services/ServiceList'
import FeaturedToursList from '../Components/FeaturedTours/FeaturedToursList'
import MasonryImagesGallery from '../Components/Image-gallery/MasonryImagesGallery'
import Testimonials from '../Components/Testimonials/Testimonials'
import Newsletter from '../Shared/Newsletter'
import Contact from './Contact'
import FeaturedBlogsList from '../Components/FeaturedBlogs/FeaturedBlogsList'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { type: 'image', src: heroImg },
    { type: 'video', src: heroVideo },
    { type: 'image', src: heroImg2 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 9000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      <section className="hero__section">
        <div className="hero__overlay"></div>
        
        <div className="hero__content">
          <div className="hero__subtitle">
            <Subtitle subtitle={"Discover the World"} />
            <img src={worldImg} alt="world" />
          </div>
          <h1>
            Explore the World's
            <br />
            <span className="highlight">
              <div className="parallax-card">
                <div className="card-content">
                  <div className="card-title">Hidden Gems</div>
                  <div className="parallax-element element-1">✨</div>
                  <div className="parallax-element element-2">🌟</div>
                  <div className="parallax-element element-3">🌍</div>
                  <div className="parallax-element element-4">🧭</div>
                  <div className="parallax-element element-5">🏝️</div>
                  <div className="parallax-element element-6">⭐</div>
                </div>
              </div>
            </span>
          </h1>
          <p>
            Embark on unforgettable journeys to breathtaking destinations. 
            Create memories that will last a lifetime with our curated travel experiences.
          </p>
        </div>

        <div className="hero__gallery">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`gallery__item ${index === currentSlide ? 'active' : ''}`}
            >
              {slide.type === 'video' ? (
                <video 
                  src={slide.src} 
                  autoPlay 
                  loop 
                  muted 
                  className="gallery__video"
                />
              ) : (
                <img src={slide.src} alt="" className="gallery__img" />
              )}
            </div>
          ))}
          
          <div className="slider__dots">
            {slides.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <SearchBar/>
      </section>
      
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h5 className="services__subtitle">What We Serve</h5>
              <h2 className="services__title">We Offer Our Best Services</h2>
            </Col>
          </Row>
          <ServiceList/>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className='mb-5'>
              <Subtitle subtitle={"Explore"}/>
              <h2 className="featured__tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedToursList/>
          </Row>
        </Container>
      </section>

      <section className="experience__section">
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="experience__content" data-aos="fade-right">
                <Subtitle subtitle={"Our Experience"} />
                <h2>
                  Transforming Dreams
                  <br />
                  Into Unforgettable
                  <br />
                  Adventures
                </h2>
                <p>
                  With years of expertise in crafting perfect journeys, we understand what makes 
                  travel truly special. Our dedicated team ensures every moment of your trip is 
                  filled with authentic experiences and lasting memories.
                </p>

                <div className="counter__wrapper">
                  <div className="counter__box" data-aos="zoom-in" data-aos-delay="100">
                    <span>12k+</span>
                    <h6>Successful Trips</h6>
                  </div>
                  <div className="counter__box" data-aos="zoom-in" data-aos-delay="200">
                    <span>2k+</span>
                    <h6>Happy Clients</h6>
                  </div>
                  <div className="counter__box" data-aos="zoom-in" data-aos-delay="300">
                    <span>15+</span>
                    <h6>Years of Journey</h6>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg="6">
              <div className="experience__img" data-aos="fade-left">
                <img src={experienceImage} alt="Travel Experience" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="gallery__section">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title" data-aos="fade-up">
                Explore Our Travel Moments
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="featured__blogs">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <Subtitle subtitle={"Our Blog"} />
              <h2 className="featured__blog-title">Latest Travel Stories</h2>
            </Col>
            <FeaturedBlogsList />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Testimonial"}/>
              <h2 className="testmonials__title">What our Customers Say about us</h2>
            </Col>
            <Testimonials/>
          </Row>
        </Container>
      </section>
      <Contact/>
      <Newsletter/>
    </>
  )
}

export default Home