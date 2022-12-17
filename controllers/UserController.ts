import { Request, Response } from "express";
import UserModel from "../models/User/UserModel";

class UserController {
  static Model = UserModel;

  static getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await UserController.Model.readUser(id);
      res.json(user);
    } catch (e: Error) {
      console.error("Error leyendo un user: ", e);
      res.status(404).json({});
    }
  };
  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const allUsers = await UserController.Model.readAll();
      res.json(allUsers);
    } catch (e: Error) {
      console.error("Error leyendo todos los usuarios: ", e);
      res.status(404).json({});
    }
  };

  static postUser = async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
      const userCreated = await UserController.Model.createUser(user);
      res.json(userCreated);
    } catch (e: Error) {
      console.error("Error creando un usuario: ", e);
      res.status(404).json({});
    }
  };

  static deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const userDeleted = await UserController.Model.deleteUser(id);
      res.json(userDeleted);
    } catch (e: Error) {
      console.log("Error borrando un usuario: ", e);
      res.status(404).json({});
    }
  };
}

export default UserController;
