export type Slide = { id: string; name: string; fileNames: string[] };

export async function getSlides(
  db: D1Database,
  {
    limit = "10",
    offset = "0",
  }: {
    limit?: string;
    offset?: string;
  }
): Promise<Omit<Slide, "fileNames">[]> {
  const { results } = await db
    .prepare("SELECT * FROM Presentations LIMIT ? OFFSET ?")
    .bind(limit, offset)
    .all<Omit<Slide, "fileNames">>();

  return results;
}

export async function getSlide(
  db: D1Database,
  {
    slideId,
  }: {
    slideId: string;
  }
): Promise<Slide | undefined> {
  const { results: results1 } = await db
    .prepare("SELECT * FROM Presentations WHERE Presentations.id = ?")
    .bind(slideId)
    .all<{ id: string; name: string }>();

  const { results: results2 } = await db
    .prepare(
      "SELECT Photos.url FROM Presentations LEFT JOIN Photos ON Presentations.id = Photos.presentation_id WHERE Presentations.id = ?"
    )
    .bind(slideId)
    .all<{ url: string }>();

  const presentation = results1.at(0);

  if (presentation == null) return undefined;

  return {
    id: presentation.id,
    name: presentation.name,
    fileNames: results2.map((r) => r.url),
  };
}

export function createSlide({
  slide,
}: {
  slide: Omit<Slide, "id" | "fileNames">;
}): Omit<Slide, "fileNames"> {
  return {
    id: "cm0t30v630000lwx7h37jgj0o",
    name: "dog",
  };
}
