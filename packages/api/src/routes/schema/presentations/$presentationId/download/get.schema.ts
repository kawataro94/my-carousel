import { createRoute } from "@hono/zod-openapi";

const Response200 = {
  mediaType: "application/octet-stream",
  description: "download the presentationId",
};

export const GetPresentationDownload = createRoute({
  method: "get",
  path: "/{presentationId}/download/{fileName}",
  responses: {
    200: Response200,
  },
});
