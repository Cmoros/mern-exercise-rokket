import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { upload } from "../middlewares/multer.js";
class UserRouter {
  static router = Router();
  static controller = UserController;
}

UserRouter.router.get("/:id", UserRouter.controller.getUser);
UserRouter.router.get("/", UserRouter.controller.getAllUsers);

UserRouter.router.post("/", upload.fields([]), UserRouter.controller.postUser);

UserRouter.router.delete("/:id", UserRouter.controller.deleteUser);

export default UserRouter;
