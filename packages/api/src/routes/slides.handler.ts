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
