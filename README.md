# Express + React Native CRUD Posts

Repositori terdiri dari backend Express/MySQL/Prisma milik pengembang dan frontend React Native dari proyek referensi teman. **Pastikan izin penggunaan dan atribusi kepada pemilik frontend sebelum mengumpulkan atau mempublikasikan sebagai tugas akademik.** Jangan menyebut seluruh kode sebagai karya pribadi jika bukan demikian.

## Struktur

- `backend-express/`: REST API Express, Prisma, MySQL, unggah gambar Multer.
- `LearnReactNative/`: React Native 0.77.0, React Navigation, daftar/tambah/edit/hapus postingan.

## Prasyarat

Node.js 20, npm, MySQL, JDK 17, Android SDK, Android Emulator. Untuk lingkungan Windows yang pernah mengalami masalah Metro Node 24, pakai Node.js 20 seperti contoh di bawah.

## Backend

1. Buat database MySQL bernama `db_express` (atau sesuaikan URL database).
2. Di folder `backend-express`, salin `.env.example` menjadi `.env`. Ganti username dan password database; **jangan unggah `.env` ke GitHub**.
3. Dari terminal di `backend-express` jalankan:

   ```cmd
   npm install
   npx prisma generate
   npx prisma db push
   npm start
   ```

4. Pastikan `http://localhost:3000/api/posts` memberikan JSON. Gambar tersedia pada `/uploads/<nama-file>`.

## Frontend Android Emulator

1. Di folder `LearnReactNative`, jalankan `npm install`.
2. Salin `.env.example` ke `.env`. Default `BACKEND_API_URL=http://10.0.2.2:3000` untuk **Android Emulator** dan backend berjalan pada laptop, port 3000. `localhost` dari emulator bukan laptop. Untuk perangkat fisik, gunakan alamat IP LAN laptop dan pastikan firewall mengizinkan port tersebut.
3. Jalankan Android Emulator di Android Studio.
4. Terminal pertama dalam `LearnReactNative`:

   ```cmd
   npx --yes node@20 node_modules/react-native/cli.js start --reset-cache
   ```

5. Terminal kedua:

   ```cmd
   adb reverse tcp:8081 tcp:8081
   npx --yes node@20 node_modules/react-native/cli.js run-android --no-packager
   ```

6. Tunggu build berhasil. Aplikasi menampilkan daftar postingan dengan tombol `+` untuk menambah, serta `Edit` dan `Delete` untuk tiap postingan.

> Perubahan pada `.env` frontend memerlukan restart Metro dan reload aplikasi. File `.env.example` berisi konfigurasi contoh, bukan credential sebenarnya.

## Endpoint API

| Metode | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/posts` | Ambil daftar post |
| GET | `/api/posts/:id` | Detail post |
| POST | `/api/posts` | Tambah post (multipart: image, title, content) |
| PUT | `/api/posts/:id` | Ubah post (multipart; gambar opsional) |
| DELETE | `/api/posts/:id` | Hapus post |

## Catatan integrasi

- Backend mengirimkan bentuk JSON `{success, message, data}` yang digunakan oleh frontend.
- Backend memerlukan koneksi MySQL aktif; file ZIP tidak menyertakan database aktual atau kredensial.
- HTTP untuk pengembangan lokal sudah diizinkan dalam konfigurasi Android **debug**. Produksi memerlukan server HTTPS dan konfigurasi deployment sendiri.
- Kode sumber telah ditinjau secara statis, tetapi pengujian end-to-end di emulator Windows dan database lokal masih harus dilakukan sebelum pengumpulan.

## Kredit dan penggunaan akademik

Frontend berasal dari ZIP referensi `learn-react-native-express-crud-main.zip` yang disediakan pengguna sebagai project teman. Backend berasal dari `backend-express.zip` milik pengguna. Isi identitas/nama penulis dan tautan repository asal hanya setelah memastikan sumber dan izin penggunaan. Cantumkan pembagian kontribusi sesuai fakta.
