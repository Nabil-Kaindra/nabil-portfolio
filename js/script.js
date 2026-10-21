/* ==========================================================================
   NABIL KAINDRA — PORTFOLIO
   Vanilla JavaScript. Sections:
   1 Footer year · 2 Mobile navigation · 3 Active link · 4 Reveal on scroll
   5 Placeholder links · 6 Language toggle (EN / ID)
   ========================================================================== */

(function () {
  "use strict";

  /* 1. FOOTER YEAR ------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* 2. MOBILE NAVIGATION ------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var navPanel = document.getElementById("nav-panel");
  var desktopQuery = window.matchMedia("(min-width: 56rem)");
  var navLabels = { en: ["Open menu", "Close menu"], id: ["Buka menu", "Tutup menu"] };
  var currentLang = "en";

  function setMenu(open) {
    if (!navToggle || !navPanel) return;
    navPanel.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", navLabels[currentLang][open ? 1 : 0]);
  }

  if (navToggle && navPanel) {
    navToggle.addEventListener("click", function () {
      setMenu(!navPanel.classList.contains("is-open"));
    });

    // Close after choosing a link
    navPanel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });

    // Close with Escape and return focus to the button
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navPanel.classList.contains("is-open")) {
        setMenu(false);
        navToggle.focus();
      }
    });

    // Close if the window grows to desktop width
    var onResize = function (e) { if (e.matches) setMenu(false); };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onResize);
    else desktopQuery.addListener(onResize);
  }


  /* 3. ACTIVE LINK ON SCROLL --------------------------------------------- */
  var navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  var sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          var isCurrent = link.getAttribute("href") === "#" + id;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (section) { activeObserver.observe(section); });
  }


  /* 4. REVEAL ON SCROLL -------------------------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    // No observer or reduced motion: show everything immediately
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }


  /* 5. PLACEHOLDER PROJECT LINKS ----------------------------------------- */
  // Links marked data-placeholder do nothing until you give them a real href.
  // When a project is real: remove data-placeholder and set href="https://...".
  document.querySelectorAll("a[data-placeholder]").forEach(function (link) {
    link.addEventListener("click", function (event) { event.preventDefault(); });
  });


  /* 6. LANGUAGE TOGGLE (EN / ID) ----------------------------------------- */
  // English text is read from the HTML itself, so the HTML stays the single
  // source for English. Only the Indonesian text lives here.
  var ID = {
    skip: "Langsung ke konten",
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_work: "Karya Pilihan",
    nav_skills: "Keahlian",
    nav_experience: "Pengalaman",
    nav_contact: "Kontak",

    hero_label: "Tanjungpinang, Indonesia ·",
    hero_intro: "Saya Nabil, mahasiswa Culinary Arts yang juga mendesain, membangun, dan mengelola situs web. Saya suka pekerjaan yang persiapan matangnya terlihat pada hasil akhir, entah itu hidangan penutup yang ditata rapi atau tata letak yang bersih.",
    hero_cta_work: "Lihat proyek",
    hero_cta_contact: "Hubungi saya",

    about_title: "Tentang",
    portrait_ph: "Tempat foto potret",
    portrait_cap: "Nabil Kaindra Budiantana",
    about_lead: "Saya memulai dari rekayasa perangkat lunak, lalu pindah ke dapur. Sekarang saya bekerja di antara keduanya.",
    about_p1: "Saya menempuh D3 Culinary Arts di Politeknik Bintan Cakrawala, dengan pengalaman praktik di operasional dapur, pengecekan kualitas makanan, serta layanan makanan dan minuman. Saya sedang membangun dasar-dasar pastry dan baking, dan ingin belajar dari para pastry chef berpengalaman.",
    about_p2: "Sebelumnya, saya belajar Rekayasa Perangkat Lunak di SMKN 4 Tanjungpinang Timur. Saya masih mendesain di Canva, menulis kode front-end, dan mengelola situs web, serta memimpin tim Kominfo (komunikasi dan informasi) di BEM PBC. Saya membawa kebiasaan yang sama ke kedua dunia ini: alur kerja yang rapi, perhatian pada detail, dan rasa hormat kepada tim di sekitar saya.",
    facts_studying: "Sedang menempuh",
    facts_studying_v: "D3 Culinary Arts",
    facts_based: "Berdomisili di",
    facts_based_v: "Tanjungpinang",
    facts_lang: "Bahasa",
    facts_lang_v: "Indonesia, Inggris",

    work_title: "Karya Pilihan",
    work_note: "Empat entri di bawah ini adalah contoh placeholder. Proyek nyata akan menggantikannya setelah ditambahkan.",
    ph_label: "Gambar placeholder",
    tools_label: "Alat",
    view_details: "Lihat detail",
    p1_cat: "Desain Grafis",
    p1_title: "Contoh Judul Proyek",
    p1_desc: "Placeholder: poster, tata letak media sosial, atau materi merek yang dibuat di Canva.",
    p2_cat: "Pengembangan Web & Pengelolaan Situs",
    p2_title: "Contoh Judul Proyek",
    p2_desc: "Placeholder: situs web responsif yang dibangun atau dikelola, seperti portofolio ini atau proyek kampus.",
    p3_cat: "Konten Digital & Kampanye Kreatif",
    p3_title: "Contoh Judul Proyek",
    p3_desc: "Placeholder: konten untuk acara atau organisasi, seperti pekerjaan Kominfo di BEM PBC.",
    p4_cat: "Seni Kuliner & Pastry",
    p4_title: "Contoh Judul Proyek",
    p4_desc: "Placeholder: hidangan penutup yang ditata, kue panggang, atau praktik dapur beserta foto.",

    skills_title: "Keahlian",
    sk_design: "Desain",
    sk_design_1: "Canva",
    sk_design_2: "Desain tata letak",
    sk_design_3: "Komunikasi visual",
    sk_design_4: "Desain digital",
    sk_web: "Web",
    sk_web_5: "Pengelolaan situs web",
    sk_content: "Konten",
    sk_content_1: "Pembuatan konten digital",
    sk_content_2: "Penceritaan visual",
    sk_culinary: "Kuliner",
    sk_culinary_1: "Persiapan makanan",
    sk_culinary_2: "Alur kerja dapur",
    sk_culinary_3: "Dasar-dasar pastry",
    sk_culinary_4: "Pengecekan kualitas makanan",
    sk_also: "Juga",
    sk_also_v: "Kerja sama tim dan koordinasi · Kepemimpinan",

    exp_title: "Pengalaman & Pendidikan",
    edu_title: "Pendidikan",
    present: "Sekarang",
    edu1_t: "D3 Culinary Arts",
    edu2_t: "Rekayasa Perangkat Lunak",
    work_exp_title: "Pekerjaan & Keterlibatan",
    x1_t: "Quality Checker",
    x2_t: "Layanan F&B, Pastry, dan Dapur Utama",
    x3_d: "Jan 2026",
    x3_t: "Asisten Juru Masak",
    x4_t: "Ketua Tim Kominfo",
    x5_t: "Relawan, Tim Penitipan Sepeda",
    x6_t: "Relawan, Tim Penitipan Sepeda",
    x7_t: "Pekerja Harian",

    contact_title: "Kontak",
    contact_lead: "Terbuka untuk magang dapur dan pastry, serta pekerjaan desain atau web yang bisa dikerjakan di sela-selanya.",
    back_top: "Kembali ke atas"
  };

  var META = {
    en: {
      title: document.title,
      description: (document.querySelector('meta[name="description"]') || {}).content || ""
    },
    id: {
      title: "Nabil Kaindra Budiantana — Seni Kuliner & Kreator Digital",
      description: "Portofolio Nabil Kaindra Budiantana, mahasiswa Culinary Arts di Tanjungpinang yang memadukan desain grafis, pengembangan web, dan dasar-dasar pastry."
    }
  };

  var LABELS = {
    en: { toggle: "Switch language to Indonesian", portrait: "Portrait placeholder" },
    id: { toggle: "Ganti bahasa ke Inggris", portrait: "Tempat foto potret" }
  };

  // Months that differ in Indonesian (applied to timeline dates)
  var MONTHS_ID = { Aug: "Agu", Oct: "Okt", Dec: "Des" };

  var i18nEls = document.querySelectorAll("[data-i18n]");
  var EN = {};
  i18nEls.forEach(function (el) {
    EN[el.getAttribute("data-i18n")] = el.textContent.replace(/\s+/g, " ").trim();
  });

  var dateNodes = [];
  document.querySelectorAll(".timeline__date").forEach(function (el) {
    el.childNodes.forEach(function (node) {
      if (node.nodeType === 3 && /[A-Za-z]{3}/.test(node.nodeValue)) {
        dateNodes.push({ node: node, original: node.nodeValue });
      }
    });
  });

  var langToggle = document.getElementById("lang-toggle");
  var metaDesc = document.querySelector('meta[name="description"]');
  var portraitPh = document.querySelector(".portrait__placeholder");

  function applyLanguage(lang) {
    var dict = lang === "id" ? ID : EN;
    currentLang = lang;

    document.documentElement.lang = lang;

    i18nEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    dateNodes.forEach(function (item) {
      var text = item.original;
      if (lang === "id") {
        text = text.replace(/\b(Aug|Oct|Dec)\b/g, function (m) { return MONTHS_ID[m]; });
      }
      item.node.nodeValue = text;
    });

    document.title = META[lang].title;
    if (metaDesc) metaDesc.setAttribute("content", META[lang].description);
    if (langToggle) langToggle.setAttribute("aria-label", LABELS[lang].toggle);
    if (portraitPh) portraitPh.setAttribute("aria-label", LABELS[lang].portrait);

    if (navToggle && navPanel) {
      var open = navPanel.classList.contains("is-open");
      navToggle.setAttribute("aria-label", navLabels[lang][open ? 1 : 0]);
    }
  }

  function readSavedLanguage() {
    try {
      var saved = localStorage.getItem("lang");
      return saved === "id" || saved === "en" ? saved : "en";
    } catch (e) {
      return "en"; // storage blocked: fall back to English
    }
  }

  function saveLanguage(lang) {
    try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = currentLang === "en" ? "id" : "en";
      applyLanguage(next);
      saveLanguage(next);
    });
  }

  // Apply saved choice on load (English is already in the HTML)
  var initial = readSavedLanguage();
  if (initial !== "en") applyLanguage(initial);
})();