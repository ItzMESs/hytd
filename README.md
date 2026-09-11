# HSK Path — бүртгэл (login) болон Postgres сантай бүрэн вэбсайт

Энэ бол өмнөх HSK Path Claude артифактын **бүх онцлогийг агуулсан** (хичээл, үгийн сан, Anki маягийн давталт, тест, тоглоомууд, харилцан яриа сонсох, HSKK бэлтгэл, leaderboard) Next.js дээр бүтээгдсэн, **и-мэйл+нууц үгээр нэвтэрдэг, Postgres мэдээллийн сантай** бүрэн вэбсайт юм. Vercel дээр байршуулахад бэлэн.

## Юу орсон бэ

- `pages/login.js`, `pages/signup.js` — и-мэйл + нууц үгээр бүртгүүлэх/нэвтрэх хуудсууд (NextAuth.js).
- `pages/index.js` — үндсэн апп (нэвтрээгүй бол автоматаар `/login` руу шилждэг).
- `public/app.js` — HSK Path-ийн бүх логик (хичээл, SRS давталт, тест, тоглоом, HSKK, leaderboard) — өмнөх Claude артифактын кодтой бараг ижилхэн, зөвхөн хадгалалтын хэсгийг Postgres руу залгасан.
- `prisma/schema.prisma` — `User` (и-мэйл, нууц үгийн hash) болон `Progress` (тухайн хэрэглэгчийн бүх ахиц дэвшил JSON хэлбэрээр + leaderboard-д зориулсан баганууд) хүснэгтүүд.
- `pages/api/*` — нэвтрэлт, ахиц хадгалах/ачаалах, leaderboard-ийн API route-ууд.

## 1. Локал дээр турших (заавал биш)

```bash
npm install
cp .env.example .env   # дараа нь .env файлдаа өөрийн Postgres холболтын мөрийг бичнэ
npx prisma db push     # User/Progress хүснэгтүүдийг санд үүсгэнэ
npm run dev            # http://localhost:3000
```

## 2. Vercel дээр байршуулах

### 2.1. GitHub-т хуулах
Энэ хавтасыг шинэ GitHub repo болгон push хийнэ (эсвэл Vercel CLI ашиглаж шууд deploy хийж болно — доор харна уу).

