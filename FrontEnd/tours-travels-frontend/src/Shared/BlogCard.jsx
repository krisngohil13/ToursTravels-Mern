import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./Blogcard.css";

const BlogCard = ({ blog }) => {
  const { _id, title, author, date, photo, comments } = blog;

  return (
    <div className="tour__blog">
      <div className="blog__card" data-aos="fade-up">
        <Card>
          <div className="blog__img">
            <img src={photo} alt="blog" />
            <span className="blog__date">{date}</span>
          </div>
          <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
              <span className="blog__author d-flex align-items-center gap-1">
                <i className="ri-user-line"></i>
                {author}
              </span>
              <span className="blog__comments d-flex align-items-center gap-1">
                <i className="ri-chat-3-line"></i>
                {comments?.length} Comments
              </span>
            </div>

            <h5 className="blog__title">
              <Link to={`/blogs/${_id}`}>{title}</Link>
            </h5>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <Link to={`/blogs/${_id}`} className="read__more">
                Read More <i className="ri-arrow-right-line"></i>
              </Link>
              <span className="blog__likes">
                <i className="ri-heart-line"></i> 1.2k
              </span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default BlogCard;
