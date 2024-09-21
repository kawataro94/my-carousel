import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { routeSlides } from "./routes/slides.handler";

const app = new OpenAPIHono();
app.get("/", (c) => c.text("Hello Hono!"));
app.use(prettyJSON());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

const api = new OpenAPIHono();
api.use("/*", cors());
api.route("/slides", routeSlides);

app.route("/api", api);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/swagger-ui", swaggerUI({ url: "/doc" }));

export default app;
