# Kent Radar - Smart City Reporting System

Kent Radar, vatandaşların gördükleri sorunları belediyeye hızlı şekilde bildirmesi ve takip etmesi için tasarlanmış akıllı şehir uygulamasıdır.

## Özellikler

### Vatandaş Uygulaması
- 📸 Fotoğraf/Video ile sorun bildirimi
- 🗺️ Otomatik konum tespiti (Google Maps)
- ✅ E-posta OTP ile kimlik doğrulama
- ✅ SMS OTP ile kimlik doğrulama
- ✅ Google Sign-In ile hızlı giriş
- 📊 İhbar takip sistemi (Gerçek zamanl)
- 🔴 Acil durum bildirimi
- 🔔 WebSocket ile anlık bildirimler

### Teknoloji Stack
- **Frontend:** Flutter (iOS + Android)
- **Backend:** Node.js/Express
- **Database:** PostgreSQL
- **Realtime:** WebSocket (Socket.io)
- **Authentication:** Firebase Auth + OTP
- **Maps:** Google Maps API

## Kurulum

### Gereksinimler
```bash
Flutter 3.0+
Dart 3.0+
Node.js 16+
PostgreSQL 12+
```

### Flutter Kurulum
```bash
cd kent_radar_citizen_app
flutter pub get
```

### Çalıştırma
```bash
flutter run
```

## Dosya Yapısı
```
kent_radar/
├── database/
│   └── schema.sql
├── kent_radar_citizen_app/
│   ├── lib/
│   │   ├── services/
│   │   │   ├── api_service.dart
│   │   │   └── auth_service.dart
│   │   ├── providers/
│   │   │   ├── auth_provider.dart
│   │   │   ├── report_provider.dart
│   │   │   └── report_tracking_provider.dart
│   │   ├── screens/
│   │   │   ├── email_verification_screen.dart
│   │   │   ├── phone_verification_screen.dart
│   │   │   ├── report_form_screen.dart
│   │   │   └── report_tracking_screen.dart
│   │   └── main.dart
│   └── pubspec.yaml
├── .gitignore
└── README.md
```

## İhbar Gönderme Akışı

1. **Kimlik Doğrulama**
   - E-posta OTP veya SMS OTP ile kayıt
   - Google Sign-In seçeneği

2. **İhbar Oluşturma**
   - Konum seçimi (Google Maps)
   - Sorun kategorisi seçimi
   - Başlık ve açıklama yazma
   - Fotoğraf yükleme (opsiyonel)

3. **İhbar Takibi**
   - Gerçek zamanl durum güncellemeleri
   - Ekip atama bildirimi
   - Tamamlama bildirimi

## API Endpoints

### Authentication
- `POST /api/auth/register/email` - E-posta ile kayıt
- `POST /api/auth/register/phone` - Telefon ile kayıt
- `POST /api/auth/verify/email-otp` - E-posta OTP doğrulama
- `POST /api/auth/verify/sms-otp` - SMS OTP doğrulama
- `POST /api/auth/google` - Google giriş
- `POST /api/auth/resend-otp` - OTP yeniden gönder

### Reports
- `POST /api/reports/submit` - İhbar gönder
- `GET /api/reports/user/{userId}` - Kullanıcı ihbarları
- `GET /api/reports/{reportId}` - İhbar detayları

### Locations
- `GET /api/locations/districts` - İlçeleri listele
- `GET /api/locations/neighborhoods` - Mahalleleri listele

### Categories & Departments
- `GET /api/categories` - Kategorileri listele
- `GET /api/departments` - Birimleri listele

## WebSocket Events

- `report_status_update` - İhbar durum güncellemesi
- `report_assigned` - İhbar atama
- `emergency_update` - Acil durum güncellemesi

## Lisans

MIT License

## İletişim

Proje sahibi: Yiğit Haktan
GitHub: [@ykaba018-ux](https://github.com/ykaba018-ux)
