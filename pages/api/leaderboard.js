import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/authOptions";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Нэвтрээгүй байна." });
  }
  const userId = session.user.id;

  if (req.method === "GET") {
    const rows = await prisma.progress.findMany({
      where: { nickname: { not: "" } },
      orderBy: { mastered: "desc" },
      take: 20,
      select: {
        userId: true,
        nickname: true,
        challenge: true,
        mastered: true,
        learned: true,
        streak: true,
      },
    });
    return res.status(200).json(rows);
  }

  if (req.method === "POST") {
    const { nickname, challenge, mastered, learned, streak } = req.body || {};
    await prisma.progress.upsert({
      where: { userId },
      create: {
        userId,
        data: {},
        nickname: (nickname || "").slice(0, 24),
        challenge: (challenge || "").slice(0, 60),
        mastered: Number(mastered) || 0,
        learned: Number(learned) || 0,
        streak: Number(streak) || 0,
      },
      update: {
        nickname: (nickname || "").slice(0, 24),
        challenge: (challenge || "").slice(0, 60),
        mastered: Number(mastered) || 0,
        learned: Number(learned) || 0,
        streak: Number(streak) || 0,
      },
    });
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
