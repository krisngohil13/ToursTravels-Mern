import React from "react";
import BlogCard from "../../Shared/BlogCard";
import useFetch from "../../hooks/useFetch";
import "../../Shared/Blogcard.css";
import "./featured-blogs.css";

const FeaturedBlogsList = () => {
  const { data: featuredBlogs, loading, error } = useFetch(`/blogs/featured`);

  return (
    <div className="featured-blogs">
      {loading && (
        <div className="loading-message">
          <h4>Loading...</h4>
        </div>
      )}
      {error && (
        <div className="error-message">
          <h4>{error}</h4>
        </div>
      )}
      <div className="featured-blogs__grid">
        {!loading && !error && featuredBlogs?.map(blog => (
          <div className="featured-blogs__item" key={blog._id} data-aos="fade-up">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogsList;
