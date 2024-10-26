import { createRoute, z } from "@hono/zod-openapi";

const RequestParams = z.object({
  presentationId: z
    .string()
    .cuid2()
    .openapi({
      param: {
        name: "presentationId",
        in: "path",
      },
      example: "cm153pzw40000yg2b2ngs618d",
    }),
});

const Response201 = {
  description: "upload the slides",
};

export const PostSlidesUpload = createRoute({
  method: "post",
  path: "/{presentationId}/slides/upload",
  request: {
    params: RequestParams,
  },
  responses: {
    201: Response201,
  },
});
