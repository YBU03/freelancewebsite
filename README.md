# Kodera — Website Jasa Pembuatan Website & Aplikasi Web

Situs statis satu halaman untuk bisnis jasa pembuatan website dan aplikasi web.
Tanpa proses build, tanpa dependensi — cukup buka `index.html` atau unggah
seluruh folder ke hosting mana pun.

## Struktur

```
index.html              Seluruh isi halaman
assets/css/style.css    Sistem desain + semua tampilan
assets/js/config.js     ← Ubah identitas & nomor WhatsApp di sini
assets/js/main.js       Navigasi, FAQ, reveal, formulir → WhatsApp
assets/img/favicon.svg  Ikon tab
robots.txt, sitemap.xml Dasar SEO
```

## Menjalankan secara lokal

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

## ⚠️ Ganti sebelum dipublikasikan

Bagian berikut berisi **data contoh** dan harus diganti dengan data asli:

| Apa | Di mana | Catatan |
|---|---|---|
| **Nomor WhatsApp** | `assets/js/config.js` → `whatsapp` | Wajib. Saat ini `6281234567890` (nomor contoh). Format: `62` + nomor tanpa angka 0 di depan. |
| Nama brand, email, kota, jam kerja | `assets/js/config.js` | Nama brand otomatis mengganti semua teks "Kodera" di halaman. |
| Tautan media sosial | `assets/js/config.js` → `social` | Isi `""` untuk menyembunyikan tautannya. |
| **Testimoni** | `index.html`, bagian `#testimoni` | Tiga testimoni yang ada adalah **contoh fiktif**. Ganti dengan testimoni asli beserta izin dari klien yang bersangkutan. |
| **Testimoni tidak cocok dengan portofolio** | `index.html`, bagian `#testimoni` | Testimoni menyebut Nusantara Logistik, Kopi Rakyat, dan Klinik Sehat Prima — nama-nama karangan yang **tidak ada** di portofolio. Pengunjung akan menyadarinya. Ganti dengan testimoni asli dari klien Pracaya, Ayomancing, dan sejenisnya, atau hapus seluruh bagian ini. |
| Klaim di bagian angka | `index.html`, blok `.stats` | "< 1 Jam", "Gratis", "DP 50%", "100% kepemilikan" adalah janji layanan, bukan rekam jejak. Pastikan Anda memang menjalankannya. |
| Domain pada `<link rel="canonical">`, Open Graph, `sitemap.xml` | `index.html`, `sitemap.xml` | Ganti `kodera.id` dengan domain Anda. |
| Gambar preview media sosial | `assets/img/og-image.png` | Belum ada. Buat gambar 1200×630 px. |

## Portofolio

Enam karya di bagian `#karya` adalah **proyek nyata**, diambil dari situs
portofolio Yubuild: Pracaya, SMP Ibnu Sina, Karya Logam Jaya, Rintis,
Ayomancing, dan Makaryo. Tangkapan layarnya ada di `assets/img/karya/`
(WebP, 880×550, total ~200 KB).

Setiap kartu adalah tautan WhatsApp yang menyebut nama karyanya:

```html
<a class="work__item" href="#" data-wa data-wa-work="Pracaya"> … </a>
```

menghasilkan pesan *"saya lihat karya Pracaya di website Anda. Saya mau yang
seperti itu untuk usaha saya…"* — jadi pengunjung masuk chat sambil membawa
konteks.

Menambah karya: salin satu blok `<a class="work__item">`, letakkan gambar
880×550 di `assets/img/karya/`, dan sesuaikan `data-wa-work`.

## Harga dan waktu dibahas lewat chat

Halaman ini **tidak menampilkan angka harga maupun lama pengerjaan**. Keduanya
disampaikan lewat WhatsApp, menyesuaikan kebutuhan tiap klien.

- Bagian `#paket` menampilkan tiga cakupan layanan (1 halaman / 5–8 halaman /
  custom) beserta skema pembayarannya, tanpa nominal dan tanpa estimasi hari.
- Badge di bagian **Cara Kerja** berisi penanda tahap ("Gratis", "Tanpa ikatan",
  "Setelah setuju"), bukan durasi.
