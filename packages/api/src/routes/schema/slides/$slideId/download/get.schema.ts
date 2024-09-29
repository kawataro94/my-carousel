import { createRoute } from "@hono/zod-openapi";

const Response200 = {
  mediaType: "application/octet-stream",
  description: "download the slide",
};

export const GetSlideDownload = createRoute({
  method: "get",
  path: "/{slideId}/download/{fileName}",
  responses: {
    200: Response200,
  },
});
