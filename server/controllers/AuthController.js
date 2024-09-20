import { compare } from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  console.log("---Signup---");

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const user = await UserModel.create({ email, password });
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    console.log(`Status ${user.status} Message: ${user.message}`);

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(`Status: ${error.status} Message: ${error.message}`);

    return res.status(400).send("Internal qwdqwdwqd error");
  }
};
export const login = async (req, res, next) => {
  console.log("---Login---");

  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send({ message: "User not found" });
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      console.log("Password is incorrect");
      return res.status(400).send({ message: "Password is incorrect" });
    }

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    console.log(`Status ${res.status} Message: ${res.message}`);
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(`Status: ${error.status} Message: ${error.message}`);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res, next) => {
  console.log("---Get User Info---");

  try {
    const userData = await UserModel.findById(req.userId);
    if (!userData) {
      console.log("User not found");
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      },
    });
  } catch (error) {
    console.log(`Status: ${error} Message: ${error.message}`);
    return res.status(500).send("Internal Server Error");
  }
};