### 2.2. Vercel дээр импортлох
1. [vercel.com/new](https://vercel.com/new) руу орж GitHub repo-гоо сонгоод "Deploy" дарна. (Тохиргоо өөрчлөх шаардлагагүй — Next.js-г Vercel автоматаар таньдаг.) Хэрэв "Optional Integrations" хэсэгт Postgres/Prisma Postgres харагдвал доорх 2.3-т заасны дагуу нэмээд Deploy дарж болно.
2. Build (build процесс) энэ үе шатанд амжилттай дуусах ёстой. Гэхдээ Postgres сан холбогдоогүй л бол сайт нээгдэх ч бүртгүүлэх/нэвтрэх үед алдаа өгнө — энэ хэвийн зүйл, доорх 2.3–2.5-г дуусгаад дахин deploy хийхэд бүрэн ажиллана.

### 2.3. Postgres сан үүсгэх (Storage / Marketplace)
Vercel одоо Postgres-ийг шууд биш, **Marketplace**-ийн интеграцаар өгдөг болсон.

**Хамгийн хялбар арга** — Deploy хийх үед л шууд гардаг:
Import хийгээд Deploy дарахаас өмнөх дэлгэц дээр **"Optional Integrations"** гэсэн хэсэгт **"Prisma Postgres"** (Storage төрлийн) гэж гарч ирдэг бол — яг үүнийг **"Add"** дараад тэгээд **"Deploy"** дарна. Энэ бол хамгийн зөв, хамгийн хялбар сонголт (энэ төслийн Prisma-тай яг таарч байгаа учраас), нэмэлт тохиргоо хэрэггүй.

Хэрэв энэ сонголт харагдаагүй эсвэл дараа нь нэмэх бол:
1. Project-ынхоо **Storage** табд орно (эсвэл [vercel.com/marketplace](https://vercel.com/marketplace) → "postgres" гэж хайна).
2. **Create Database** дараад Postgres нийлүүлэгч сонгоно (Prisma Postgres, Neon гэх мэт аль нэгийг). Бүс нутаг (region), нэрээ сонгоод үүсгэнэ.
3. Сан үүссэний дараа **Connect Project** дараад тухайн project-оо болон орчнуудыг (Development, Preview, Production) сонгоод **Connect** дарна.
4. Vercel `DATABASE_URL` гэсэн environment variable-ийг **автоматаар** project-т нэмнэ — өөрөө гараар бичих шаардлагагүй.

### 2.4. NEXTAUTH_SECRET (болон сонголтоор NEXTAUTH_URL) нэмэх
1. Терминал дээр нэг удаа ажиллуулж санамсаргүй мөр үүсгэнэ: `openssl rand -base64 32`
2. Vercel project → **Settings → Environment Variables** руу орж `NEXTAUTH_SECRET` нэрээр дээрх утгыг нэмнэ (Production болон Preview хоёуланд нь).
3. (Сонголтоор, гэхдээ зөвлөмж болгож байна) `NEXTAUTH_URL`-ийг мөн адил нэмж, утга нь project-ынхоо жинхэнэ Vercel домэйн байх ёстой (жишээ нь `https://your-project.vercel.app` — энэ домэйныг Vercel project-ынхоо **Settings → Domains** эсвэл Overview хуудаснаас харна). Үүнийг тохируулаагүй ч сайт ажиллах болно (project VERCEL_URL-ээ автоматаар ашиглана), гэхдээ тогтмол домэйнтой болгоход зөвлөмж болгодог.

### 2.5. Хүснэгтүүдийг санд үүсгэх
Локал компьютертоо:
```bash
npm i -g vercel        # Vercel CLI суулгасан эсэхээ шалгана
vercel link            # энэ project-той холбоно (нэг л удаа)
vercel env pull .env   # Vercel дээрх бодит Postgres холболтын мөрүүдийг татаж авна
npx prisma db push     # User/Progress хүснэгтүүдийг production санд үүсгэнэ
```

### 2.6. Дахин deploy хийх
Vercel dashboard дээрээс **Redeploy** дарна (эсвэл GitHub-т шинэ commit push хийхэд автоматаар дахин deploy хийгдэнэ). Одоо сайт бүрэн ажиллах ёстой.

## 3. Ашиглалт

- Нүүр хуудас руу орохоор эхлээд `/signup`-аар бүртгүүлж, дараа нь автоматаар нэвтэрч ордог.
- Ахиц дэвшил (SRS давталт, тест, тэмдэглэл, bookmark) хэрэглэгч бүрт тусад нь Postgres санд хадгалагдана — өөр төхөөрөмж/хөтчөөс ижил и-мэйлээрээ нэвтрэхэд ахиц нь харагдана.
- "Ахиц" (Progress) табын доод хэсэгт байгаа Leaderboard хэсэгт нэрээ (nickname) оруулаад "Оноогоо нийтлэх" дарвал бусад бүртгэлтэй хэрэглэгчидтэй нэгэн жагсаалтад харагдана — учир нь одоо жинхэнэ хэрэглэгчийн бүртгэл (login) байгаа тул энэ бүрэн ажиллана.

## 4. Хязгаарлалт / анхаарах зүйлс

- Нууц үг сэргээх (forgot password) урсгал одоогоор ороогүй — хэрэгтэй бол нэмж хийж болно (жишээ нь и-мэйл илгээх Resend/SendGrid холбож).
- Google/бусад OAuth нэвтрэлт ороогүй, зөвхөн и-мэйл+нууц үг.
- Мэдээллийн сан руу шууд SQL асуулга бичихийг хүсвэл Prisma Studio ашиглаж болно: `npx prisma studio`.
