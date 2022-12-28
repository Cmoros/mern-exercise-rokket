import * as dotenv from "dotenv";
dotenv.config();

const config = {
  MONGODB_CONNECTION_STR: process.env.MONGODB_CONNECTION_STR as string,
  MONGODB_TIMEOUT: +(process.env.MONGODB_TIMEOUT as string)
}

export default config;