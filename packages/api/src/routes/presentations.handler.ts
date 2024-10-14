import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getPresentations,
  getPresentation,
  createPresentation,
  type Presentation,
} from "@api/model/presentation.service";
import { Get } from "./schema/presentations/get.schema";
import { Post } from "./schema/presentations/post.schema";
import { GetPresentation } from "./schema/presentations/$presentationId/get.schema";
import { GetPresentationDownload } from "./schema/presentations/$presentationId/download/get.schema";
import { env } from "hono/adapter";

export const routePresentations = new OpenAPIHono();

routePresentations.openapi(Get, async (c) => {
  const { limit, offset } = c.req.query();
  const { DB } = env<{ DB: D1Database }>(c);
  const presentations = await getPresentations(DB, { limit, offset });

  return c.json({ presentations }, 200);
});

routePresentations.openapi(Post, async (c) => {
  const presentation = await c.req.json<Omit<Presentation, "id">>();
  const newPresentations = createPresentation({ presentation });

  return c.json(newPresentations, 201);
});

routePresentations.openapi(GetPresentation, async (c) => {
  const { presentationId } = c.req.param();
  const { DB } = env<{ DB: D1Database }>(c);
  const presentation = await getPresentation(DB, { presentationId });

  return c.json(presentation, 200);
});

routePresentations.openapi(GetPresentationDownload, async (c) => {
  const { presentationId, fileName } = c.req.param();
  const { DB } = env<{ DB: D1Database }>(c);
  const presentation = await getPresentation(DB, { presentationId });

  if (presentation == null) {
    return c.json({ message: "Presentation not found" }, { status: 404 });
  }

  const { R2_BUCKET_MY_CAROUSEL } = env<{ R2_BUCKET_MY_CAROUSEL: R2Bucket }>(c);

  const object = await R2_BUCKET_MY_CAROUSEL.get(
    `${presentation.name}/${fileName}`
  );

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
