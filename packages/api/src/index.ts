import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { getSlides, getSlide, createSlide, Slide } from "./model";

const app = new Hono();
app.get("/", (c) => c.text("Hello Hono!"));
app.use(prettyJSON());
app.use("/api/*", cors());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

const api = new Hono();

api.get("/slides", (c) => {
  const { limit, offset } = c.req.query();
  const slides = getSlides({ limit, offset });
  return c.json({ slides });
});

api.get("/slides/:slideId", (c) => {
  const slideId = c.req.param("slideId");
  const slide = getSlide({ slideId });
  return c.json(slide);
});

api.post("/slides", async (c) => {
  const slide = await c.req.json<Slide>();
  const newSlide = createSlide({ slide });
  return c.json(newSlide);
});

app.route("/api", api);

export default app;
