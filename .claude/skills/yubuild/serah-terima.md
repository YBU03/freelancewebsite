# Kepemilikan Akun dan Serah Terima

Bagaimana proyek berpindah tangan ke klien di langkah 7, tanpa meninggalkan
tanggungan di pihak Yubuild.

## Aturan kepemilikan

### Bangun di akun Yubuild, pindahkan saat serah terima

- **Langkah 1–6** — repo dan project Supabase berada di akun atau organisasi Yubuild.
  Tidak ada tunggu-tungguan, dan klien yang gaptek tidak perlu disuruh membuat akun
  sebelum pekerjaan dimulai.
- **Langkah 7** — klien membuat akun dengan **email dan kata sandi miliknya sendiri**,
  didampingi lewat video call. Lalu semuanya dipindahkan, dan Yubuild keluar dari
  daftar akses.

### Jangan membuatkan email lalu memegang kata sandinya

Bedanya halus tapi menentukan:

- ✅ **"Saya bantu klien membuat akun"** — klien yang mengetik dan memegang kata sandi
- ❌ **"Saya buatkan akun untuk klien"** — Yubuild yang memegang kata sandi

Yang kedua berarti Yubuild memegang kunci reset kata sandi ke seluruh akun klien.
Di atas kertas milik klien, pada praktiknya kendalinya ada di Yubuild. Risikonya:

- **Kalau ada sengketa** — klien merasa ditahan, dan posisi Yubuild sulit dijelaskan
- **Kalau akun Yubuild bobol** — satu email jebol, semua klien ikut jebol
- **Soal 2FA** — kalau kode pemulihannya di Yubuild, klien tidak bisa masuk tanpa
  Yubuild, jadi "milik klien" hanya di atas kertas
- **Ketentuan layanan** — sebagian besar penyedia mensyaratkan yang menyetujui syarat
  adalah pemilik akun itu sendiri. Jarang ditindak, tapi kalau ditindak, akunnya
  disuspend di situs klien yang sedang berjalan.

### Domain atas nama klien sejak hari pertama

Domain berbeda dari yang lain. Kode bisa disalin, database bisa diekspor, hosting
bisa pindah — domain itu tunggal.

Daftarkan atas nama dan email klien sejak awal, walaupun Yubuild yang membayar tahun
pertama. Alasan kedua yang praktis: **transfer antar-registrar biasanya terkunci
sekitar 60 hari** setelah domain baru didaftarkan. Domain yang didaftarkan hari ini
tidak bisa dipindahkan saat serah terima beberapa minggu kemudian.

### Satu organisasi Supabase per klien

Putuskan **di awal proyek**, bukan di akhir. Jangan menumpuk banyak klien dalam satu
organisasi, karena memisahkannya belakangan jauh lebih rumit.

Dengan pola ini, serah terima Supabase tidak perlu memindahkan project sama sekali:
cukup undang klien sebagai **Owner** organisasi, lalu Yubuild keluar. Tidak ada risiko
database, storage, atau edge function yang ketinggalan.

## Urutan transfer

Kerjakan berurutan. Jangan lompat.

### 1. GitHub — transfer repo

Settings repo → Danger Zone → **Transfer ownership**. Masukkan username atau organisasi
klien; penerima harus menyetujui.

Ikut berpindah: seluruh riwayat commit, issue, pull request, release, dan bintang.
GitHub juga membuat pengalihan otomatis dari URL lama, jadi tautan lama tidak mati.

**Yang TIDAK ikut berpindah — sering terlewat:**

- **Secrets GitHub Actions** harus diisi ulang di akun baru
- **Pengaturan GitHub Pages**, termasuk custom domain, sering perlu diatur ulang
- **Webhook dan deploy key** perlu diperiksa satu per satu

### 2. Sambungkan ulang deploy

Jebakan terbesar. Kalau situs di-deploy lewat Vercel atau Netlify yang tersambung ke
repo, **sambungannya bisa putus setelah repo berpindah pemilik** — integrasi GitHub
menempel pada akun atau tim tertentu.

