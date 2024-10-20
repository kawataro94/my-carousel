import { z } from "zod";

export function validateCuid(query: string | undefined): string {
  const { data, error, success } = z.string().cuid2().safeParse(query);

  if (!success) {
    throw new Error(error.issues[0].message, { cause: error });
  }

  return data;
}
