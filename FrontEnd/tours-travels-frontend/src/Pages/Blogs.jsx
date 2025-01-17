import React from "react";
import CommonSection from "../Shared/CommonSection";
import "../styles/Tour.css";
import Newsletter from "../Shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import BlogCard from "../Shared/BlogCard";
import useFetch from "../hooks/useFetch"; // Use custom hook for fetching data

const Blogs = () => {
  // Using the custom hook to fetch data from the 'blogs' endpoint
  const { data: blogs, loading, error } = useFetch("blogs");

  // Loading state
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error__msg">
        {error} {/* Display error message */}
      </div>
    );
  }

  return (
    <div>
      <CommonSection title={"All Blogs"} />
      <section className="mt-4">
        <Container>
          <Row>
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog) => (
                <Col lg="4" md="6" sm="6" className="mb-4" key={blog._id}>
                  <BlogCard blog={blog} />
                </Col>
              ))
            ) : (
              <div>No blogs available.</div>  // Display message if no blogs are available
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Blogs;