Jangan transfer repo lalu langsung pamit. Pastikan deploy masih berjalan dari akun
klien sebelum melanjutkan.

### 3. Supabase

Pola yang dianjurkan: undang klien sebagai **Owner** organisasi, lalu keluar.

Kalau terpaksa memindahkan project antar-organisasi (Project Settings → General →
Transfer project), **periksa dulu syaratnya yang berlaku saat itu** — ketentuan soal
paket organisasi tujuan dan status keanggotaan pernah berubah. Jangan menjanjikannya
ke klien sebelum diperiksa.

### 4. Domain

Kalau sudah atas nama klien sejak awal, tidak ada yang perlu dikerjakan — cukup
pastikan klien bisa masuk ke panel registrar.

Kalau terlanjur atas nama Yubuild, siapkan kode EPP/auth dan perhitungkan kunci
60 hari itu.

### 5. Layanan lain

Google Analytics dan Search Console: tambahkan klien sebagai pemilik, lalu keluar.

### 6. Klien mengganti semua kata sandi

Lakukan **di depan Yubuild saat sesi serah terima**. Dua manfaat sekaligus: Yubuild
benar-benar kehilangan akses, dan ada bukti bahwa penyerahannya terjadi.

Setelah itu hapus salinan kredensial dari brankas Yubuild.

## Checklist serah terima

- [ ] Klien membuat akun dengan email dan kata sandinya sendiri (didampingi video call)
- [ ] Repo GitHub ditransfer, klien sudah menyetujui
- [ ] Secrets GitHub Actions diisi ulang
- [ ] Pengaturan GitHub Pages / custom domain diperiksa
- [ ] Deploy Vercel/Netlify disambungkan ulang dari akun klien
- [ ] **Situs dibuka dan dipastikan masih hidup setelah semua perpindahan**
- [ ] Organisasi Supabase berpindah ke klien, Yubuild keluar
- [ ] Domain dipastikan atas nama klien, klien bisa masuk panel registrar
- [ ] Analytics dan Search Console dipindahkan
- [ ] Kode sumber, berkas desain, dan aset diserahkan
- [ ] Video panduan penyuntingan diberikan
- [ ] Sesi pelatihan singkat dijalankan
- [ ] Dokumen serah terima ditandatangani
- [ ] Klien mengganti semua kata sandi, salinan di Yubuild dihapus
- [ ] Tanggal mulai garansi bug dicatat

## Dokumen serah terima

Satu halaman, ditandatangani kedua pihak. Isinya:

- Daftar seluruh akun: **layanan apa, atas nama siapa, biayanya berapa, jatuh tempo kapan**
- Apa yang termasuk garansi bug dan berapa lama
- Apa yang termasuk paket maintenance, kalau klien mengambilnya
- Cara menghubungi dan perkiraan waktu balasan

Tabel jatuh tempo itu menurunkan banyak chat "mas, hosting saya kok mati?" setahun
kemudian.

## Kalau klien benar-benar tidak sanggup mengurus akun

Ini nyata dan tidak apa-apa. Tapi jadikan **layanan yang disebutkan terang-terangan**,
bukan kebiasaan diam-diam. Tulis di dokumen serah terima:

> "Akun dikelola oleh Yubuild atas permintaan klien. Kredensial diserahkan kapan saja
> bila diminta."

Klien menandatangani. Bedanya besar: dari sesuatu yang bisa dipersoalkan belakangan,
menjadi kesepakatan yang memang dia minta.

## Kebersihan operasional

1. **Password manager dengan brankas terpisah per klien.** Jangan campur dalam satu catatan.
2. **Latih dulu dengan repo dummy** sebelum serah terima sungguhan. Transfer ke akun
   kedua, lihat apa yang rusak. Sekali latihan, urutannya hafal dan tidak gugup saat
   video call.
3. **Setelah serah terima, hapus salinan kredensial.**
