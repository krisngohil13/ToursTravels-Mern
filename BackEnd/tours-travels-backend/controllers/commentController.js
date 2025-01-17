const Comment = require('../models/Comment.js');
const Blog = require('../models/Blog.js');

 const createComment = async (req, res) => {
    const { username, comment } = req.body;
    const { BlogId } = req.params;
    const userId = req.userId;

    if (!username || !comment) {
        return res.status(400).json({ message: "Username and Comment are required fields" });
    }

    try {
        const blog = await Blog.findById(BlogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const newComment = new Comment({
            blog: blog._id,
            username,
            comment,
        });

        await newComment.save();

        blog.comments.push(newComment);

        await blog.save();

        res.status(201).json({ message: "Comment created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create Comment" });
    }
};

 const getCommentsByBlogId = async (req, res) => {
    const { BlogId } = req.params;

    try {
        const blog = await Blog.findById(BlogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const comments = await Comment.find({ blog: BlogId });

        res.status(200).json({
            count: comments.length,
            message: "Comments retrieved successfully",
            data: comments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get blog Comments" });
    }
};

 const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const blog = await Blog.findById(comment.blog);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        blog.comments.pull(commentId);

        await blog.save();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete comment" });
    }
};

module.exports = {
    createComment,
    getCommentsByBlogId,
    deleteComment,
};