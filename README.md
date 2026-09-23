# 🩺 Biology Champions: POV Perawat Rumah Sakit

Game edukasi interaktif berbasis web yang menyenangkan (*playful*) bernuansa **biru-tosca (cyan/teal)** untuk siswa SMA (Senior High School). Pemain mengambil peran sebagai seorang perawat di **Rumah Sakit Bio Medika**, merawat pasien dengan berbagai kondisi klinis melalui tantangan soal biologi kurikulum SMA (Kelas 10, 11, dan 12).

---

## 🌟 Fitur Utama
- **Single-File HTML**: Seluruh struktur HTML, CSS, JavaScript, animasi SVG, dan bank soal terintegrasi dalam **1 file mandiri (`index.html`)**. Sangat ringan, tanpa dependensi eksternal, dan langsung siap dipublikasikan di **GitHub Pages**.
- **POV Perawat & Simulasi Ruang Rawat (Ward)**:
  - Pemilihan avatar perawat lucu dan nama kustom dengan sistem kenaikan pangkat (*Perawat Magang* hingga *Master Biology Champion*).
  - 6 Pasien dengan animasi visual ekspresi sakit dan sembuh, keluhan klinis riil, dan sistem organ biologis berbeda.
  - **Oscilloscope EKG Real-Time**: Animasi gelombang detak jantung interaktif pada kanvas monitor ICU.
- **Troli Alat Medis & Pop-up Soal Biologi SMA**:
  - 🩺 **Stetoskop**: Auskultasi klinis suara jantung & napas.
  - 🌡️ **Termometer**: Skrining demam, respon imun & termoregulasi.
  - 💉 **Lab Darah**: Analisis hematologi, enzim, & biokimia darah.
  - 🔬 **Mikroskop Biologi**: Observasi apusan seluler dengan viewport mikroskopis interaktif.
  - 💊 **Resep Obat**: Preskripsi terapi kuratif.
- **Pop-up Clipboard Medis**:
  - Soal pilihan ganda Biologi SMA berbobot ilmiah (Sistem Peredaran Darah, Sistem Imun, Metabolisme Sel, Sistem Pernapasan, Nefron Ginjal, dan Genetika Molekuler).
  - Dilengkapi petunjuk (*Hint* biologi), umpan balik instan, dan pembahasan ilmiah mendalam.
- **Selebrasi Sembuh & Surat Kelulusan Pasien**:
  - Hujan konfeti, efek suara selebrasi, dan sertifikat resmi kepulangan pasien (*Discharge Certificate*).
- **Buku Saku Biologi SMA**:
  - Ensiklopedia medis berisi ringkasan materi biologi SMA yang dapat diakses kapan saja.
- **Efek Suara Sintetis (Web Audio API)**:
  - Detak jantung, monitor EKG, reward chime, pop suara obat, dan musik santai klinik tanpa perlu mengunduh file audio eksternal.

---

## 🚀 Cara Publikasi ke GitHub Pages (Hanya 3 Langkah)

Karena game ini sudah berbentuk **Single-File HTML (`index.html`)**, mempublikasikannya di GitHub Pages sangat mudah:

1. **Upload ke Repositori GitHub**:
   - Buat repositori baru di GitHub (misal: `biology-champions`).
   - Unggah seluruh file di folder ini (`index.html`, `.nojekyll`, `README.md`) ke branch `main`.
2. **Aktifkan GitHub Pages**:
   - Di repositori GitHub Anda, buka menu **Settings** > **Pages** (di bilah navigasi kiri).
   - Di bagian **Build and deployment** > **Source**, pilih **Deploy from a branch**.
   - Di bagian **Branch**, pilih `main` dan folder `/(root)`, lalu klik **Save**.
3. **Selesai!**:
   - Dalam 1-2 menit, GitHub akan memberikan tautan publik live game Anda, misalnya:  
     `https://<username-anda>.github.io/biology-champions/`
   - Game langsung dapat dimainkan oleh siapa saja melalui smartphone, tablet, maupun komputer/laptop!

---

## 💻 Menjalankan Secara Offline / Lokal
Anda juga bisa memainkan game ini secara langsung di laptop tanpa internet:
- Cukup **klik dua kali (*double-click*)** file `index.html` di File Explorer, dan game akan langsung terbuka di browser Anda!
