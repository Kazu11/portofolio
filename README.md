# Portofolio - Abdullah Faqih

## Struktur Proyek

```
portofolio/
├── index.html              # Halaman utama (markup saja, CSS & JS eksternal)
├── assets/
│   ├── css/
│   │   └── style.css       # Custom CSS (font-family, dll)
│   ├── js/
│   │   └── main.js         # Logic: dark mode, language toggle, mobile menu,
│   │                       # filter sertifikat, search, modal lightbox/carousel
│   ├── img/                # (tambahkan folder ini untuk gambar/profile/sertifikat)
│   └── favicon.ico
├── blog/                   # Output build Hugo (jangan edit manual, generated)
└── README.md
```

## Cara Kerja

- **index.html** memuat Tailwind CSS via CDN (`cdn.tailwindcss.com`) dan Font Awesome
  via CDN, ditambah `assets/css/style.css` untuk override kecil (font family).
- **assets/js/main.js** berisi semua logic interaktif: toggle bahasa ID/EN, dark mode,
  menu mobile, filter & search sertifikat, serta modal lightbox dengan carousel.
- **blog/** adalah folder terpisah yang di-generate oleh Hugo — sebaiknya di-build
  otomatis lewat GitHub Actions, bukan ditulis/commit manual.

## Menjalankan Secara Lokal

Karena ini situs statis murni, cukup buka `index.html` langsung di browser,
atau jalankan local server sederhana:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Todo / Saran Pengembangan

- [ ] Tambahkan `sitemap.xml` dan `robots.txt` untuk SEO
- [ ] Setup GitHub Actions untuk auto-build Hugo ke folder `blog/`
- [ ] Pertimbangkan minify CSS/JS untuk production
