import { createRoute, z } from "@hono/zod-openapi";
import { Slide } from "@api/model/slide.schema";

const Params = z.object({
  slideId: z
    .string()
    .cuid()
    .openapi({
      param: {
        name: "slideId",
        in: "path",
      },
      example: "cm153pzw40000yg2b2ngs618d",
    }),
});

const Response200 = {
  content: {
    "application/json": {
      schema: Slide,
    },
  },
  description: "get the slide",
};

export const GetSlide = createRoute({
  method: "get",
  path: "/{slideId}",
  request: {
    params: Params,
  },
  responses: {
    200: Response200,
  },
});
