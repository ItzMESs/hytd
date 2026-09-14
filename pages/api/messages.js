import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/authOptions";
import { prisma } from "../../lib/prisma";

// Short one-directional notes between leaderboard peers — not a full chat
// thread. GET returns the caller's inbox + sent items; POST sends a new
// message; PATCH marks a batch of received messages as read.
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Нэвтрээгүй байна." });
  }
  const userId = session.user.id;

  if (req.method === "GET") {
    const [inbox, sent] = await Promise.all([
      prisma.message.findMany({
        where: { toUserId: userId },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      prisma.message.findMany({
        where: { fromUserId: userId },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);
    return res.status(200).json({ inbox, sent });
  }

  if (req.method === "POST") {
    const { toUserId, text, fromName } = req.body || {};
    const cleanText = String(text || "").trim().slice(0, 300);
    if (!toUserId || !cleanText) {
      return res.status(400).json({ error: "Хүлээн авагч болон зурвасын текст шаардлагатай." });
    }
    if (toUserId === userId) {
      return res.status(400).json({ error: "Өөртөө зурвас илгээх боломжгүй." });
    }
    const toUser = await prisma.user.findUnique({ where: { id: toUserId } });
    if (!toUser) {
      return res.status(404).json({ error: "Хүлээн авагч олдсонгүй." });
    }
    const message = await prisma.message.create({
      data: {
        fromUserId: userId,
        fromName: String(fromName || "").trim().slice(0, 24),
        toUserId,
        text: cleanText,
      },
    });
    return res.status(200).json({ ok: true, message });
  }

  if (req.method === "PATCH") {
    const { ids } = req.body || {};
    if (Array.isArray(ids) && ids.length) {
      await prisma.message.updateMany({
        where: { id: { in: ids.slice(0, 100) }, toUserId: userId },
        data: { read: true },
      });
    }
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, POST, PATCH");
  return res.status(405).json({ error: "Method not allowed" });
}
