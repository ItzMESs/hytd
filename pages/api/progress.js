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
    const progress = await prisma.progress.findUnique({ where: { userId } });
    if (!progress) return res.status(200).json({ exists: false });
    return res.status(200).json({ exists: true, data: progress.data });
  }

  if (req.method === "POST") {
    // The client sends the whole SRS blob as the request body (see app.js
    // saveState()). We store it verbatim in `data`, and also mirror the
    // nickname/challenge fields as columns so /api/leaderboard can query
    // without unpacking JSON.
    const srs = req.body || {};
    await prisma.progress.upsert({
      where: { userId },
      create: {
        userId,
        data: srs,
        nickname: (srs.nickname || "").slice(0, 24),
        challenge: (srs.challenge || "").slice(0, 60),
      },
      update: {
        data: srs,
        nickname: (srs.nickname || "").slice(0, 24),
        challenge: (srs.challenge || "").slice(0, 60),
      },
    });
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
