# 🏫 CRM — Najot Ta'lim O'quv Markazi Boshqaruv Tizimi

O'quv markazini to'liq boshqarish uchun yaratilgan **NestJS** asosidagi REST API. Talabalar, guruhlar, davomat, to'lovlar va murojaatlarni boshqarish imkonini beradi.

---

## 🚀 Texnologiyalar

- **NestJS** — asosiy framework
- **TypeORM** — ORM (PostgreSQL bilan)
- **PostgreSQL** — ma'lumotlar bazasi
- **JWT** — autentifikatsiya
- **Swagger** — API hujjatlari
- **bcrypt** — parolni shifrlash

---

## 📁 Loyiha Tuzilmasi

```
src/
├── common/
│   ├── decorators/       # @Roles decorator
│   ├── entities/         # BaseEntity
│   ├── enums/            # UserRole enum
│   └── guards/           # JwtAuthGuard, RolesGuard
├── config/               # TypeORM konfiguratsiyasi
├── database/
│   ├── migrations/       # DB migratsiyalar
│   └── seeds/            # Boshlang'ich ma'lumotlar
└── modules/
    ├── auth/             # Login, JWT
    ├── users/            # Foydalanuvchilar (Admin, O'qituvchi)
    ├── students/         # O'quvchilar
    ├── groups/           # Guruhlar
    ├── attendance/       # Davomat
    ├── payments/         # To'lovlar
    ├── leads/            # Murojaatlar
    └── analytics/        # Statistika
```

---

## ⚙️ O'rnatish

### 1. Talablar

- Node.js >= 18
- PostgreSQL >= 14
- npm

### 2. Loyihani klonlash

```bash
git clone https://github.com/username/crm.git
cd crm
```

### 3. Paketlarni o'rnatish

```bash
npm install
```

### 4. `.env` faylini sozlash

```bash
cp .env.example .env
```

`.env` faylini tahrirlang:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=crm

JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=24h
```

### 5. Ma'lumotlar bazasini yaratish

```bash
psql -U postgres -c "CREATE DATABASE crm;"
```

### 6. Migratsiyalarni ishga tushirish

```bash
npm run build
npx typeorm migration:run -d dist/config/typeorm.config.js
```

### 7. Serverni ishga tushirish

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

---

## 📖 API Hujjatlari

Server ishga tushgach Swagger hujjatlarini oching:

```
http://localhost:3000/api/docs
```

---

## 🔐 Autentifikatsiya

Tizimda **3 xil rol** mavjud:

| Rol          | Huquqlar                                           |
| ------------ | -------------------------------------------------- |
| `superadmin` | Barcha amallar                                     |
| `admin`      | Boshqaruv (o'chirish bundan tashqari)              |
| `teacher`    | Faqat o'z guruhlarini ko'rish va davomat belgilash |

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "phone": "+998901234567",
  "password": "your_password"
}
```

Response:

```json
{
  "access_token": "eyJhbGci...",
  "user": {
    "id": "uuid",
    "full_name": "Ism Familiya",
    "role": "superadmin"
  }
}
```

Tokenni Swagger da **Authorize** tugmasi orqali kiriting.

---

## 📡 Endpointlar

### Auth

| Method | URL               | Tavsif         |
| ------ | ----------------- | -------------- |
| POST   | `/api/auth/login` | Tizimga kirish |

### Users

| Method | URL              | Tavsif              | Rol               |
| ------ | ---------------- | ------------------- | ----------------- |
| POST   | `/api/users`     | Yangi user yaratish | superadmin        |
| GET    | `/api/users`     | Barcha userlar      | superadmin, admin |
| GET    | `/api/users/:id` | Bitta user          | superadmin, admin |
| DELETE | `/api/users/:id` | Userni o'chirish    | superadmin        |

### Students

| Method | URL                 | Tavsif             | Rol      |
| ------ | ------------------- | ------------------ | -------- |
| POST   | `/api/students`     | Yangi o'quvchi     | admin+   |
| GET    | `/api/students`     | Barcha o'quvchilar | teacher+ |
| GET    | `/api/students/:id` | Bitta o'quvchi     | teacher+ |
| PATCH  | `/api/students/:id` | Tahrirlash         | admin+   |
| DELETE | `/api/students/:id` | O'chirish          | admin+   |

### Groups

| Method | URL                     | Tavsif          | Rol        |
| ------ | ----------------------- | --------------- | ---------- |
| POST   | `/api/groups`           | Yangi guruh     | admin+     |
| GET    | `/api/groups`           | Barcha guruhlar | admin+     |
| GET    | `/api/groups/my-groups` | O'z guruhlari   | teacher    |
| GET    | `/api/groups/:id`       | Bitta guruh     | teacher+   |
| PATCH  | `/api/groups/:id`       | Tahrirlash      | admin+     |
| DELETE | `/api/groups/:id`       | O'chirish       | superadmin |

### Attendance

| Method | URL                         | Tavsif            | Rol      |
| ------ | --------------------------- | ----------------- | -------- |
| POST   | `/api/attendance`           | Davomat belgilash | teacher+ |
| GET    | `/api/attendance/group/:id` | Guruh davomati    | teacher+ |

### Payments

| Method | URL                         | Tavsif            | Rol      |
| ------ | --------------------------- | ----------------- | -------- |
| POST   | `/api/payments/top-up`      | Balans to'ldirish | admin+   |
| GET    | `/api/payments/student/:id` | To'lovlar tarixi  | teacher+ |

### Leads

| Method | URL              | Tavsif             | Rol    |
| ------ | ---------------- | ------------------ | ------ |
| POST   | `/api/leads`     | Yangi murojaat     | admin+ |
| GET    | `/api/leads`     | Barcha murojaatlar | admin+ |
| GET    | `/api/leads/:id` | Bitta murojaat     | admin+ |
| PATCH  | `/api/leads/:id` | Holat yangilash    | admin+ |
| DELETE | `/api/leads/:id` | O'chirish          | admin+ |

### Analytics

| Method | URL                            | Tavsif               | Rol    |
| ------ | ------------------------------ | -------------------- | ------ |
| GET    | `/api/analytics/dashboard`     | Dashboard statistika | admin+ |
| GET    | `/api/analytics/monthly-chart` | Oylik grafik         | admin+ |

---

## 💰 Moliyaviy Mantiq

- O'quvchi **kelganda** (`is_present: true`) → balansdan `lesson_price` yechildi
- O'quvchi **kelmasa** (`is_present: false`) → balans o'zgarmaydi
- Balans **-200,000 so'mdan** kam bo'lsa davomat belgilanmaydi
- Barcha tranzaksiyalar `payments` jadvalida saqlanadi

---

## 🛠️ Foydali Komandalar

```bash
# Yangi migration yaratish
npx typeorm migration:generate -d src/config/typeorm.config.ts src/database/migrations/MigrationNomi

# Migratsiyani bekor qilish
npx typeorm migration:revert -d dist/config/typeorm.config.js

# Lint tekshirish
npm run lint

# Build
npm run build
```

---

## 👤 Muallif

**Sotimov Shixnazar**
Najot Ta'lim — 7-oy loyihasi
