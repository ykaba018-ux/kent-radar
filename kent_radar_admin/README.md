# Kent Radar - Admin Dashboard

Belediye yöneticileri için modern ve kullanıcı dostu yönetim paneli.

## 🎯 Özellikler

### Dashboard
- 📊 Gerçek zamanlı istatistikler
- 📈 İhbar grafiklereri (Kategori, İlçe, Durum)
- 📋 Temel metrikleri takip

### İhbar Yönetimi
- 📝 Tüm ihbarları görüntüle ve yönet
- 🔍 Gelişmiş arama ve filtreleme
- ⚡ Durum güncelleme
- 👥 Ekip atama
- 💬 Yorum ve not ekleme

### Personel Yönetimi
- 👨‍💼 Personel listesi
- 🔐 Rol ve izin yönetimi
- 📞 İletişim bilgileri
- ✏️ Profil düzenleme

### Raporlar
- 📄 PDF export
- 📊 Excel export
- 📉 Performans metrikleri
- 📅 Zaman aralığı filtreleme

## 🚀 Kurulum

### Gereksinimler
- Node.js 14+
- npm veya yarn

### Adımlar

```bash
# Dependencyleri yükle
npm install

# Geliştirme sunucusunu başlat
npm start

# Üretim için build et
npm run build
```

## 📁 Dosya Yapısı

```
kent_radar_admin/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   └── ReportsPage.js
│   ├── layouts/
│   │   └── Layout.js
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   ├── authStore.js
│   │   └── reportStore.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env.example
├── package.json
└── README.md
```

## 🔧 Teknoloji Stack

- **React** 18 - UI library
- **React Router** - Yönlendirme
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.io** - Gerçek zamanlı iletişim
- **Chart.js** - Grafikler
- **Tailwind CSS** - Styling
- **React Icons** - İkonlar
- **React Hot Toast** - Bildirimler

## 📡 API Endpoints

### Authentication
- `POST /auth/admin/login` - Giriş
- `POST /auth/admin/logout` - Çıkış
- `GET /auth/admin/profile` - Profil bilgisi

### Reports
- `GET /admin/reports` - Tüm ihbarları listele
- `GET /admin/reports/:id` - İhbar detayları
- `PUT /admin/reports/:id/status` - Durum güncelle
- `PUT /admin/reports/:id/assign` - Ekip ata
- `POST /admin/reports/:id/comments` - Yorum ekle

### Statistics
- `GET /admin/statistics/dashboard` - Dashboard verileri
- `GET /admin/statistics/by-category` - Kategori bazlı
- `GET /admin/statistics/by-district` - İlçe bazlı
- `GET /admin/statistics/by-status` - Durum bazlı

## 🌐 Ortam Değişkenleri

`.env` dosyasını kopyala `.env.local` olarak ve aşağıdaki değişkenleri ayarla:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

## 📦 Build

```bash
npm run build
```

Üretim için optimize edilmiş build oluşturur.

## 📄 Lisans

MIT License

## 👨‍💻 Geliştirici

Yiğit Haktan - [@ykaba018-ux](https://github.com/ykaba018-ux)
