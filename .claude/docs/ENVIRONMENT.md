# Environment & Configuration

## Environment Files

| File | Kegunaan |
|---|---|
| `run.env.dev` | Development lokal |
| `run.env.local.dev` | Development lokal (alternatif) |
| `run.env.build.dev` | Build untuk dev |
| `run.env.build.local` | Build untuk lokal |
| `run.env.start.dev` | Jalankan production server (dev) |
| `run.env.start.local` | Jalankan production server (lokal) |

## Required Environment Variables

| Variabel | Keterangan |
|---|---|
| `DATABASE_URL` | PostgreSQL URL dengan connection pool params (`connection_limit=10&pool_timeout=20&connect_timeout=10`) |
| `NEXTAUTH_SECRET` | Secret untuk session/JWT |
| Midtrans keys | Payment gateway |
| Google Maps key | Fitur peta bisnis |
| Firebase service account | Push notifications (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY) |
| `RESEND_APIKEY` | Pengiriman email |
| WhatsApp credentials | Notifikasi WhatsApp |
