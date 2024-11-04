import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

export async function createSlides(
  db: D1Database,
  slides: {
    id: string;
    presentationId: string;
    fileName: string;
  }[]
): Promise<void> {
  const adapter = new PrismaD1(db);
  const prisma = new PrismaClient({ adapter });

  await prisma.slide.createMany({
    data: slides,
  });
}
