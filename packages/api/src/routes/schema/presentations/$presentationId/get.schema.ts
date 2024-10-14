import { createRoute, z } from "@hono/zod-openapi";
import { Presentation } from "@api/model/presentation.schema";

const Params = z.object({
  presentationsId: z
    .string()
    .cuid()
    .openapi({
      param: {
        name: "presentationsId",
        in: "path",
      },
      example: "cm153pzw40000yg2b2ngs618d",
    }),
});

const Response200 = {
  content: {
    "application/json": {
      schema: Presentation,
    },
  },
  description: "get the presentations",
};

export const GetPresentation = createRoute({
  method: "get",
  path: "/{presentationId}",
  request: {
    params: Params,
  },
  responses: {
    200: Response200,
  },
});
