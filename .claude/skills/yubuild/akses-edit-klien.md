# Akses Edit untuk Klien

Cara memberi klien kemampuan mengubah isi websitenya sendiri, tanpa merusak
desain yang jadi nilai jual Yubuild.

## Prinsip dasar

**Editor konten terbatas, bukan page builder.**

Klien boleh mengganti teks, harga, foto, dan artikel di kolom yang sudah ditentukan.
Klien tidak boleh menggeser tata letak, mengganti warna, atau menambah bagian baru.

Alasannya bukan pelit. Yang dibeli klien adalah desainnya. Begitu diberi kebebasan
ala Elementor, dalam dua bulan halamannya berantakan — dan yang disalahkan tetap
Yubuild, karena namanya yang menempel di situ. Klien bengkel las tidak butuh
kebebasan; dia butuh mengganti harga dan menambah foto proyek.

## Tiga jalur

### Jalur 1 — CMS berbasis Git

Klien membuka `situsnya.com/admin`, mengisi formulir, menekan simpan. Perubahan
menjadi commit di GitHub, situs ter-deploy ulang sendiri.

Contoh perkakas: Decap CMS, Sveltia CMS, Pages CMS.

**Kelebihan**
- Nol biaya bulanan — konten hanyalah berkas di dalam repo
- Paling sejalan dengan janji "100% kepemilikan": tidak ada layanan pihak ketiga
  yang harus klien bayar seumur hidup
- Riwayat versi gratis. Klien menghapus sesuatu? `git revert`.

**Kekurangan**
- **Klien butuh akun GitHub untuk masuk.** Untuk admin sekolah atau staf kantor masih
  masuk akal; untuk pemilik warung, ini tembok.
- Bergantung pada proyek open source pihak lain yang kecepatan perawatannya naik-turun

> Perkakas CMS berbasis Git berganti status cukup sering (ada yang ditinggalkan, ada
> yang muncul sebagai pengganti). **Periksa status perawatan dan cara autentikasinya
> saat itu juga sebelum memilih** — jangan mengandalkan catatan ini.

### Jalur 2 — Admin custom di atas Supabase

Halaman admin kecil buatan sendiri: masuk pakai email dan kata sandi biasa, formulir
seadanya, konten tersimpan di Supabase.

**Kelebihan**
- Tidak butuh akun GitHub. Antarmuka bahasa Indonesia.
- **Sekali dibangun, dipakai ulang ke semua klien.** Ini satu-satunya jalur yang
  berubah dari biaya menjadi aset milik Yubuild.
- Kendali penuh atas apa yang boleh dan tidak boleh diubah

**Kekurangan**
- Situsnya tidak statis murni lagi; ada database yang harus dijaga
- Serah terima jadi lebih rumit — klien mewarisi tanggungan bulanan Supabase
- Butuh waktu bangun di awal

**Kalau memilih jalur ini:** mulai dari yang paling kecil. Satu klien, satu halaman
admin, hanya untuk teks dan gambar. Jangan langsung membangun "CMS untuk semua kasus".

### Jalur 3 — Tanpa admin, editing jadi layanan

"Mau ganti harga? Chat saja, kami perbarui hari itu juga."

Jangan buru-buru menganggap ini malas. Untuk mayoritas klien UMKM ini justru lebih
baik bagi dua pihak: klien tidak perlu belajar apa pun, dan Yubuild mendapat pemasukan
berulang lewat paket maintenance. Kenyataannya, kebanyakan klien company profile
hanya menyunting tiga sampai empat kali setahun.

Khusus untuk Yubuild, biayanya sangat murah: permintaan edit lewat WhatsApp bisa
diselesaikan dalam hitungan menit. Itu keunggulan yang vendor lain tidak punya.

## Cara memilih

| Paket | Jalur | Alasan |
|---|---|---|
| **Starter** (landing page) | Jalur 3 | Landing page jarang berubah. Edit masuk paket maintenance. |
| **Bisnis** (company profile) | Jalur 1 atau 2 | Tergantung seberapa melek teknologi kliennya |
| **Aplikasi** | Sudah punya admin sendiri | Tidak relevan |

**Kapan memutuskan:** di **langkah 2 (Pembahasan Kebutuhan)**, bukan di akhir.
Pertanyaan yang diajukan ke klien:

- Seberapa sering isinya akan berubah? (Di bawah 5 kali setahun → jalur 3)
- Siapa yang akan menyuntingnya, dan orang itu terbiasa memakai apa?
- Bersedia punya akun GitHub? (Tidak → coret jalur 1)
- Bersedia menanggung biaya bulanan setelah tahun pertama? (Tidak → coret jalur 2)

## Apa yang dibuat bisa diedit

Batasi sejak awal. Daftar putih, bukan daftar hitam.

**Aman diedit klien**
- Teks judul dan paragraf di bagian yang sudah ada
- Harga di tabel atau kartu
- Foto produk, foto galeri, foto tim
- Artikel atau berita
- Jam buka, alamat, nomor telepon
- Nyala/mati suatu bagian (misal: banner promo)

**Jangan dibuka**
- Warna, jenis huruf, ukuran huruf
- Tata letak dan urutan bagian
- Menambah atau menghapus bagian
- Kode HTML mentah di dalam kolom teks
- Pengaturan SEO teknis dan skema data terstruktur

Untuk gambar, tetapkan ukuran yang dianjurkan di dalam antarmuka admin dan kompres
otomatis saat diunggah. Tanpa itu, klien akan mengunggah foto 8 MB langsung dari HP
dan situs yang tadinya cepat jadi lambat.

## Setelah admin diserahkan

- Rekam video pendek berisi cara menyunting hal yang paling sering diubah. Jauh lebih
  efektif daripada dokumen panduan, dan bisa ditonton ulang tanpa menghubungi Yubuild.
- Beri satu halaman contoh untuk berlatih, supaya klien tidak belajar di halaman
  yang sudah tayang.
- Sebutkan terang-terangan bahwa riwayat versi ada, dan kesalahan bisa dikembalikan.
  Klien yang takut merusak tidak akan pernah menyentuh adminnya.
