import { z } from "@hono/zod-openapi";

export const Slides = z
  .object({
    slides: z
      .object({
        id: z.string().openapi({
          example: "cm2pvht140000rqx784q73glz",
        }),
        presentationId: z.string().openapi({
          example: "cm2pvhd220000rqx7cj2597q8",
        }),
        urls: z
          .string()
          .array()
          .openapi({
            example: ["https://example.com/dog.jpg"],
          }),
      })
      .array(),
  })
  .openapi("Slides");
