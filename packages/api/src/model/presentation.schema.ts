import { z } from "@hono/zod-openapi";

export const Presentations = z
  .object({
    presentations: z
      .object({
        id: z.string().openapi({
          example: "cm14zryaf0000yg2b8hw7eg77",
        }),
        name: z.string().openapi({
          example: "dog",
        }),
      })
      .array(),
  })
  .openapi("Presentations");

export const Presentation = z
  .object({
    id: z.string().openapi({
      example: "cm14zryaf0000yg2b8hw7eg77",
    }),
    name: z.string().openapi({
      example: "dog",
    }),
    urls: z.array(
      z.string().openapi({
        example: "https://example.com/dog.jpg",
      })
    ),
  })
  .openapi("Presentation");
