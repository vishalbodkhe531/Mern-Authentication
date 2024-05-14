import { User } from "../model/user.model.js";
import { errorHanddler } from "../utils/error.handdler.js";
import jwt from "jsonwebtoken";

export const authentication = async (req, res, next) => {
  try {
    const { cookie } = req.cookies;

    if (!cookie) return next(errorHanddler(400, "You should login first"));

    const data = jwt.verify(cookie, process.env.SRECTRET_KEY);

    req.user = await User.findById({ _id: data._id });
    next();
  } catch (error) {
    next(error);
  }
};
