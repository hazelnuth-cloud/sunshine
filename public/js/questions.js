/**
 * Biology Champions: Klinik Dokter Usagi (Chiikawa Bio Care)
 * Bank Soal Biologi SMA (Kelas 10, 11, 12) - Level Bersahabat & Edukatif
 * Terintegrasi dengan interaksi pasien Chiikawa, alat medis, dan pencarian obat di apotek
 */

const BIOLOGY_QUESTIONS = [
    // =========================================================================
    // KASUS 1: Chiikawa - Gejala: Perut Perih, Asam Lambung Naik (Sistem Pencernaan)
    // =========================================================================
    {
        id: "Q1_STETH",
        patientId: "patient_1",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Auskultasi Lambung Chiikawa",
        context: "Dokter Usagi meletakkan stetoskop di perut Chiikawa. Terdengar bunyi gemuruh lambung dan Chiikawa meringis kesakitan akibat lambung kosong yang teriritasi.",
        question: "Di dalam lambung manusia, terdapat zat asam kuat yang berfungsi membunuh kuman pada makanan dan mengaktifkan pepsinogen menjadi pepsin. Zat asam apakah itu?",
        options: [
            "Asam Sulfat (H2SO4)",
            "Asam Klorida (HCl)",
            "Asam Asetat / Cuka (CH3COOH)",
            "Asam Karbonat (H2CO3)"
        ],
        correctIndex: 1,
        hint: "Zat asam lambung ini memiliki rumus kimia HCl dengan pH sangat asam (sekitar 1-2).",
        explanation: "YAHA! Tepat sekali! Lambung memproduksi Asam Klorida (HCl) untuk menciptakan suasana asam, membunuh bakteri patogen, dan mengubah pepsinogen menjadi enzim pepsin yang aktif mencerna protein.",
        topicTag: "Biologi SMA: Sistem Pencernaan Manusia"
    },
    {
        id: "Q1_THERMO",
        patientId: "patient_1",
        tool: "thermometer",
        toolName: "Termometer & Suhu Tubuh",
        stageTitle: "Pemeriksaan Suhu & Kerja Enzim",
        context: "Suhu tubuh Chiikawa diperiksa dan menunjukkan angka 36.8°C (normal). Dokter Usagi ingin memastikan suhu ini mendukung fungsi enzim pencernaan.",
        question: "Enzim-enzim pencernaan di dalam tubuh manusia bekerja secara optimal pada suhu berapa?",
        options: [
            "Suhu beku sekitar 0°C - 5°C",
            "Suhu tubuh normal sekitar 36°C - 37°C",
            "Suhu panas mendidih di atas 70°C",
            "Suhu dingin sekitar 15°C - 20°C"
        ],
        correctIndex: 1,
        hint: "Enzim adalah protein yang bekerja paling baik pada suhu fisiologis tubuh kita sendiri.",
        explanation: "YAHA! Benar! Enzim tubuh bekerja maksimal pada suhu optimum sekitar 36°C - 37°C. Jika suhu terlalu dingin enzim tidak aktif, dan jika terlalu panas di atas 45°C enzim akan rusak (denaturasi).",
        topicTag: "Biologi SMA: Enzim & Metabolisme"
    },
    {
        id: "Q1_BLOOD",
        patientId: "patient_1",
        tool: "bloodLab",
        toolName: "Lab Darah & Nutrisi",
        stageTitle: "Analisis Kadar Glukosa & Pencernaan",
        context: "Chiikawa seharian terlambat makan kue sehingga kadar glukosa darahnya menurun.",
        question: "Nutrisi hasil pencernaan karbohidrat berupa glukosa diserap paling banyak ke dalam aliran darah melalui organ apa?",
        options: [
            "Mulut melalui kelenjar ludah",
            "Kerongkongan (esofagus)",
            "Usus halus (khususnya ileum melalui vili/jonjot usus)",
            "Usus besar (kolon)"
        ],
        correctIndex: 2,
        hint: "Organ berliku yang memiliki jonjot-jonjot (vili) untuk memperluas bidang penyerapan nutrisi makanan.",
        explanation: "YAHA! Usagi bersorak gembira! Usus halus (terutama ileum) memiliki jutaan vili dan mikrovili yang menyerap sari-sari makanan seperti glukosa dan asam amino langsung ke kapiler darah.",
        topicTag: "Biologi SMA: Penyerapan Nutrisi"
    },
    {
        id: "Q1_MICROSCOPE",
        patientId: "patient_1",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Pengamatan Sel Mukosa Dinding Lambung",
        context: "Dokter Usagi mengamati slide preparat dinding lambung di bawah mikroskop untuk melihat pelindung lambung Chiikawa.",
        question: "Mengapa dinding lambung manusia yang sehat tidak terkikis atau hancur oleh keasaman asam lambung (HCl) yang sangat pekat?",
        options: [
            "Dinding lambung dilapisi lapisan lendir (mukus) tebal dari sel goblet",
            "Dinding lambung tersusun dari zat tanduk keratin yang keras seperti kuku",
            "Darah di dinding lambung selalu membeku untuk menahan asam",
            "Di lambung tidak ada pembuluh darah sama sekali"
        ],
        correctIndex: 0,
        hint: "Ada lapisan lendir pelindung (lendir mukus bikarbonat) yang dihasilkan oleh sel-sel epitel lambung.",
        explanation: "YAHA! Pintar sekali! Dinding lambung dilapisi oleh lapisan mukus (lendir) kental yang mengandung ion bikarbonat untuk melindungi sel epitel lambung dari korosi asam klorida (HCl) dan enzim pepsin.",
        topicTag: "Biologi SMA: Jaringan Epitel Lambung"
    },
    {
        id: "Q1_TREATMENT",
        patientId: "patient_1",
        tool: "treatment",
        toolName: "Resep Obat Dokter Usagi",
        stageTitle: "Resep Terapi Asam Lambung Chiikawa",
        context: "Dokter Usagi selesai mendiagnosis Chiikawa. Lambung Chiikawa memproduksi asam klorida (HCl) berlebih sehingga perlu dinetralkan.",
        question: "Senyawa obat apakah yang bersifat basa lemah dan paling tepat digunakan untuk menetralkan asam lambung (HCl) berlebih melalui reaksi netralisasi?",
        options: [
            "Cuka Asam (Asam Asetat)",
            "Sirup Antasida (mengandung Magnesium Hidroksida Mg(OH)2)",
            "Garam Dapur Pekat (NaCl)",
            "Minyak Goreng Nabati"
        ],
        correctIndex: 1,
        hint: "Obat ini berwujud sirup atau tablet kunyah yang dikenal sebagai Antasida (anti-asam).",
        explanation: "YAHA! PULULU! Betul sekali! Antasida yang mengandung senyawa basa seperti Magnesium Hidroksida Mg(OH)2 akan bereaksi dengan asam HCl membentuk garam netral dan air, sehingga perut Chiikawa tidak perih lagi! Sekarang ayo jalan ke Ruang Obat untuk mengambil Sirup Antasida!",
        topicTag: "Biologi SMA: Terapi Farmakologi & Netralisasi"
    },

    // =========================================================================
    // KASUS 2: Hachiware - Gejala: Pucat, Pusing, Lemas (Sistem Sirkulasi & Anemia)
    // =========================================================================
    {
        id: "Q2_STETH",
        patientId: "patient_2",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Auskultasi Jantung Hachiware",
        context: "Dokter Usagi menempelkan stetoskop di dada Hachiware. Detak jantungnya berdegup sangat kencang (takikardia) meski Hachiware sedang berbaring.",
        question: "Mengapa jantung seseorang yang kekurangan sel darah merah berdetak lebih cepat daripada orang normal?",
        options: [
            "Untuk mendinginkan suhu kepala pasien",
            "Kompensasi tubuh memompa darah lebih cepat agar pasokan oksigen ke jaringan tetap terpenuhi",
            "Karena kelebihan hormon insulin di dalam darah",
            "Agar pembuluh darah vena menyempit dan mengering"
        ],
        correctIndex: 1,
        hint: "Ketika setiap tetes darah membawa lebih sedikit oksigen, jantung harus memompa dengan frekuensi lebih tinggi.",
        explanation: "YAHA! Tepat! Karena kadar sel darah merah atau hemoglobin minim, tubuh berusaha mengimbangi kekurangan oksigen (hipoksia) dengan mempercepat pompa denyut jantung.",
        topicTag: "Biologi SMA: Fisiologi Jantung & Sirkulasi"
    },
    {
        id: "Q2_THERMO",
        patientId: "patient_2",
        tool: "thermometer",
        toolName: "Termometer & Skrining Vitals",
        stageTitle: "Pemeriksaan Suhu & Ujung Jari Dingin",
        context: "Ujung telapak kaki dan tangan Hachiware terasa dingin dan tampak pucat pasi saat disentuh Dokter Usagi.",
        question: "Penyebab telapak tangan dan ujung jari terasa dingin pada pasien anemia adalah karena...",
        options: [
            "Darah membeku di seluruh pembuluh tubuh",
            "Aliran darah diprioritaskan mengalir ke organ-organ vital (seperti otak dan jantung) daripada ke kulit",
            "Kulit kehilangan seluruh pori-pori keringatnya",
            "Sel darah merah berubah menjadi sel lemak"
        ],
        correctIndex: 1,
        hint: "Tubuh secara cerdas mengarahkan aliran darah ke organ yang paling penting untuk bertahan hidup.",
        explanation: "YAHA! Betul sekali! Saat oksigen menipis, pembuluh kapiler perifer di tangan dan kulit menyempit sehingga darah beroksigen diarahkan ke organ utama seperti otak dan jantung.",
        topicTag: "Biologi SMA: Homeostasis Sirkulasi"
    },
    {
        id: "Q2_BLOOD",
        patientId: "patient_2",
        tool: "bloodLab",
        toolName: "Lab Darah & Hematologi",
        stageTitle: "Analisis Sel Darah Merah Hachiware",
        context: "Hasil tes lab Hachiware menunjukkan kadar Hemoglobin hanya 7.2 g/dL (normalnya 12-16 g/dL).",
        question: "Protein penting di dalam sel darah merah (eritrosit) yang bertugas mengikat gas oksigen dari paru-paru adalah...",
        options: [
            "Albumin",
            "Fibrinogen",
            "Hemoglobin",
            "Aktin"
        ],
        correctIndex: 2,
        hint: "Protein ini memiliki gugus Heme yang mengandung mineral zat besi (Fe) dan memberi warna merah pada darah.",
        explanation: "YAHA! URA! Benar! Hemoglobin (Hb) adalah molekul protein berzat besi pada sel darah merah yang mengikat molekul oksigen (O2) membentuk oksihemoglobin untuk diedarkan ke seluruh tubuh.",
        topicTag: "Biologi SMA: Komponen Darah"
    },
    {
        id: "Q2_MICROSCOPE",
        patientId: "patient_2",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Morfologi Sel Darah Merah",
        context: "Di bawah lensa mikroskop, Dokter Usagi melihat sel-sel darah merah Hachiware tampak berukuran lebih kecil dan bagian tengahnya sangat pucat.",
        question: "Bagaimanakah ciri khas bentuk sel darah merah (eritrosit) manusia normal yang matang?",
        options: [
            "Bentuk pipih bulat dengan tonjolan flagela",
            "Bentuk bulat cakram bikonkaf (cekung di kedua sisi) dan tidak memiliki inti sel",
            "Bentuk kubus bercabang dengan banyak inti sel",
            "Bentuk serabut panjang seperti benang"
        ],
        correctIndex: 1,
        hint: "Cekung di bagian tengah untuk memaksimalkan luas permukaan penyerapan oksigen dan tanpa nukleus.",
        explanation: "YAHA! Benar sekali! Eritrosit matang berbentuk cakram bikonkaf tanpa nukleus dan organel, sehingga ruang sitoplasmanya dapat menampung molekul hemoglobin sebanyak mungkin.",
        topicTag: "Biologi SMA: Struktur Sel Darah"
    },
    {
        id: "Q2_TREATMENT",
        patientId: "patient_2",
        tool: "treatment",
        toolName: "Resep Obat Dokter Usagi",
        stageTitle: "Resep Terapi Anemia Hachiware",
        context: "Hachiware positif mengalami Anemia Defisiensi Besi. Dokter Usagi harus memilihkan suplemen yang merangsang pembentukan hemoglobin.",
        question: "Mineral apakah yang paling penting diperlukan tubuh untuk membentuk molekul hemoglobin di sumsum tulang?",
        options: [
            "Zat Besi (Fe)",
            "Iodin (I)",
            "Fluor (F)",
            "Natrium (Na)"
        ],
        correctIndex: 0,
        hint: "Mineral besi ini sering dikombinasikan dengan Vitamin C agar mudah diserap oleh usus.",
        explanation: "YAHA! PULULU! Zat Besi (Fe) adalah inti dari gugus heme pada hemoglobin! Ayo segera jalan ke Ruangan Obat dan ambilkan Tablet Zat Besi (Fe) & Vitamin C untuk Hachiware!",
        topicTag: "Biologi SMA: Mineral & Hematopoiesis"
    },

    // =========================================================================
    // KASUS 3: Kurimanju - Gejala: Sesak Napas, Batuk Berdebu (Sistem Pernapasan)
    // =========================================================================
    {
        id: "Q3_STETH",
        patientId: "patient_3",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Auskultasi Saluran Napas Kurimanju",
        context: "Dokter Usagi menempelkan stetoskop di punggung dada Kurimanju. Terdengar suara mengi (*wheezing*) saat Kurimanju menghembuskan napas.",
        question: "Saluran pernapasan yang bercabang dua dari tenggorokan (trakea) menuju ke paru-paru kanan dan kiri dinamakan...",
        options: [
            "Faring",
            "Laring",
            "Bronkus",
            "Esofagus"
        ],
        correctIndex: 2,
        hint: "Cabang utama trakea yang kemudian bercabang-cabang lagi menjadi bronkiolus.",
        explanation: "YAHA! Tepat! Trakea bercabang menjadi dua bronkus (bronkus kanan dan kiri), yang kemudian bercabang halus menjadi bronkiolus menuju alveolus.",
        topicTag: "Biologi SMA: Saluran Pernapasan"
    },
    {
        id: "Q3_THERMO",
        patientId: "patient_3",
        tool: "thermometer",
        toolName: "Termometer & Skrining Vitals",
        stageTitle: "Suhu & Mekanisme Batuk",
        context: "Suhu tubuh Kurimanju 36.9°C (stabil). Namun reflek batuk Kurimanju terus terjadi berulang kali.",
        question: "Secara biologis, apakah fungsi utama dari refleks batuk saat saluran napas kemasukan debu atau asap?",
        options: [
            "Mendinginkan udara di dalam rongga dada",
            "Mengeluarkan partikel asing, kotoran, atau lendir dari saluran pernapasan",
            "Menurunkan kadar oksigen dalam darah",
            "Menghentikan denyut jantung sementara"
        ],
        correctIndex: 1,
        hint: "Refleks pertahanan mekanik untuk membersihkan jalan napas agar tidak tersumbat kotoran.",
        explanation: "YAHA! Hebat! Batuk adalah refleks protektif tubuh yang mendorong udara keluar dengan kecepatan tinggi untuk membersihkan partikel asing dan lendir dari saluran pernapasan.",
        topicTag: "Biologi SMA: Mekanisme Pertahanan Paru"
    },
    {
        id: "Q3_BLOOD",
        patientId: "patient_3",
        tool: "bloodLab",
        toolName: "Lab Darah & Analisis Gas",
        stageTitle: "Pengukuran Saturasi O2 & CO2",
        context: "Saturasi oksigen Kurimanju terukur 90% (rendah) karena udara sulit mencapai kantung udara di ujung paru-paru.",
        question: "Kantung-kantung udara tipis berdinding kapiler di paru-paru yang menjadi tempat terjadinya pertukaran gas O2 dan CO2 disebut...",
        options: [
            "Alveolus",
            "Glomerulus",
            "Nefron",
            "Pleura"
        ],
        correctIndex: 0,
        hint: "Bentuknya bergerombol mirip untaian buah anggur di ujung bronkiolus.",
        explanation: "YAHA! Betul sekali! Alveolus adalah tempat terjadinya pertukaran gas secara difusi antara oksigen udara dan karbon dioksida kapiler darah.",
        topicTag: "Biologi SMA: Pertukaran Gas Alveolus"
    },
    {
        id: "Q3_MICROSCOPE",
        patientId: "patient_3",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Pengamatan Epitel Bersilia Saluran Napas",
        context: "Dokter Usagi memeriksa sampel apusan dinding trakea Kurimanju di bawah mikroskop.",
        question: "Jaringan epitel pada saluran trakea dan bronkus memiliki rambut-rambut getar halus yang berfungsi menyapu debu keluar. Rambut getar halus ini dinamakan...",
        options: [
            "Vili",
            "Silia",
            "Flagela",
            "Pseudopodia"
        ],
        correctIndex: 1,
        hint: "Jaringan epitel silindris bersilia bergerak searah ke atas menuju tenggorokan.",
        explanation: "YAHA! URA! Tepat! Silia pada epitel saluran napas berdenyut secara ritmis untuk menggerakkan lendir yang menangkap kotoran ke arah atas faring untuk dibatukkan atau ditelan.",
        topicTag: "Biologi SMA: Jaringan Epitel Bersilia"
    },
    {
        id: "Q3_TREATMENT",
        patientId: "patient_3",
        tool: "treatment",
        toolName: "Resep Obat Dokter Usagi",
        stageTitle: "Resep Terapi Sesak Napas Kurimanju",
        context: "Saluran bronkiolus Kurimanju mengalami penyempitan otot polos (bronkokonstriksi). Dokter Usagi harus memberikan obat pelega saluran napas.",
        question: "Alat pengobatan hirup yang berfungsi melebarkan otot polos bronkiolus agar aliran oksigen ke alveolus lancar kembali dinamakan...",
        options: [
            "Inhaler Bronkodilator",
            "Plester Luka",
            "Obat Tetes Mata",
            "Salep Gatal"
        ],
        correctIndex: 0,
        hint: "Obat hirup yang disemprotkan langsung ke mulut untuk merelaksasi saluran napas.",
        explanation: "YAHA! PULULU! Inhaler Bronkodilator akan merelaksasi otot bronkus secara instan! Segera jalan ke Ruangan Obat dan ambilkan Inhaler Bronkodilator untuk Kurimanju!",
        topicTag: "Biologi SMA: Terapi Sistem Respirasi"
    },

    // =========================================================================
    // KASUS 4: Momonga - Gejala: Demam, Bersin, Pilek (Sistem Imun & Leukosit)
    // =========================================================================
    {
        id: "Q4_STETH",
        patientId: "patient_4",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Pemeriksaan Pernapasan & Nadi Momonga",
        context: "Momonga bersin-bersin manja saat stetoskop dingin Dokter Usagi menyentuh dadanya. Denyut nadinya agak cepat seiring naiknya suhu tubuh.",
        question: "Mengapa denyut nadi dan aliran darah manusia cenderung meningkat saat sedang mengalami demam infeksi?",
        options: [
            "Agar kuman bakteri cepat menyebar ke otak",
            "Untuk mempercepat distribusi sel darah putih dan antibodi ke lokasi peradangan",
            "Karena jantung kehabisan cairan plasma darah",
            "Agar tubuh tidak bisa berkeringat"
        ],
        correctIndex: 1,
        hint: "Sirkulasi yang lebih cepat membantu sel pertahanan tubuh tiba di tempat infeksi dengan segera.",
        explanation: "YAHA! Pintar! Denyut nadi meningkat untuk mempercepat transportasi sel-sel leukosit dan antibodi menuju jaringan yang terinfeksi bakteri atau virus.",
        topicTag: "Biologi SMA: Fisiologi Respon Imun"
    },
    {
        id: "Q4_THERMO",
        patientId: "patient_4",
        tool: "thermometer",
        toolName: "Termometer & Skrining Demam",
        stageTitle: "Pengukuran Suhu Demam Momonga",
        context: "Termometer menunjukkan suhu tubuh Momonga mencapai 39.1°C! Momonga merasa hangat dan kepalanya pening.",
        question: "Demam pada hakikatnya merupakan respon alami sistem kekebalan tubuh yang bertujuan untuk...",
        options: [
            "Menghambat perkembangbiakan mikroorganisme patogen dan memacu kerja sel imun",
            "Membuat seluruh sel tubuh mati bersamaan",
            "Menghentikan kerja enzim pencernaan selamanya",
            "Mencegah pembentukan sel darah merah baru"
        ],
        correctIndex: 0,
        hint: "Bakteri dan virus sulit berkembang biak pada suhu yang lebih tinggi, sementara sel imun bekerja lebih gesit.",
        explanation: "YAHA! Benar sekali! Demam memicu lingkungan yang tidak ramah bagi replikasi kuman patogen sekaligus meningkatkan aktivitas fagositosis sel darah putih.",
        topicTag: "Biologi SMA: Mekanisme Demam & Homeostasis"
    },
    {
        id: "Q4_BLOOD",
        patientId: "patient_4",
        tool: "bloodLab",
        toolName: "Lab Darah & Hitung Sel Imun",
        stageTitle: "Analisis Sel Darah Putih (Leukosit)",
        context: "Hasil laboratorium menunjukkan jumlah sel darah putih Momonga melonjak tinggi (leukositosis) menandakan tubuh sedang berperang melawan bakteri.",
        question: "Komponen sel darah manusia yang berfungsi utama melawan patogen kuman penyakit dan membentuk antibodi adalah...",
        options: [
            "Eritrosit (Sel Darah Merah)",
            "Trombosit (Keping Darah)",
            "Leukosit (Sel Darah Putih)",
            "Plasma Darah tanpa sel"
        ],
        correctIndex: 2,
        hint: "Sel darah yang memiliki inti sel dan mampu bergerak secara ameboid menembus dinding kapiler.",
        explanation: "YAHA! URA! Tepat! Leukosit (sel darah putih) seperti neutrofil, limfosit, dan makrofag adalah tentara pertahanan tubuh yang membasmi bibit penyakit.",
        topicTag: "Biologi SMA: Sistem Kekebalan Tubuh"
    },
    {
        id: "Q4_MICROSCOPE",
        patientId: "patient_4",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Pengamatan Proses Fagositosis",
        context: "Melalui lensa mikroskop, Dokter Usagi melihat sel leukosit sedang menjulurkan membran selnya untuk menelan bakteri patogen.",
        question: "Proses penelanan dan penghancuran partikel kuman/bakteri oleh sel darah putih dinamakan...",
        options: [
            "Pinosis",
            "Fagositosis",
            "Osmosis",
            "Plasmolisis"
        ],
        correctIndex: 1,
        hint: "Berasal dari kata 'phago' yang berarti memakan sel kuman.",
        explanation: "YAHA! Benar! Fagositosis adalah kemampuan sel leukosit (seperti makrofag dan neutrofil) untuk menelan patogen lalu mencernanya dengan enzim lisosom.",
        topicTag: "Biologi SMA: Mekanisme Pertahanan Non-Spesifik"
    },
    {
        id: "Q4_TREATMENT",
        patientId: "patient_4",
        tool: "treatment",
        toolName: "Resep Obat Dokter Usagi",
        stageTitle: "Resep Terapi Imunitas Momonga",
        context: "Momonga membutuhkan terapi yang memperkuat pertahanan leukosit sekaligus membantu menyingkirkan bakteri patogen penyebab demamnya.",
        question: "Zat pendukung kekebalan tubuh yang sering dikonsumsi untuk membantu melindungi sel imun dari stres oksidatif dan memacu pembentukan antibodi adalah...",
        options: [
            "Vitamin C & Kapsul Imunomodulator",
            "Pewarna Makanan Buatan",
            "Cairan Minyak Tanah",
            "Gula Pasir Pekat"
        ],
        correctIndex: 0,
        hint: "Vitamin larut air yang banyak terkandung pada buah jeruk dan jambu biji.",
        explanation: "YAHA! PULULU! Vitamin C dan imunomodulator sangat ampuh menyokong kerja leukosit! Cepat jalan ke Ruang Obat dan ambil Kapsul Imunomodulator & Vitamin Imun untuk Momonga!",
        topicTag: "Biologi SMA: Nutrisi Sistem Imun"
    },

    // =========================================================================
    // KASUS 5: Rakko - Gejala: Kram Otot, Lelah Ekstrem (Metabolisme & Otot)
    // =========================================================================
    {
        id: "Q5_STETH",
        patientId: "patient_5",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Auskultasi Pernapasan Dalam Rakko",
        context: "Dokter Usagi mendengarkan napas Rakko yang masih terengah dalam setelah latihan pedang berat nonstop seharian.",
        question: "Mengapa atlet atau seseorang yang baru saja selesai berolahraga berat tetap bernapas dalam dan cepat selama beberapa saat?",
        options: [
            "Untuk membuang semua air di dalam darah",
            "Untuk melunasi 'utang oksigen' guna mengoksidasi timbunan asam laktat di hati dan otot",
            "Karena paru-parunya mengecil menjadi separuh ukuran",
            "Untuk menghentikan pembentukan glukosa"
        ],
        correctIndex: 1,
        hint: "Istilah biologinya adalah 'oxygen debt' (utang oksigen) setelah respirasi anaerob di otot.",
        explanation: "YAHA! Betul sekali! Napas terengah setelah aktivitas berat bertujuan menyuplai oksigen untuk menguraikan timbunan asam laktat kembali menjadi asam piruvat di hati.",
        topicTag: "Biologi SMA: Metabolisme & Utang Oksigen"
    },
    {
        id: "Q5_THERMO",
        patientId: "patient_5",
        tool: "thermometer",
        toolName: "Termometer & Suhu Otot",
        stageTitle: "Pemeriksaan Suhu & Energi Panas",
        context: "Suhu tubuh Rakko terukur 37.4°C dan otot pahanya teraba sangat hangat setelah latihan berat.",
        question: "Ketika sel-sel otot berkontraksi menggunakan energi ATP, sebagian besar energi tersebut dilepaskan dalam bentuk apa?",
        options: [
            "Energi Cahaya",
            "Energi Panas (Kalor)",
            "Energi Nuklir",
            "Energi Gravitasi"
        ],
        correctIndex: 1,
        hint: "Itulah sebabnya tubuh kita merasa gerah dan berkeringat saat berolahraga.",
        explanation: "YAHA! Tepat! Efisiensi energi otot sekitar 20-25% untuk kerja mekanik, sedangkan sisanya dilepaskan sebagai energi panas yang membantu memelihara suhu tubuh.",
        topicTag: "Biologi SMA: Termoregulasi & Kontraksi Otot"
    },
    {
        id: "Q5_BLOOD",
        patientId: "patient_5",
        tool: "bloodLab",
        toolName: "Lab Darah & Laktat",
        stageTitle: "Analisis Penumpukan Asam Laktat",
        context: "Pemeriksaan darah Rakko menunjukkan kadar Asam Laktat yang tinggi akibat otot bekerja dalam kondisi kekurangan pasokan oksigen sementara.",
        question: "Zat kimia apakah yang menumpuk di serat otot dan menyebabkan rasa pegal, linu, serta kelelahan saat otot berespirasi secara anaerob?",
        options: [
            "Asam Laktat",
            "Asam Sitrat",
            "Alkohol Etanol",
            "Asam Klorida"
        ],
        correctIndex: 0,
        hint: "Produk sampingan fermentasi asam di sel otot hewan/manusia saat oksigen minim.",
        explanation: "YAHA! Benar! Ketika suplai O2 tidak mencukupi, sel otot melakukan fermentasi asam laktat dari asam piruvat untuk meregenerasi NAD+, yang menghasilkan asam laktat pemicu rasa lelah dan kram.",
        topicTag: "Biologi SMA: Respirasi Anaerob"
    },
    {
        id: "Q5_MICROSCOPE",
        patientId: "patient_5",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Pengamatan Organel Sel Otot (Mitokondria)",
        context: "Dokter Usagi mengamati preparat serat otot di bawah mikroskop elektron/cahaya perbesaran tinggi.",
        question: "Organel seluler berbentuk lonjong yang dijuluki sebagai 'the powerhouse of the cell' karena menghasilkan energi (ATP) melalui respirasi aerob adalah...",
        options: [
            "Badan Golgi",
            "Mitokondria",
            "Lisosom",
            "Ribosom"
        ],
        correctIndex: 1,
        hint: "Organel ini memiliki membran ganda dengan lekukan krista untuk rantai transpor elektron.",
        explanation: "YAHA! URA! Tepat sekali! Mitokondria adalah pusat pembentukan energi ATP melalui siklus Krebs dan rantai transpor elektron yang sangat melimpah di sel otot.",
        topicTag: "Biologi SMA: Organel Sel & Bioenergetika"
    },
    {
        id: "Q5_TREATMENT",
        patientId: "patient_5",
        tool: "treatment",
        toolName: "Resep Obat Dokter Usagi",
        stageTitle: "Resep Terapi Kram Otot Rakko",
        context: "Rakko memerlukan asupan sumber energi cepat dan mineral magnesium untuk membantu relaksasi serat otot dan mengurai timbunan asam laktat.",
        question: "Kombinasi nutrisi manakah yang paling efektif memulihkan cadangan energi seluler (glikogen) serta merelaksasi otot yang kram?",
        options: [
            "Gel Glukosa & Mineral Magnesium",
            "Cuka Asam Pekat",
            "Serbuk Kapur Tulis",
            "Minyak Goreng Sawit"
        ],
        correctIndex: 0,
        hint: "Glukosa untuk pembentukan energi kembali, dan magnesium untuk relaksasi filamen aktin-miosin.",
        explanation: "YAHA! PULULU! Glukosa dan magnesium akan memulihkan tenaga Rakko dalam sekejap! Ayo segera pergi ke Ruang Obat dan ambilkan Gel Glukosa & Magnesium Relaksasi Otot!",
        topicTag: "Biologi SMA: Terapi Pemulihan Otot"
    },

    // =========================================================================
    // KASUS 6: Shisa - Gejala: Haus Ekstrem, Dehidrasi, Urine Pekat (Sistem Ekskresi)
    // =========================================================================
    {
        id: "Q6_STETH",
        patientId: "patient_6",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Auskultasi & Tekanan Darah Shisa",
        context: "Dokter Usagi memeriksa detak nadi dan tekanan darah Shisa. Tekanan darahnya sedikit turun karena volume cairan tubuhnya menyusut drastis.",
        question: "Komponen terbesar penyusun plasma darah manusia adalah air dengan persentase sekitar...",
        options: [
            "Sekitar 10% - 20%",
            "Sekitar 40% - 50%",
            "Sekitar 90% - 92%",
            "Kurang dari 5%"
        ],
        correctIndex: 2,
        hint: "Lebih dari sembilan puluh persen plasma darah adalah air pelarut nutrisi dan ion tubuh.",
        explanation: "YAHA! Tepat sekali! Plasma darah tersusun dari sekitar 90-92% air, sedangkan sisanya adalah protein plasma (albumin, globulin, fibrinogen), garam mineral, dan zat makanan terlarut.",
        topicTag: "Biologi SMA: Komposisi Cairan Tubuh"
    },
    {
        id: "Q6_THERMO",
        patientId: "patient_6",
        tool: "thermometer",
        toolName: "Termometer & Keseimbangan Panas",
        stageTitle: "Pemeriksaan Suhu & Penguapan Keringat",
        context: "Suhu tubuh Shisa agak tinggi (37.8°C) karena tubuhnya kekurangan cairan untuk menghasilkan keringat pendingin.",
        question: "Organ ekskresi manusia yang mengeluarkan sisa metabolisme berupa air, garam, dan urea melalui kelenjar keringat untuk mengatur suhu tubuh adalah...",
        options: [
            "Kulit (Integumen)",
            "Paru-paru",
            "Usus buntu",
            "Jantung"
        ],
        correctIndex: 0,
        hint: "Organ terluar yang melapisi seluruh permukaan tubuh manusia.",
        explanation: "YAHA! Betul! Kulit mengekskresikan keringat melalui kelenjar sudorifera. Penguapan keringat di permukaan kulit menyerap panas sehingga mendinginkan suhu tubuh.",
        topicTag: "Biologi SMA: Sistem Ekskresi Kulit"
    },
    {
        id: "Q6_BLOOD",
        patientId: "patient_6",
        tool: "bloodLab",
        toolName: "Lab Darah & Osmolaritas",
        stageTitle: "Analisis Kepekatan Darah & Hormon ADH",
        context: "Darah Shisa sangat pekat karena kehilangan air. Kelenjar hipofisis otak Shisa merespons dengan memproduksi hormon khusus.",
        question: "Hormon apakah yang disekresikan hipofisis posterior untuk memerintahkan ginjal menyerap kembali air sehingga urine menjadi pekat saat tubuh dehidrasi?",
        options: [
            "Hormon Insulin",
            "Hormon ADH (Antidiuretik) / Vasopresin",
            "Hormon Adrenalin",
            "Hormon Tiroksin"
        ],
        correctIndex: 1,
        hint: "Singkatannya adalah ADH, bekerja melawan diuresis (pengeluaran urine berlebih).",
        explanation: "YAHA! URA! Tepat! Hormon ADH (Antidiuretic Hormone) merangsang tubulus ginjal menyerap kembali air ke dalam darah, sehingga mencegah dehidrasi lebih parah dan membuat urine lebih pekat.",
        topicTag: "Biologi SMA: Regulasi Hormon Ginjal (ADH)"
    },
    {
        id: "Q6_MICROSCOPE",
        patientId: "patient_6",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Pengamatan Nefron Ginjal",
        context: "Dokter Usagi mengamati preparat irisan korteks dan medula ginjal di bawah mikroskop.",
        question: "Unit fungsional terkecil di dalam ginjal yang bertugas menyaring darah menghasilkan urine melalui filtrasi, reabsorpsi, dan augmentasi dinamakan...",
        options: [
            "Neuron",
            "Nefron",
            "Alveolus",
            "Mielin"
        ],
        correctIndex: 1,
        hint: "Hati-hati jangan tertukar dengan neuron (sel saraf). Unit ginjal berawalan huruf 'N' dan berakhiran 'on'.",
        explanation: "YAHA! Benar! Setiap ginjal manusia memiliki sekitar 1 juta nefron. Tiap nefron terdiri dari glomerulus, kapsula Bowman, tubulus proksimal, lengkung Henle, dan tubulus distal.",
        topicTag: "Biologi SMA: Struktur Nefron Ginjal"
    },
    {
        id: "Q6_TREATMENT",
        patientId: "patient_6",
        tool: "treatment",
        toolName: "Resep Obat Dokter Usagi",
        stageTitle: "Resep Terapi Rehidrasi Shisa",
        context: "Shisa harus segera direhidrasi dengan cairan yang mengandung air, garam mineral (natrium, kalium), dan sedikit glukosa agar keseimbangan osmotik selnya pulih.",
        question: "Larutan rehidrasi yang paling tepat dan terbukti cepat memulihkan cairan tubuh dan ion elektrolit pada pasien dehidrasi adalah...",
        options: [
            "Larutan Oralit / Cairan Elektrolit Isotonik",
            "Air Sabun Wangi",
            "Kecap Manis Kental",
            "Minyak Goreng Kelapa"
        ],
        correctIndex: 0,
        hint: "Campuran garam dapur, gula, dan air yang mudah diserap usus untuk mengembalikan ion elektrolit tubuh.",
        explanation: "YAHA! PULULU! Larutan Oralit dan Elektrolit adalah penolong utama dehidrasi! Ayo segera jalan ke Ruangan Obat dan ambilkan Larutan Oralit & Elektrolit untuk Shisa!",
        topicTag: "Biologi SMA: Osmoregulasi & Cairan Oralit"
    }
];

// Helper functions for question retrieving
function getQuestionsForPatient(patientId) {
    return BIOLOGY_QUESTIONS.filter(q => q.patientId === patientId);
}

function getQuestionForPatientAndTool(patientId, toolType) {
    return BIOLOGY_QUESTIONS.find(q => q.patientId === patientId && q.tool === toolType);
}

// Export to window
if (typeof window !== 'undefined') {
    window.BIOLOGY_QUESTIONS = BIOLOGY_QUESTIONS;
    window.getQuestionsForPatient = getQuestionsForPatient;
    window.getQuestionForPatientAndTool = getQuestionForPatientAndTool;
}

