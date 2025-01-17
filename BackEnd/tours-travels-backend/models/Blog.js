const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title is mandatory
    },
    content: {
      type: String,
      required: true, // Content is mandatory
    },
    author: {
      type: String,
      required: true, // Author is mandatory
    },
    photo: {
      type: String,
      required: true, // Photo URL is mandatory
    },
    comments: [
      {
        username: {
          type: String,
          required: true, // Username is mandatory for each comment
        },
        comment: {
          type: String,
          required: true, // Comment text is mandatory
        },
      },
    ],
    featured: {
      type: Boolean,
      default: false, // Featured field is optional, defaults to false
    },
  },
  { timestamps: true } // Mongoose automatically adds createdAt and updatedAt
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
