import React from "react";
import { Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import BlogCard from "../../Shared/BlogCard";
import "../../Shared/Blogcard.css";

const FeaturedBlogsList = () => {
  const { data: featuredBlogs, loading, error } = useFetch(`/blogs/featured`);

  return (
    <>
      {loading && (
        <div className="text-center">
          <h4>Loading...</h4>
        </div>
      )}
      {error && (
        <div className="text-center">
          <h4>{error}</h4>
        </div>
      )}
      {!loading && !error && featuredBlogs?.map(blog => (
        <Col lg="4" md="6" sm="6" className="mb-4" key={blog._id} data-aos="fade-up">
          <BlogCard blog={blog} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedBlogsList;
