import React from 'react'
import Slider from 'react-slick'
import ava01 from "../../assets/images/ava-1.jpg"
import ava02 from "../../assets/images/ava-2.jpg"
import ava03 from "../../assets/images/ava-3.jpg"
import "./Testimonials.css"

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <Slider {...settings}>
            <div className="testimonial__item" data-aos="fade-up">
                <div className="testimonial__content">
                    <div className="testimonial__img-wrapper">
                        <img src={ava01} alt="testimonial avatar" />
                        <i className="ri-double-quotes-l quote-icon"></i>
                    </div>
                    <p>
                        "Our trip was absolutely amazing! The attention to detail and personalized service 
                        made it unforgettable. Every destination was carefully chosen and the local experiences were authentic."
                    </p>
                    <div className="testimonial__info">
                        <h5>John Doe</h5>
                        <p>Customer</p>
                        <div className="rating">
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="testimonial__item" data-aos="fade-up" data-aos-delay="100">
                <div className="testimonial__content">
                    <div className="testimonial__img-wrapper">
                        <img src={ava02} alt="testimonial avatar" />
                        <i className="ri-double-quotes-l quote-icon"></i>
                    </div>
                    <p>
                        "The tour guides were knowledgeable and friendly. They showed us hidden gems 
                        we would never have found on our own. It was the perfect blend of adventure and comfort."
                    </p>
                    <div className="testimonial__info">
                        <h5>Lia Frank</h5>
                        <p>Customer</p>
                        <div className="rating">
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-half-fill"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="testimonial__item" data-aos="fade-up" data-aos-delay="200">
                <div className="testimonial__content">
                    <div className="testimonial__img-wrapper">
                        <img src={ava03} alt="testimonial avatar" />
                        <i className="ri-double-quotes-l quote-icon"></i>
                    </div>
                    <p>
                        "From booking to return, everything was seamless. The accommodations were excellent, 
                        and the itinerary was perfectly paced. We'll definitely book with them again!"
                    </p>
                    <div className="testimonial__info">
                        <h5>James Wilson</h5>
                        <p>Customer</p>
                        <div className="rating">
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
        </Slider>
    )
}

export default Testimonials