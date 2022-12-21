import { model, Types } from "mongoose";
import userSchema from "./UserSchema.js";
import DBMongoDB from "../DB/MongoDB.js";
import User, { ComingUser } from "../../types/User.js";

const UserModel = model("user", userSchema);

export default class UserModelMongo {
  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - C: Create                              //
  ////////////////////////////////////////////////////////////////////////////////`

  static async createUser(user: ComingUser | ComingUser[]) {
    if (!(await DBMongoDB.connectDB())) {
      return {} as User;
    }
    const userCreated = await UserModel.create(user);
    if (Array.isArray(userCreated)) {
      const usersFormated = DBMongoDB.getObjectWithId<User>(
        userCreated.map((user) => user.toObject())
      );
      return usersFormated;
    }
    const userFormatted = DBMongoDB.getObjectWithId<User>(
      userCreated.toObject()
    );
    return userFormatted;
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                               CRUD - R: Read                               //
  ////////////////////////////////////////////////////////////////////////////////

  static async getAll() {
    if (!(await DBMongoDB.connectDB())) {
      return [] as User[];
    }
    // const users = await UserModel.find({}).lean().exec();
    const users = await UserModel.aggregate<User>([
      {
        $addFields: {
          id: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
        },
      },
    ]);
    // const usersFormatted = DBMongoDB.getObjectWithId(users) as User[];
    // return usersFormatted;
    return users;
  }

  static async getUser(id: string) {
    if (!(await DBMongoDB.connectDB())) {
      return {} as User;
    }
    // const user = await UserModel.findById(id).lean().exec();
    const [user] = await UserModel.aggregate<User>([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $addFields: {
          id: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
        },
      },
    ]);
    console.log(user);
    if (!user) throw new Error("User not found");
    // const userFormatted = DBMongoDB.getObjectWithId(user) as User;
    // return userFormatted;
    return user;
  }

  ////////////////////////////////////////////////////////////////////////////////
  //                              CRUD - D: Delete                              //
  ////////////////////////////////////////////////////////////////////////////////
  static async deleteUser(id: string) {
    if (!(await DBMongoDB.connectDB())) {
      return {} as User;
    }
    const deletedUser = await UserModel.findByIdAndDelete(id).lean().exec();
    if (!deletedUser) throw new Error("User not found");
    const userFormatted = DBMongoDB.getObjectWithId(deletedUser) as User;
    return userFormatted;
  }
}
