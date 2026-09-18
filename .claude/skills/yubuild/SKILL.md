---
name: yubuild
description: Standar Yubuild untuk membangun website dan aplikasi web klien di Indonesia — tumpukan teknologi, bahasa desain bergaya Apple beraksen merah, aturan copy berbahasa Indonesia, alur bisnis tujuh langkah (konsultasi WA sampai pelunasan), akses edit mandiri untuk klien, serta kepemilikan akun dan serah terima. Gunakan setiap kali membuat, meninjau, atau menambah fitur pada website klien Yubuild, menyiapkan akses admin untuk klien, atau menjalankan serah terima proyek.
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash]
last_verified: 2026-09-18
review_by: 2027-09-18
---

# Standar Yubuild

Pegangan kerja untuk membangun website dan aplikasi web pesanan klien: apa yang
dibangun, bagaimana bentuknya, apa yang boleh dan tidak boleh ditulis di halaman,
serta bagaimana proyek berpindah tangan ke klien saat selesai.

## When This Skill Activates

Gunakan skill ini saat:

- Membuat website baru untuk klien (company profile, landing page, toko online)
- Membangun aplikasi web custom (dasbor, sistem internal, PWA)
- Menyiapkan akses edit konten untuk klien
- Meninjau halaman yang sudah jadi sebelum diserahkan
- Menjalankan serah terima: transfer repo, database, domain, dan akun
- Menulis atau menyunting copy berbahasa Indonesia untuk halaman klien

## 1. Tumpukan teknologi — mulai dari yang paling ringan

Naik tingkat hanya kalau kebutuhannya memaksa. Jangan memulai dari framework.

| Kebutuhan | Pakai |
|---|---|
| Landing page, company profile, katalog | HTML + CSS + JS murni. Tanpa build, tanpa `npm install`. |
| Butuh klien edit konten sendiri | Tetap statis + CMS berbasis Git, atau admin kecil Supabase (lihat `akses-edit-klien.md`) |
| Toko online, checkout, payment gateway | Next.js + database |
| Login, hak akses, dasbor, laporan | Next.js + Supabase |
| Dipasang di HP karyawan | PWA + Supabase + notifikasi push |

Alasan statis lebih dulu: nol biaya bulanan, nol ketergantungan, dan serah terimanya
bersih — sesuai janji "100% kepemilikan" di halaman penjualan.

Font di-host sendiri bila memungkinkan. Hindari pemanggilan ke layanan pihak ketiga
yang tidak dibutuhkan; tiap sambungan keluar adalah satu hal yang bisa mati di kemudian hari.

## 2. Bahasa desain

Diturunkan dari prinsip desain Apple (`design/liquid-glass`, `design/typography`,
`design/ux-writing` di folder skills ini). Berlaku untuk semua halaman klien.

- **Kaca hanya di lapisan navigasi** — bilah atas, menu, tombol mengambang. Kartu dan
  isi halaman pakai isian dan garis tipis. Tidak pernah ada kaca di atas kaca.
- **Warna aksen hanya untuk aksi utama.** Satu tombol berwarna per bagian. Kalau semua
  diberi warna, tidak ada yang menonjol.
- **Hierarki dibangun dari tipografi**, bukan dekorasi. Dua sampai tiga tingkat ukuran;
  makin besar ukurannya, makin rapat tracking-nya.
- **Radius konsentris** — radius elemen di dalam = radius induk dikurangi padding.
- **Gerak memakai kurva pegas**, tidak ada yang melewati 0,6 detik, dan seluruhnya
  dimatikan saat `prefers-reduced-motion` aktif.
- **Mobile-first sungguhan.** Mayoritas pengunjung klien Indonesia datang dari HP.
  Uji di lebar 390px sebelum menganggap selesai; pastikan tidak ada scroll horizontal.

Wajib ada di tiap halaman: tautan lewati-ke-konten, `aria-expanded`/`aria-controls`
pada menu dan akordion, cincin fokus yang terlihat, serta dukungan
`prefers-reduced-motion` dan `prefers-contrast: more`.

## 3. Aturan copy

Bahasa Indonesia, sapaan "Anda". Jalankan tiap layar lewat PACE: apa tujuannya,
apa yang akan pembaca lakukan berikutnya, di mana dia sedang berada, dan tulis untuk
orang yang sedang punya masalah — bukan untuk sistem yang sedang melapor.

- **Buang kata pengisi**: "cukup", "tinggal", "mudah", "dengan cepat". Kalimatnya
  menguat tanpa itu.
- **Manfaat dulu, aksi belakangan.** "Untuk menerima kabar pesanan, isi nomor Anda."
- **Baca keras-keras.** Kalau janggal diucapkan, tulis ulang.
- **Label tombol konsisten** di seluruh halaman.

## 4. Yang TIDAK ditampilkan di halaman

Aturan tetap Yubuild — berlaku untuk website Yubuild sendiri maupun klien yang
memilih pola serupa:

