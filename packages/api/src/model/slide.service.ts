export async function createSlide(
  db: D1Database,
  {
    id,
    presentationId,
    fileName,
  }: {
    id: string;
    presentationId: string;
    fileName: string;
  }
): Promise<void> {
  await db
    .prepare(
      "INSERT INTO Slide (id, presentationId, fileName) VALUES (?1, ?2, ?3)"
    )
    .bind(id, presentationId, fileName)
    .run();
}
