import express from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import UserRouter from "./routers/UserRouter.js";
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 1234;

const html = fs
  .readFileSync(path.resolve(__dirname, "../client/index.html"))
  .toString();

const parts = html.split("not rendered");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/user", UserRouter.router);

app.use("/assets", express.static(path.resolve(__dirname, "../client/assets")));

app.use((req, res) => {
  res.write(parts[0]);
  const stream = renderApp(req.url, {
    onShellReady() {
      stream.pipe(res);
    },
    onShellError() {
      // do error handling
    },
    onAllReady() {
      res.write(parts[1]);
      res.end();
    },
    onError(err: unknown) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
