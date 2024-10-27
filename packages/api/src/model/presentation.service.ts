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
    .prepare("SELECT * FROM Presentation LIMIT ? OFFSET ?")
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
    .prepare("SELECT * FROM Presentation WHERE Presentation.id = ?")
    .bind(presentationId)
    .all<{ id: string; name: string }>();

  const { results: results2 } = await db
    .prepare(
      "SELECT Slide.fileName FROM Presentation INNER JOIN Slide ON Presentation.id = Slide.presentationId WHERE Presentation.id = ?"
    )
    .bind(presentationId)
    .all<{ fileName: string }>();

  const presentation = results1.at(0);

  if (presentation == null) return undefined;

  return {
    id: presentation.id,
    name: presentation.name,
    fileNames: results2 ? results2.map((r) => r.fileName) : [],
  };
}

export async function createPresentation(
  db: D1Database,
  {
    id,
    name,
  }: {
    id: string;
    name: string;
  }
): Promise<void> {
  await db
    .prepare("INSERT INTO Presentation (id, name) VALUES (?1, ?2)")
    .bind(id, name)
    .run();
}
