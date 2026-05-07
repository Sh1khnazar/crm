# 🚀 CRM System - Najot Ta'lim 7-Month Final Project

Ushbu loyiha o'quv markazlari faoliyatini avtomatlashtirish va moliyaviy hisob-kitoblarni shaffof yuritish uchun mo'ljallangan backend tizimidir. Tizimning o'ziga xosligi — o'quvchilar balansi darsga kelgan-kelmaganligiga qarab real vaqt rejimida (Dynamic Billing) hisoblanishidadir.

## 🌟 Asosiy Imkoniyatlar

- **Dashboard Analytics:** Figma dizayni asosida yaratilgan tahliliy bo'lim. Jami o'quvchilar, yangi murojaatlar va bugungi kirim ko'rsatkichlari.
- **Financial Billing:** To'lovlar tarixi va davomat asosida avtomatik balans yechilishi.
- **Group & Student Management:** Guruhlar, o'qituvchilar va o'quvchilarning o'zaro bog'liqligini boshqarish.
- **Leads Control:** Yangi kelgan murojaatlarni (leads) kuzatish va ularni o'quvchiga aylantirish tizimi.
- **Automated Migrations:** Ma'lumotlar bazasi sxemasini TypeORM migratsiyalari orqali xavfsiz boshqarish.
- **Validation & Security:** Kiruvchi ma'lumotlarni qat'iy tekshirish va CORS sozlamalari.

## 🛠 Texnologiyalar

- **Backend:** NestJS (TypeScript)
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **API Documentation:** Swagger UI
- **Environment:** Fedora Linux (Acer Nitro ANV15-51)

## 📂 Loyiha Strukturasi

```text
src/
├── common/          # Global entity, base-entity va util-lar
├── config/          # TypeORM va DB konfiguratsiyasi
├── database/        # Migrations (InitialSchema)
├── modules/         # Biznes mantiq (Analytics, Attendance, Groups, Leads, Payments, Students)
├── main.ts          # Serverning kirish nuqtasi va global sozlamalar
└── app.module.ts    # Root modul
```

⚙️ O'rnatish va Ishga Tushirish
Repozitoriyani klon qiling:

Bash
git clone [https://github.com/Sotimov-Shikh/crm-backend.git](https://github.com/Sotimov-Shikh/crm-backend.git)
cd crm
Kutubxonalarni o'rnating:

Bash
npm install
.env faylini sozlang:
Loyiha ildizida .env faylini yarating va quyidagi ma'lumotlarni kiriting:

Code snippet
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sizning_parolingiz
DB_NAME=crm_db
PORT=3000
Ma'lumotlar bazasini qurish (Migrations):

Bash
npx typeorm-ts-node-commonjs migration:run -d src/config/typeorm.config.ts
Serverni yurgizish:

Bash
npm run start:dev
📖 API Hujjatlari (Swagger)
Server ishga tushgandan so'ng barcha API endpointlarni test qilish uchun:
🔗 URL: http://localhost:3000/api/docs

👨‍💻 Muallif Haqida
Sotimov Shixnazar Mustafoyevich

🎓 Najot Ta'lim & A+ Academy bitiruvchisi.

💻 Full-stack Developer (Node.js, TypeScript, React, Next.js).

🐧 Fedora Linux ishqibozi (Development Fedora muhitida olib borilgan).

📈 Financial Markets Trader (Nasdaq 100 va S&P 500 futures trading tajribasiga ega).

Loyiha professional portfolio va o'quv markazlari boshqaruvini osonlashtirish maqsadida ishlab chiqildi.
