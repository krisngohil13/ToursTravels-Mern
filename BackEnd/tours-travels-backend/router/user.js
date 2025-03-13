const express = require("express");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController.js");
const {verifyToken,verifyAdmin,verifyUser} = require("../utils/verifyToken.js");


const userRoute = express.Router();

userRoute.post("/", verifyAdmin, createUser);

userRoute.get("/", verifyAdmin, getAllUsers);

userRoute.get("/:id", verifyUser, getUserById);

userRoute.put("/:id", verifyAdmin, updateUser);

userRoute.delete("/:id", verifyUser, deleteUser);

module.exports = userRoute;
