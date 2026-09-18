/* ============================================================
   KODERA — Perilaku situs
   Semua efek menghormati prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Isi identitas dari config ---------- */
  function fillIdentity() {
    if (CFG.brand) {
      document.querySelectorAll("[data-brand]").forEach(function (el) {
        el.textContent = CFG.brand;
      });
      document.title = CFG.brand + " — Jasa Pembuatan Website & Aplikasi Web";
    }

    document.querySelectorAll("[data-email]").forEach(function (el) {
      if (!CFG.email) {
        var host = el.closest("li") || el;
        host.hidden = true;
        return;
      }
      el.href = "mailto:" + CFG.email;
      el.textContent = CFG.email;
    });

    var jam = document.querySelector("[data-jam]");
    if (jam && CFG.jam) jam.textContent = CFG.jam;

    var city = document.querySelector("[data-city]");
    if (city && CFG.city) city.textContent = CFG.city;

    var year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();

    document.querySelectorAll("[data-social]").forEach(function (el) {
      var url = (CFG.social || {})[el.getAttribute("data-social")];
      if (url) {
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
        el.hidden = false;
      }
    });
  }

  /* ---------- 2. Tautan WhatsApp ----------
     Semua elemen [data-wa] diarahkan ke wa.me dengan pesan siap kirim.
     [data-wa-plan] menambahkan nama paket ke dalam pesan.            */
  function waLink(message) {
    var nomor = (CFG.whatsapp || "").replace(/\D/g, "");
    var teks = encodeURIComponent(message || "");
    return "https://wa.me/" + nomor + (teks ? "?text=" + teks : "");
  }

  function greeting(plan, work) {
    if (work) {
      return "Halo " + (CFG.brand || "") + ", saya lihat karya \"" + work +
             "\" di website Anda. Saya mau yang seperti itu untuk usaha saya. " +
             "Boleh minta rincian harga dan estimasi waktunya?";
    }
    var base = (CFG.waGreeting || "Halo {brand}, saya ingin konsultasi soal pembuatan website.")
      .replace(/\{brand\}/g, CFG.brand || "");
    if (plan) {
      base = "Halo " + (CFG.brand || "") + ", saya tertarik dengan paket " + plan +
             ". Boleh minta rincian harga dan estimasi waktunya?";
    }
    return base;
  }

  function bindWhatsApp() {
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      var plan = el.getAttribute("data-wa-plan");
      var work = el.getAttribute("data-wa-work");
      el.href = waLink(greeting(plan, work));
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  }

  /* ---------- 3. Navigasi ---------- */
  function initNav() {
    var nav = document.getElementById("nav");
    var burger = document.getElementById("burger");
    var sheet = document.getElementById("navSheet");
    if (!nav) return;

    /* Kaca pada bilah navigasi muncul begitu halaman digulir. */
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!burger || !sheet) return;

    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      document.body.style.overflow = open ? "hidden" : "";
    };

    burger.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    sheet.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        burger.focus();
      }
    });

    /* Menu lembar hanya untuk layar sempit — tutup kalau layar melebar. */
    window.matchMedia("(min-width: 721px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------- 4. Reveal saat digulir ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.prototype.slice.call(
          entry.target.parentElement ? entry.target.parentElement.children : []
        ).filter(function (n) { return n.classList.contains("reveal"); });
        var i = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (i > 0 ? Math.min(i, 5) * 70 : 0) + "ms";
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. Tombol WhatsApp mengambang ---------- */
  function initFloat() {
    var float = document.getElementById("waFloat");
    if (!float) return;
    var show = function () {
      float.classList.toggle("is-in", window.scrollY > 520);
    };
    show();
    window.addEventListener("scroll", show, { passive: true });
  }

  /* ---------- 6. FAQ ---------- */
  function initFaq() {
    var list = document.getElementById("faqList");
    if (!list) return;

    list.querySelectorAll(".faq__q").forEach(function (btn) {
      var item = btn.parentElement;
      var panel = btn.nextElementSibling;
      if (panel) {
        var id = "faq-panel-" + Math.random().toString(36).slice(2, 8);
        panel.id = id;
        btn.setAttribute("aria-controls", id);
      }

      btn.addEventListener("click", function () {
        var open = item.classList.contains("is-open");
        /* Satu jawaban terbuka pada satu waktu — halaman tetap tenang. */
        list.querySelectorAll(".faq__item.is-open").forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        });
        if (!open) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------- 7. Brief singkat → pesan WhatsApp ---------- */
  function initBrief() {
    var form = document.getElementById("briefForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nama = form.nama.value.trim();
      if (!nama) {
        form.nama.focus();
        form.nama.style.borderColor = "var(--red)";
        return;
      }
      form.nama.style.borderColor = "";

      var bisnis = form.bisnis.value.trim();
      var cerita = form.cerita.value.trim();

      var baris = [
        "Halo " + (CFG.brand || "") + ", saya ingin konsultasi pembuatan website.",
        "",
        "Nama: " + nama,
        bisnis ? "Bisnis: " + bisnis : null,
        "Kebutuhan: " + form.jenis.value,
        "Perkiraan anggaran: " + form.budget.value,
        cerita ? "" : null,
        cerita ? "Detail:" : null,
        cerita || null,
        "",
        "Mohon dibantu estimasi biaya dan waktunya. Terima kasih."
      ].filter(function (b) { return b !== null; });

      window.open(waLink(baris.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- 8. Jalankan ---------- */
  function boot() {
    fillIdentity();
    bindWhatsApp();
    initNav();
    initReveal();
    initFloat();
    initFaq();
    initBrief();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
