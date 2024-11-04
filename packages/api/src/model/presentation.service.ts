import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

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
  const adapter = new PrismaD1(db);
  const prisma = new PrismaClient({ adapter });

  return await prisma.presentation.findMany({
    take: limit,
    skip: offset,
    orderBy: { id: "desc" },
  });
}

export async function getPresentation(
  db: D1Database,
  {
    presentationId,
  }: {
    presentationId: string;
  }
): Promise<Presentation | undefined> {
  const adapter = new PrismaD1(db);
  const prisma = new PrismaClient({ adapter });

  const presentation = await prisma.presentation.findUnique({
    where: { id: presentationId },
    include: {
      Slide: true,
    },
  });

  if (presentation == null) return undefined;

  return {
    id: presentation.id,
    name: presentation.name,
    fileNames: presentation.Slide.map((s) => s.fileName),
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
  const adapter = new PrismaD1(db);
  const prisma = new PrismaClient({ adapter });

  await prisma.presentation.create({
    data: { id, name },
  });
}
