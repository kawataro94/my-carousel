import { createRoute, z } from "@hono/zod-openapi";

const RequestBody = {
  required: true,
  content: {
    "application/json": {
      schema: z.object({
        name: z.string().openapi({
          example: "dog",
        }),
      }),
    },
  },
};

const Response201 = {
  content: {
    "application/json": {
      schema: z.object({
        id: z.string().openapi({
          example: "cm14zryaf0000yg2b8hw7eg77",
        }),
        name: z.string().openapi({
          example: "dog",
        }),
      }),
    },
  },
  description: "create new presentation",
};

export const Post = createRoute({
  method: "post",
  path: "/",
  request: {
    body: RequestBody,
  },
  responses: {
    201: Response201,
  },
});
