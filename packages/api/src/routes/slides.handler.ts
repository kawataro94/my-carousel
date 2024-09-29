import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getSlides,
  getSlide,
  createSlide,
  type Slide,
} from "@api/model/slide.service";
import { Get } from "./schema/slides/get.schema";
import { Post } from "./schema/slides/post.schema";
import { GetSlide } from "./schema/slides/$slideId/get.schema";
import { GetSlideDownload } from "./schema/slides/$slideId/download/get.schema";
import { env } from "hono/adapter";

export const routeSlides = new OpenAPIHono();

routeSlides.openapi(Get, (c) => {
  const { limit, offset } = c.req.query();
  const slides = getSlides({ limit, offset });

  return c.json({ slides }, 200);
});

routeSlides.openapi(Post, async (c) => {
  const slide = await c.req.json<Omit<Slide, "id">>();
  const newSlide = createSlide({ slide });

  return c.json(newSlide, 201);
});

routeSlides.openapi(GetSlide, (c) => {
  const { slideId } = c.req.param();
  const slide = getSlide({ slideId });

  return c.json(slide, 200);
});

routeSlides.openapi(GetSlideDownload, async (c) => {
  const { slideId, fileName } = c.req.param();
  const slide = getSlide({ slideId });

  if (slide == null) {
    return c.json({ message: "Slide not found" }, { status: 404 });
  }

  const { R2_BUCKET_MY_CAROUSEL } = env<{ R2_BUCKET_MY_CAROUSEL: R2Bucket }>(c);

  const object = await R2_BUCKET_MY_CAROUSEL.get(`${slide.name}/${fileName}`);

  if (object == null) {
    return c.json({ message: "Object not found" }, { status: 404 });
  }

  c.res.headers.set(
    "Content-Disposition",
    `attachment; filename="${fileName}"`
  );
  c.res.headers.set("Content-Type", "application/octet-stream");
  return c.body(object.body);
});
