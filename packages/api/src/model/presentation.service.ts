export type Presentation = { id: string; name: string; fileNames: string[] };

export async function getPresentations(
  db: D1Database,
  {
    limit = 10,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }
): Promise<Omit<Presentation, "fileNames">[]> {
  const { results } = await db
    .prepare("SELECT * FROM Presentations LIMIT ? OFFSET ?")
    .bind(limit, offset)
    .all<Omit<Presentation, "fileNames">>();

  return results;
}

export async function getPresentation(
  db: D1Database,
  {
    presentationId,
  }: {
    presentationId: string;
  }
): Promise<Presentation | undefined> {
  const { results: results1 } = await db
    .prepare("SELECT * FROM Presentations WHERE Presentations.id = ?")
    .bind(presentationId)
    .all<{ id: string; name: string }>();

  const { results: results2 } = await db
    .prepare(
      "SELECT Photos.url FROM Presentations LEFT JOIN Photos ON Presentations.id = Photos.presentation_id WHERE Presentations.id = ?"
    )
    .bind(presentationId)
    .all<{ url: string }>();

  const presentation = results1.at(0);

  if (presentation == null) return undefined;

  return {
    id: presentation.id,
    name: presentation.name,
    fileNames: results2.map((r) => r.url),
  };
}

export function createPresentation({
  presentation,
}: {
  presentation: Omit<Presentation, "id" | "fileNames">;
}): Omit<Presentation, "fileNames"> {
  return {
    id: "cm0t30v630000lwx7h37jgj0o",
    name: "dog",
  };
}
