import { Request, Response } from "express";
import { ComingUser } from "../types/User.js";
import UserModel from "../models/User/UserModel.js";

interface CustomRequest<T> extends Request {
  body: T;
}

class UserController {
  static Model = UserModel;

  static getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await UserController.Model.getUser(id);
      res.json(user);
    } catch (e: unknown) {
      console.error("Error leyendo un user: ", e);
      res.status(404).json({});
    }
  };
  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const allUsers = await UserController.Model.getAll();
      res.json(allUsers);
    } catch (e: unknown) {
      console.error("Error leyendo todos los usuarios: ", e);
      res.status(404).json({});
    }
  };

  static postUser = async (
    req: CustomRequest<ComingUser | { user: ComingUser[] }>,
    res: Response
  ) => {
    let user: ComingUser | ComingUser[];
    if ("user" in req.body) {
      user = req.body.user;
    } else {
      user = req.body;
    }
    console.log(user);
    try {
      const userCreated = await UserController.Model.createUser(user);
      res.json(userCreated);
    } catch (e: unknown) {
      console.error("Error creando un usuario: ", e);
      res.status(404).json({});
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const userDeleted = await UserController.Model.deleteUser(id);
      res.json(userDeleted);
    } catch (e: unknown) {
      console.log("Error borrando un usuario: ", e);
      res.status(404).json({});
    }
  };
}

export default UserController;
