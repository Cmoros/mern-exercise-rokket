import config from "../../config.js";
import mongoose, { ConnectOptions, Error } from "mongoose";

const OLD_ID_PROPERTY_NAME = "_id";

const NEW_ID_PROPERTY_NAME = "id";

export type MongooseComingObj<T> =
  | mongoose.LeanDocument<T & { _id: mongoose.Types.ObjectId }>
  | (T & { _id: mongoose.Types.ObjectId; id?: string });

// type MongooseComingArray<T> = MongooseComingObj<T>[];

class DBMongoDB {
  static READY_STATE_DISCONNECTED = 0;
  static READY_STATE_CONNECTED = 1;
  static READY_STATE_CONNECTING = 2;
  static READY_STATE_DISCONNECTING = 3;

  static getObjectWithId<T>(obj: MongooseComingObj<T>): T;
  static getObjectWithId<T>(obj: MongooseComingObj<T>[]): T[];
  static getObjectWithId<T>(
    obj: MongooseComingObj<T> | MongooseComingObj<T>[]
  ) {
    if (Array.isArray(obj)) {
      const formattedArray = obj.map((element) =>
        DBMongoDB.replaceIdProperty<T>(element)
      );
      return formattedArray;
    }
    return DBMongoDB.replaceIdProperty<T>(obj);
  }

  static replaceIdProperty<T>(obj: MongooseComingObj<T>) {
    const newObj = { ...obj } as T & {
      _id?: mongoose.Types.ObjectId;
      id: string;
    };

    newObj[NEW_ID_PROPERTY_NAME] = obj[OLD_ID_PROPERTY_NAME].toString();
    delete newObj[OLD_ID_PROPERTY_NAME];
    return newObj;
  }

  static async connectDB() {
    try {
      if (mongoose.connection.readyState === DBMongoDB.READY_STATE_CONNECTED) {
        return true;
      }
      await mongoose.connect(config.MONGODB_CONNECTION_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: config.MONGODB_TIMEOUT,
      } as ConnectOptions);
      console.error("Conexión con MongoDB exitosa.");
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Error al intentar establecer la conexión con MongoDB. Detalle: ${error.message}`
        );
      } else {
        console.error(`Un error desconocido ocurrió: ${error}`);
      }
      return false;
    }
  }
}

DBMongoDB.connectDB();

export default DBMongoDB;
