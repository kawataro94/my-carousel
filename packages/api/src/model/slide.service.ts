export async function createSlide(
  db: D1Database,
  {
    id,
    presentationId,
    url,
  }: {
    id: string;
    presentationId: string;
    url: string;
  }
): Promise<void> {
  await db
    .prepare(
      "INSERT INTO Slides (id, presentation_id, url) VALUES (?1, ?2, ?3)"
    )
    .bind(id, presentationId, url)
    .run();
}
