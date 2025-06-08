import User from "../models/user.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

export const signUp = async (req, res) => {
  const user = req.body;
  if (!user.username || !user.email || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const existingEmail = await User.findOne({ email: user.email });
  if (existingEmail) {
    return res
      .status(400)
      .json({ success: false, message: "Email has been taken" });
  }
  const existingUsername = await User.findOne({ username: user.username });
  if (existingUsername) {
    return res
      .status(400)
      .json({ success: false, message: "Username has been taken" });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(user.email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Email Format" });
  }
  try {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User Account Created, Pls Login" });
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const logIn = async (req, res) => {
  const userInfo = req.body;
  if (!userInfo.email || !userInfo.password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email: userInfo.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong Email: User not found" });
    }
    const isMatch = await bcrypt.compare(userInfo.password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Password" });
    }
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
      { userID: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "You have been Logged In successfully",
      accessToken,
      user: {
    id: user._id,
    username: user.username, // make sure this matches your schema field
    email: user.email,
    // any other safe info you want to send
  }
    });
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token missing" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);


    const accessToken = jwt.sign(
      {userID: decoded.userID},
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    );

    return res.status(200).json({success: true, accessToken})
  } catch (err) {
    console.error("Error: ", err);
    return res.status(403).json({success: false, message: "Invalid or expired Refresh token"});
  }
};

export const logOut = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Lax"
  })

  res.status(200).json({success: true, message: "You've been logged out successfully"})
}