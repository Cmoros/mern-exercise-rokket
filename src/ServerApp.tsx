import {
  renderToPipeableStream,
  RenderToPipeableStreamOptions,
} from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import App from "./App.js";

export default function render(
  url: string,
  opts: RenderToPipeableStreamOptions
) {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );
  return stream;
}
