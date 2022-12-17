import { Router } from "express";
import UserController from "../controllers/UserController";

class UserRouter {
  static router = Router();
  static controller = UserController;
}

UserRouter.router.get("/id", UserRouter.controller.getUser);
UserRouter.router.get("/", UserRouter.controller.getAllUsers);

UserRouter.router.post("/", UserRouter.controller.postUser);

UserRouter.router.delete("/id", UserRouter.controller.deleteUser);

type IUserRouter = typeof UserRouter;

export default UserRouter;
export { IUserRouter };
