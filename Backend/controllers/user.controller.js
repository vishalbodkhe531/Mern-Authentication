import { User } from "../model/user.model.js";
import { errorHanddler } from "../utils/error.handdler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const userCreate = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isExistUser = await User.findOne({ email });

    if (isExistUser) return next(errorHanddler(400, "User already existed"));

    const hashPass = bcryptjs.hashSync(password, 10);

    await User.create({
      name,
      email,
      password: hashPass,
    });

    res.status(202).json({ message: "User successfully created" });
  } catch (error) {
    next(error);
  }
};

// User Login

export const userLogin = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isExisteUser = await User.findOne({ email });

    if (!isExisteUser) return next(errorHanddler(400, "User not found"));

    const mathPass = bcryptjs.compareSync(
      req.body.password,
      isExisteUser.password
    );

    if (!mathPass) return next(errorHanddler(404, "Incorrect password"));

    const token = jwt.sign({ _id: isExisteUser._id }, process.env.SRECTRET_KEY);

    const { password, ...rest } = isExisteUser._doc;
    res
      .cookie("cookie", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// User Profile
export const userProfile = async (req, res, next) => {
  const { user } = req;

  const { password, ...rest } = user._doc;

  res.status(200).json(rest);
};

// User Logout

export const userLogout = async (req, res, next) => {
  res
    .clearCookie("cookie")
    .status(200)
    .json({ message: "User successfully Logout " });
};

// User update
export const userUpdate = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHanddler(400, "You can update only your profile"));

  try {
    if (req.body.email) {
      const isExist = await User.findOne({ email: req.body.email });
      if (isExist) return next(errorHanddler(400, "Email already existed"));

      if (req.body.password) {
        req.body.password = bcryptjs.compareSync(req.body.password, 10);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const userDelete = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHanddler(401, "You can delete only your account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .clearCookie("cookie")
      .status(200)
      .json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
