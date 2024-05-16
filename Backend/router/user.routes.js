import express from "express";
import {
  googleAuth,
  userCreate,
  userDelete,
  userLogin,
  userLogout,
  userProfile,
  userUpdate,
} from "../controllers/user.controller.js";
import { authentication } from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.post("/register", userCreate);
routes.post("/login", userLogin);

routes.get("/profile", authentication, userProfile);
routes.get("/logout", userLogout);

routes.post("/googleAuth", googleAuth);
routes
  .route("/:id")
  .put(authentication, userUpdate)
  .delete(authentication, userDelete);

export default routes;
