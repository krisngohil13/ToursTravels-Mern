const Blog = require('../models/Blog.js');
 const createBlog = async (req, res) => {
    try {
      console.log(req.body);
      const newBlog = await Blog.create(req.body);
      console.log(newBlog); 
      const savedBlog = await newBlog.save();
      console.log(savedBlog);
      res.status(201).json(newBlog);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Failed to create the blog' });
    }
  };
  

 const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the blog' });
  }
};
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.status(200).json({
        success: true,
        message: 'Blog retrieved successfully',
        data: blog, // Return the blog under 'data'
      });
    } else {
      res.status(404).json({ success: false, message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch the blog' });
  }
};



 const getAllBlogs = async ( req,res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

 const getFeaturedBlogs = async (req, res) => {
  try {
    const featuredBlogs = await Blog.find({ featured: true });
    if (featuredBlogs.length > 0) {
      res.status(200).json({
        success: true,
        message: "Featured blogs retrieved successfully",
        data: featuredBlogs,
      });
    } else {
      res.status(404).json({ success: false, message: "No featured blogs found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get featured blogs" });
  }
};
  
// Get single blog
const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Blog found',
      data: blog
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
};

module.exports = {
    createBlog,
    updateBlog,
    getSingleBlog,
    getAllBlogs,
    getFeaturedBlogs,
    getBlogById
};