- Dua pertanyaan pertama di FAQ menjelaskan alasan harga tidak dicantumkan, dan
  satu pertanyaan lain menjelaskan hal yang sama untuk waktu pengerjaan — supaya
  ketiadaan angka tidak terbaca sebagai menyembunyikan sesuatu.
- Tombol tiap paket membuka WhatsApp dengan pesan yang meminta rincian harga
  dan estimasi waktu sekaligus.

**Tiga angka yang sengaja dipertahankan** — hapus sendiri bila tidak diinginkan:

| Angka | Di mana | Alasan dipertahankan |
|---|---|---|
| "< 1 Jam" dan "dalam satu hari kerja" | blok `.stats`, bagian `#paket` | Janji kecepatan **balasan**, bukan lama pengerjaan. Justru mendukung alur chat-first. |
| "Garansi bug 30/90 hari" | daftar fitur di `#paket` | Jaminan yang Anda berikan, bukan estimasi penyelesaian. |
| Pilihan "Perkiraan anggaran" | formulir brief, `#f-budget` | Menanyakan anggaran calon klien, bukan tarif Anda. Membantu menyaring sebelum chat. Hapus blok `<div class="field">` untuk `#f-budget` bila tidak perlu. |

## Alur bisnis yang tertanam di halaman

Bagian **Cara Kerja** memetakan tujuh langkah:

1. Konsultasi WhatsApp → 2. Pembahasan Kebutuhan → 3. Invoice & Penawaran →
4. DP 50% → 5. Pengerjaan → 6. Revisi → 7. Pelunasan & Serah Terima

Setiap langkah mencantumkan perkiraan waktu dan hasil yang diterima klien.
Durasi dan jumlah putaran revisi ditulis di HTML — sesuaikan dengan cara Anda bekerja.

## Cara kerja tombol WhatsApp

Setiap elemen dengan atribut `data-wa` otomatis diarahkan ke `wa.me` beserta
pesan yang sudah terisi:

```html
<a href="#" data-wa>Konsultasi</a>                        <!-- pesan umum -->
<a href="#" data-wa data-wa-plan="Bisnis">Tanya Harga</a>  <!-- menanyakan harga paket -->
```

Formulir brief (`#brief`) menyusun pesan terstruktur berisi nama, bisnis,
jenis kebutuhan, anggaran, dan deskripsi — lalu membuka WhatsApp dengan pesan
tersebut. Tidak ada data yang dikirim ke server mana pun.

## Catatan desain

Mengikuti prinsip desain Apple (skill `design/liquid-glass`, `design/typography`,
`design/ux-writing` dari [claude-code-apple-skills](https://github.com/rshankras/claude-code-apple-skills),
tersalin di `.claude/skills/`):

- **Kaca hanya di lapisan navigasi** — bilah atas, menu, dan tombol mengambang.
  Kartu konten memakai isian dan garis tipis, bukan kaca. Tidak ada kaca di atas kaca.
- **Warna aksen hanya untuk aksi utama.** Merah menandai satu tombol per bagian;
  kalau semuanya diberi warna, tidak ada yang menonjol.
- **Hierarki dari tipografi**, bukan dari dekorasi. Tiga tingkat ukuran, tracking
  makin rapat seiring ukuran membesar (meniru perilaku SF Display).
- **Radius konsentris** — radius elemen di dalam = radius induk dikurangi padding.
- **Gerak** memakai kurva pegas dan tidak ada yang melewati 0,6 detik.
  Seluruhnya dinonaktifkan saat `prefers-reduced-motion` aktif.

## Aksesibilitas

Tautan lewati-ke-konten, `aria-expanded`/`aria-controls` pada FAQ dan menu,
penutupan menu dengan tombol Esc, cincin fokus yang terlihat, penyesuaian untuk
`prefers-reduced-motion` dan `prefers-contrast: more`, serta gaya cetak.

## Publikasi

Folder statis — bisa langsung diunggah:

- **Vercel / Netlify** — hubungkan repositori, tanpa pengaturan build.
- **GitHub Pages** — Settings → Pages → arahkan ke branch ini.
- **cPanel / hosting biasa** — unggah seluruh isi folder ke `public_html`.