- **Nominal harga.** Dibahas lewat WhatsApp, dikunci di invoice pada langkah 3.
- **Estimasi lama pengerjaan dalam hari atau minggu.** Disampaikan lewat chat.

Sebagai gantinya, kartu paket memakai **cakupan layanan** sebagai jangkar visual
("1 Halaman", "5–8 Halaman", "Custom"), dan badge tahapan memakai penanda non-waktu
("Gratis", "Tanpa ikatan", "Setelah setuju").

Selalu sertakan FAQ yang menjelaskan **kenapa** angkanya tidak dicantumkan. Tanpa
penjelasan, ketiadaan harga terbaca sebagai menyembunyikan sesuatu.

Boleh tetap ditampilkan: janji kecepatan **balasan** ("< 1 jam di jam kerja"), masa
**garansi bug**, dan pertanyaan **anggaran calon klien** di formulir brief. Ketiganya
bukan tarif dan bukan estimasi penyelesaian.

## 5. Alur bisnis tujuh langkah

Setiap halaman penjualan Yubuild memetakan alur ini, dan setiap proyek mengikutinya:

1. **Konsultasi WhatsApp** — gratis, tanpa kewajiban lanjut
2. **Pembahasan Kebutuhan** — hasilnya dokumen ruang lingkup yang disepakati
3. **Invoice & Penawaran** — rincian per item, satu angka final, tanpa biaya susulan
4. **DP 50%** — proyek dimulai, slot pengerjaan terkunci
5. **Pengerjaan** — desain disetujui dulu, baru kode; ada tautan pratinjau
6. **Revisi** — sesuai jumlah putaran di perjanjian
7. **Pelunasan & Serah Terima** — semua berpindah ke klien (lihat `serah-terima.md`)

Desain disetujui sebelum satu baris kode ditulis. Ketidakcocokan harus ketahuan saat
masih murah diperbaiki.

## 6. Akses edit untuk klien

Prinsipnya: **editor konten terbatas, bukan page builder.** Klien mengganti teks,
harga, foto, dan artikel di kolom yang sudah ditentukan — tidak menggeser tata letak.

Pilihan jalur dan cara memilihnya ada di **`akses-edit-klien.md`**. Baca file itu
sebelum menjanjikan CMS ke klien.

## 7. Kepemilikan akun dan serah terima

Prinsipnya: **bangun di akun Yubuild, pindahkan ke klien di langkah 7.** Domain
didaftarkan atas nama klien sejak hari pertama.

Urutan transfer, jebakan yang sering terlewat, dan checklist lengkapnya ada di
**`serah-terima.md`**. Jangan menjalankan serah terima dari ingatan.

## 8. Aturan kejujuran

Tidak boleh dilanggar, termasuk saat klien memintanya:

- **Jangan mengarang testimoni.** Kalau belum ada testimoni asli, hilangkan
  bagiannya. Testimoni fiktif yang menyebut klien yang tidak ada di portofolio akan
  ketahuan pengunjung.
- **Jangan mengarang rekam jejak.** "120+ proyek selesai" yang tidak ada dasarnya
  adalah klaim palsu. Gunakan **janji layanan** yang memang dijalankan
  ("< 1 jam balasan", "DP 50%", "100% kepemilikan") — itu terverifikasi dan sama kuatnya.
- **Portofolio harus proyek nyata** dengan tangkapan layar asli.
- Data contoh yang masih tertinggal ditandai jelas di README, dengan daftar apa yang
  wajib diganti sebelum publikasi.

## 9. Sebelum menyatakan selesai

- [ ] Jalankan di browser sungguhan, bukan hanya baca kodenya
- [ ] Tidak ada error di konsol, tidak ada permintaan gagal (4xx/5xx)
- [ ] Uji di lebar 390px — tanpa scroll horizontal
- [ ] Semua anchor internal mengarah ke id yang ada
- [ ] Semua tautan WhatsApp membuka pesan yang benar
- [ ] Formulir menghasilkan keluaran yang benar, dan validasinya bekerja
- [ ] Gambar punya `alt`, `width`, `height`, dan `loading="lazy"`
- [ ] README mencantumkan apa yang wajib diganti sebelum publikasi

## Berkas Rujukan

| Berkas | Isi |
|---|---|
| [akses-edit-klien.md](akses-edit-klien.md) | Tiga jalur akses edit, cara memilih per paket, apa yang boleh diedit klien |
| [serah-terima.md](serah-terima.md) | Aturan kepemilikan akun, urutan transfer GitHub/Supabase/domain, jebakan, checklist |

## Rujukan lain

- Skill desain Apple di folder ini: `design/liquid-glass`, `design/typography`,
  `design/ux-writing`, `design/animation-patterns`
- Nomor WhatsApp, nama brand, dan identitas lain dipusatkan di satu berkas konfigurasi
  per proyek — jangan sebar ke dalam HTML
