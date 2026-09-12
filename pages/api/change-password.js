import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/authOptions";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Нэвтрээгүй байна." });
  }

  const currentPassword = req.body?.currentPassword || "";
  const newPassword = req.body?.newPassword || "";

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Одоогийн болон шинэ нууц үгээ бүгдийг оруулна уу." });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: "Шинэ нууц үг дор хаяж 6 тэмдэгт байх ёстой." });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return res.status(404).json({ error: "Хэрэглэгч олдсонгүй." });
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return res.status(400).json({ error: "Одоогийн нууц үг буруу байна." });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  return res.status(200).json({ ok: true });
}
