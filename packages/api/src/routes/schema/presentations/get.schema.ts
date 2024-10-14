import { createRoute, z } from "@hono/zod-openapi";
import { Presentations } from "@api/model/presentation.schema";

const RequestQuery = z.object({
  limit: z
    .string()
    .pipe(z.coerce.number().int().min(10))
    .optional()
    .openapi({
      param: {
        name: "limit",
        in: "query",
      },
      example: "10",
    }),
  offset: z
    .string()
    .pipe(z.coerce.number().int().min(0))
    .optional()
    .openapi({
      param: {
        name: "offset",
        in: "query",
      },
      example: "0",
    }),
});

const Response200 = {
  content: {
    "application/json": {
      schema: Presentations,
    },
  },
  description: "get the presentations",
};

export const Get = createRoute({
  method: "get",
  path: "/",
  request: {
    query: RequestQuery,
  },
  responses: {
    200: Response200,
  },
});
