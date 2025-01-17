const User = require("../models/User.js");

 const createUser = async (req, res) => {
    try {
        const { body } = req;
        const newUser = new User(body);
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: savedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create user" });
    }
};

 const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to get users" });
    }
};

 const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to get user" });
    }
};

 const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
};

 const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete user" });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser , deleteUser};