/**
 * Biology Champions - Bank Soal Biologi SMA (Senior High School)
 * Terintegrasi dengan interaksi alat medis dan kasus pasien di rumah sakit
 */

const BIOLOGY_QUESTIONS = [
    // =========================================================================
    // KASUS 1: Pak Budi (52 th) - Gejala: Sangat Lemas, Wajah Pucat, Mudah Lelah
    // Topik: Sistem Sirkulasi, Eritrosit, Hemoglobin, & Metabolisme Zat Besi
    // =========================================================================
    {
        id: "Q1_STETH",
        patientId: "patient_1",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Auskultasi Detak Jantung & Aliran Darah",
        context: "Saat meletakkan stetoskop di dada Pak Budi, terdengar denyut jantung takikardia (sangat cepat) karena jantung berusaha memompa darah lebih banyak untuk memenuhi kebutuhan oksigen jaringan.",
        question: "Mengapa penurunan jumlah sel darah merah (eritrosit) atau kadar hemoglobin (Hb) secara langsung menyebabkan tubuh merasa cepat lelah dan napas terengah-engah?",
        options: [
            "Kekurangan eritrosit menurunkan produksi hormon adrenalin dalam kelenjar adrenal",
            "Hemoglobin mengikat ion Fe2+ yang berfungsi mengikat O2; defisiensinya menurunkan suplai O2 ke mitokondria untuk respirasi aerob (pembentukan ATP)",
            "Kekurangan eritrosit menyebabkan penurunan volume plasma darah sehingga tekanan osmotik darah runtuh seketika",
            "Hemoglobin berfungsi memecah glukosa langsung dalam pembuluh darah vena cava"
        ],
        correctIndex: 1,
        hint: "Ingat fungsi gugus Heme dengan ion besi (Fe2+) serta peran oksigen sebagai akseptor elektron terakhir dalam fosforilasi oksidatif.",
        explanation: "Hemoglobin tersusun dari 4 subunit globin dengan gugus heme yang mengandung ion Fe2+ untuk mengikat gas O2 membentuk oksihemoglobin (HbO2). Penurunan Hb menyebabkan hipoksia jaringan, sehingga mitokondria sel kekurangan oksigen untuk memproduksi ATP melalui rantai transpor elektron, memicu rasa lelah ekstrem.",
        topicTag: "Sistem Sirkulasi & Bioenergetika"
    },
    {
        id: "Q1_THERMO",
        patientId: "patient_1",
        tool: "thermometer",
        toolName: "Termometer & Skrining Vitals",
        stageTitle: "Pemeriksaan Suhu & Perfusi Perifer",
        context: "Suhu tubuh Pak Budi normal (36.4°C), namun ujung jari-jari tangan dan kakinya terasa sangat dingin saat disentuh.",
        question: "Ujung ekstremitas dingin pada pasien anemia disebabkan oleh mekanisme kompensasi vaskular berupa...",
        options: [
            "Vasodilatasi kapiler perifer untuk membuang panas tubuh",
            "Vasokonstriksi pembuluh darah perifer guna memprioritaskan suplai darah beroksigen ke organ vital (otak dan jantung)",
            "Peningkatan laju filtrasi glomerulus oleh hormon aldosteron",
            "Pembekuan darah spontan oleh trombosit di arteriol tangan"
        ],
        correctIndex: 1,
        hint: "Pikirkan bagaimana tubuh mengalihkan aliran darah dari kulit ke organ utama saat oksigen minim.",
        explanation: "Ketika terjadi hipoksia akibat anemia, sistem saraf simpatis memicu vasokonstriksi arteriol perifer di kulit dan ekstremitas. Hal ini mengarahkan aliran darah kaya oksigen menuju organ vital seperti otak, jantung, dan ginjal.",
        topicTag: "Homeostasis & Fisiologi Kardiovaskular"
    },
    {
        id: "Q1_BLOOD",
        patientId: "patient_1",
        tool: "bloodLab",
        toolName: "Pemeriksaan Lab Darah",
        stageTitle: "Analisis Hematologi Darah Lengkap",
        context: "Hasil laboratorium menunjukkan kadar Hb hanya 6.8 g/dL (normal: 13-17 g/dL) dan kadar eritropoietin darah sangat tinggi.",
        question: "Organ tubuh manakah yang mendeteksi hipoksia renal dan meresponsnya dengan mensekresikan hormon eritropoietin (EPO) untuk merangsang eritropoiesis?",
        options: [
            "Hati (Hepar) melalui sel Kupffer",
            "Pankreas melalui sel alfa Langerhans",
            "Ginjal melalui sel interstisial peritubular korteks",
            "Limpa (Lien) melalui pulpa merah"
        ],
        correctIndex: 2,
        hint: "Organ penyaring darah yang mengekskresikan urine juga memproduksi hormon pemicu sel darah merah di sumsum tulang.",
        explanation: "Ginjal merupakan sensor utama kadar oksigen darah. Saat terjadi hipoksia jaringan, sel interstisial peritubular di korteks ginjal memproduksi hormon eritropoietin (EPO), yang bersirkulasi menuju sumsum merah tulang (bone marrow) untuk memacu pembelahan dan diferensiasi sel punca eritroid.",
        topicTag: "Sistem Endokrin & Hematopoiesis"
    },
    {
        id: "Q1_MICROSCOPE",
        patientId: "patient_1",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Observasi Apusan Darah Tepi",
        context: "Kamu meletakkan slide darah Pak Budi di bawah lensa objektif 100x dengan minyak imersi. Tampak eritrosit berukuran sangat kecil (mikrositik) dan tampak pucat di bagian tengahnya (hipokromik).",
        question: "Eritrosit matang pada mamalia manusia tidak memiliki inti sel (enukleasi) dan mitokondria. Keuntungan fisiologis dari hilangnya kedua organel tersebut adalah...",
        options: [
            "Memaksimalkan ruang untuk menampung molekul hemoglobin serta mencegah eritrosit mengonsumsi sendiri oksigen yang diangkutnya",
            "Membuat eritrosit dapat membelah secara meiosis saat berada di pembuluh kapiler",
            "Memungkinkan sintesis protein hemoglobin baru secara terus-menerus selama 120 hari masa hidupnya",
            "Membantu eritrosit menghasilkan energi melalui siklus Krebs tanpa menggunakan glukosa"
        ],
        correctIndex: 0,
        hint: "Jika sel memiliki mitokondria, sel itu akan menggunakan oksigen yang dibawanya. Dan tanpa nukleus, ruang sitoplasma menjadi jauh lebih lapang!",
        explanation: "Eritrosit mamalia mengalami enukleasi saat matang agar sitoplasma dapat diisi maksimal oleh sekitar 270 juta molekul hemoglobin per sel. Ketiadaan mitokondria memastikan eritrosit hanya mengandalkan glikolisis anaerobik, sehingga tidak 'mencuri' oksigen yang harus diantarkan ke jaringan tubuh.",
        topicTag: "Biologi Sel & Morfologi Darah"
    },
    {
        id: "Q1_TREATMENT",
        patientId: "patient_1",
        tool: "treatment",
        toolName: "Preskripsi & Terapi",
        stageTitle: "Formulasi Terapi & Suplementasi",
        context: "Pak Budi didiagnosis menderita Anemia Defisiensi Besi berat. Kamu harus memberikan resep dan edukasi nutrisi biologi yang tepat.",
        question: "Vitamin apa yang paling krusial dikonsumsi bersamaan dengan suplemen zat besi untuk meningkatkan absorbsi ion besi di usus halus (duodenum), dan mengapa?",
        options: [
            "Vitamin A, karena menguraikan ikatan heme menjadi bilirubin di lambung",
            "Vitamin C (asam askorbat), karena mereduksi ion feri (Fe3+) menjadi fero (Fe2+) yang jauh lebih mudah diserap oleh enterosit usus",
            "Vitamin K, karena merangsang sintesis protrombin dan fibrinogen dalam darah",
            "Vitamin D, karena mengikat kalsium dan ion besi menjadi senyawa garam empedu"
        ],
        correctIndex: 1,
        hint: "Asam askorbat bertindak sebagai reduktor kuat di lumen saluran pencernaan.",
        explanation: "Zat besi non-heme dalam makanan sering berupa Fe3+ (feri) yang sukar diserap. Vitamin C (asam askorbat) bertindak sebagai agen pereduksi yang mengubah Fe3+ menjadi Fe2+ (fero) serta membentuk kelat terlarut yang mudah ditransportasikan oleh protein DMT1 (Divalent Metal Transporter 1) pada membran mikrovili enterosit duodenum.",
        topicTag: "Nutrisi & Biokimia Pencernaan"
    },

    // =========================================================================
    // KASUS 2: Adik Citra (16 th) - Gejala: Demam Tinggi (39.2°C), Radang Tenggorokan, Kelenjar Getah Bening Leher Bengkak
    // Topik: Sistem Imun, Patogen (Bakteri vs Virus), Leukosit, Antibodi
    // =========================================================================
    {
        id: "Q2_THERMO",
        patientId: "patient_2",
        tool: "thermometer",
        toolName: "Termometer & Skrining Demam",
        stageTitle: "Pengukuran Hipertermia & Respon Imun",
        context: "Suhu tubuh Adik Citra mencapai 39.2°C. Dia menggigil dan kulitnya memerah.",
        question: "Mekanisme biologis apa yang memicu kenaikan titik patokan suhu (*set point*) pada hipotalamus saat tubuh mengalami infeksi?",
        options: [
            "Pelepasan sitokin pirogen (seperti IL-1, TNF-α) oleh makrofag yang merangsang sintesis prostaglandin E2 (PGE2) di hipotalamus",
            "Penurunan laju metabolisme basal oleh hormon tiroksin kelenjar tiroid",
            "Kerusakan permanen pada medula oblongata akibat toksin bakteri",
            "Penutupan total pembuluh darah aorta oleh fibrin pembeku darah"
        ],
        correctIndex: 0,
        hint: "Pirogen berasal dari bahasa Yunani 'piro' (api/panas) dan 'gen' (penghasil), dimediasi oleh mediator lipid PGE2.",
        explanation: "Saat fagosit (makrofag dan neutrofil) mengenali antigen patogen melalui TLR (Toll-Like Receptors), mereka melepaskan sitokin pirogen endogen (interleukin-1, IL-6, dan TNF-α). Sitokin ini bersirkulasi ke hipotalamus dan memicu sintesis prostaglandin E2 (PGE2), yang menaikkan set-point termostat tubuh sehingga timbul demam sebagai strategi menghambat replikasi mikroorganisme.",
        topicTag: "Sistem Imun & Termoregulasi"
    },
    {
        id: "Q2_STETH",
        patientId: "patient_2",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Pemeriksaan Pembesaran Kelenjar Limfa",
        context: "Dengan palpasi dan auskultasi leher, teraba nodus limfa (kelenjar getah bening) servikal yang membengkak dan nyeri tekan.",
        question: "Pembengkakan nodus limfa (*limfadenopati*) saat infeksi terjadi akibat peristiwa biologis...",
        options: [
            "Pengendapan kristal asam urat pada pembuluh limfatik leher",
            "Proliferasi dan aktivasi cepat limfosit T dan B serta akumulasi makrofag yang memfagositosis patogen di dalam nodus",
            "Kebocoran cairan empedu dari kantung empedu menuju kelenjar leher",
            "Penumpukan eritrosit yang mengalami hemolisis di dalam pembuluh kil"
        ],
        correctIndex: 1,
        hint: "Nodus limfa adalah markas seleksi dan perbanyakan sel pertahanan tubuh adaptif!",
        explanation: "Nodus limfa berfungsi sebagai filter biologis cairan limfa. Ketika antigen patogen terbawa ke nodus limfa oleh sel dendritik, sel limfosit T dan limfosit B spesifik mengalami seleksi klonal dan proliferasi (pembelahan masif) di pusat germinal (germinal center), disertai akumulasi makrofag fagositik sehingga nodus membengkak secara fisiologis.",
        topicTag: "Sistem Limfatik & Imunitas Spesifik"
    },
    {
        id: "Q2_BLOOD",
        patientId: "patient_2",
        tool: "bloodLab",
        toolName: "Pemeriksaan Lab Darah",
        stageTitle: "Hitung Jenis Leukosit (Differential Count)",
        context: "Hasil laboratorium menunjukkan leukositosis (18.500 /µL, normal: 5.000-10.000 /µL) dengan dominasi neutrofil bersegmen (shift to the left).",
        question: "Berdasarkan dominasi leukosit bergranula jenis neutrofil, diagnosis biologi apa yang paling mungkin dialami Citra?",
        options: [
            "Infeksi cacing parasit (helmintiasis) yang biasanya ditandai oleh lonjakan eosinofil",
            "Alergi serbuk sari musiman yang dipicu degranulasi histamin oleh sel mast dan basofil",
            "Infeksi bakteri akut, karena neutrofil adalah garis pertahanan pertama fagositosis yang dikerahkan dalam jumlah masif",
            "Infeksi retrovirus kronis yang spesifik merusak sel T-CD4+"
        ],
        correctIndex: 2,
        hint: "Neutrofil adalah pasukan garda terdepan penumpas bakteri yang membentuk nanah (pus).",
        explanation: "Neutrofil merupakan sel leukosit polimorfonuklear (PMN) terbanyak dalam darah normal dan merupakan responder pertama terhadap infeksi bakteri. Fenomena 'shift to the left' menandakan sumsum tulang melepaskan bentuk neutrofil muda (stab/band) untuk melawan invasi bakteri akut secara cepat melalui fagositosis dan NETosis.",
        topicTag: "Hematologi & Respon Imun Bawaan"
    },
    {
        id: "Q2_MICROSCOPE",
        patientId: "patient_2",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Pewarnaan Gram Swab Tenggorokan",
        context: "Sampel apusan tenggorokan diwarnai Gram dan diamati di bawah mikroskop: terlihat bakteri berbentuk kokus beruntai seperti rantai berwarna ungu (Gram positif).",
        question: "Dinding sel bakteri Gram-positif berwarna ungu saat pewarnaan kristal violet karena memiliki karakteristik struktur...",
        options: [
            "Lapisan peptidoglikan yang sangat tebal tanpa membran luar lipopolisakarida (LPS)",
            "Lapisan peptidoglikan tipis yang diapit oleh dua lapis membran fosfolipid ganda",
            "Dinding sel yang seluruhnya tersusun dari selulosa dan pektin seperti dinding sel tumbuhan",
            "Ketiadaan dinding sel sehingga zat warna langsung mewarnai materi genetik plasmid"
        ],
        correctIndex: 0,
        hint: "Gram positif menahan kompleks kristal violet-iodin karena jerat peptidoglikan tebal tidak larut oleh alkohol dekolorisasi.",
        explanation: "Bakteri Gram-positif (seperti Streptococcus pyogenes pemicu radang tenggorokan) memiliki lapisan peptidoglikan yang tebal (20-80 nm) pada dinding selnya dengan asam teikoat. Struktur ini memerangkap kompleks pewarna kristal violet-iodin sehingga tidak luntur saat dibilas alkohol dan tetap berwarna ungu gelap.",
        topicTag: "Mikrobiologi & Struktur Sel Prokariotik"
    },
    {
        id: "Q2_TREATMENT",
        patientId: "patient_2",
        tool: "treatment",
        toolName: "Preskripsi & Terapi",
        stageTitle: "Pemberian Antibiotik Beta-Laktam",
        context: "Citra diberikan terapi antibiotik golongan Amoksisilin (derivat penisilin). Kamu perlu memverifikasi target molekuler kerja obat ini.",
        question: "Bagaimana mekanisme kerja antibiotik golongan penisilin dalam memusnahkan bakteri tanpa merusak sel tubuh manusia?",
        options: [
            "Mengikat subunit ribosom 60S eukariotik untuk menghambat elongasi translasi protein",
            "Menghambat enzim transpeptidase yang membentuk ikatan silang peptidoglikan dinding sel bakteri; sel manusia tidak terpengaruh karena tidak memiliki dinding sel",
            "Menghancurkan mitokondria bakteri dengan melubangi membran krista",
            "Menggandakan laju mutasi operon laktosa bakteri hingga lisis"
        ],
        correctIndex: 1,
        hint: "Manusia adalah organisme eukariotik bersel hewan tanpa dinding sel. Ini prinsip toksisitas selektif!",
        explanation: "Antibiotik beta-laktam menghambat enzim transpeptidase (Penicillin-Binding Proteins/PBP) yang bertugas menyilangkan rantai peptidoglikan pada pembentukan dinding sel bakteri baru. Kegagalan sintesis dinding sel menyebabkan lisis osmotik pada bakteri. Sel manusia aman karena sel hewan tidak memiliki dinding peptidoglikan (toksisitas selektif).",
        topicTag: "Biologi Molekuler & Farmakologi"
    },

    // =========================================================================
    // KASUS 3: Ibu Ratna (45 th) - Gejala: Sering Haus (Polidipsia), Sering Kencing (Poliuria), Gula Darah Puasa 280 mg/dL
    // Topik: Metabolisme Sel, Hormon Insulin & Glukagon, Respirasi Sel & ATP
    // =========================================================================
    {
        id: "Q3_BLOOD",
        patientId: "patient_3",
        tool: "bloodLab",
        toolName: "Pemeriksaan Lab Darah",
        stageTitle: "Tes Glukosa Darah & HbA1c",
        context: "Glukosa darah sewaktu Ibu Ratna mencapai 310 mg/dL dan HbA1c 9.5% (normal < 5.7%). Pasien didiagnosis Diabetes Mellitus Tipe 2.",
        question: "Pada tingkat molekuler, apa penyebab utama hiperglikemia pada pasien Diabetes Mellitus Tipe 2?",
        options: [
            "Kerusakan otoimun total pada sel beta pankreas sehingga tubuh nol produksi insulin",
            "Resistensi insulin, di mana reseptor insulin pada sel target (otot dan adiposit) gagal memicu translokasi transporter GLUT4 ke membran plasma",
            "Peningkatan berlebihan produksi enzim ptialin di kelenjar ludah parotis",
            "Kegagalan usus menyerap ion natrium yang menghalangi difusi terfasilitasi fruktosa"
        ],
        correctIndex: 1,
        hint: "Insulin diproduksi tapi kunci reseptornya macet sehingga pintu glukosa (GLUT4) tidak terpasang di dinding sel.",
        explanation: "Pada DM Tipe 2, pankreas tetap menghasilkan insulin, namun terjadi resistensi reseptor tirosin kinase pada sel otot rangka dan jaringan adiposa. Akibatnya, kaskade sinyal intraseluler (jalur IRS-1/PI3K/Akt) terganggu, sehingga vesikel penyimpan protein transporter glukosa (GLUT4) tidak ditranslokasikan ke membran sel. Glukosa menumpuk di aliran darah.",
        topicTag: "Biologi Sel & Sinyal Hormon"
    },
    {
        id: "Q3_STETH",
        patientId: "patient_3",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Pemeriksaan Vaskular & Auskultasi Abdomen",
        context: "Ibu Ratna juga mengeluh kram otot saat berjalan dan mudah mengantuk setelah makan makanan berkarbohidrat tinggi.",
        question: "Ketika glukosa tidak dapat masuk ke dalam sel miokardium dan otot rangka, sel akan beralih membakar sumber energi alternatif melalui proses...",
        options: [
            "Beta-oksidasi asam lemak menghasilkan asetil-KoA, yang jika berlebihan memicu pembentukan badan keton",
            "Fotosintesis gelap siklus Calvin di stroma sitoplasma",
            "Fermentasi asam laktat tanpa memerlukan substrat organik apa pun",
            "Pemecahan asam nukleat RNA menjadi pirimidin bebas"
        ],
        correctIndex: 0,
        hint: "Lemak diubah menjadi energi saat glukosa tidak dapat diserap sel, menghasilkan produk samping berupa senyawa keton.",
        explanation: "Karena sel mengalami 'kelaparan di tengah kelimpahan glukosa darah', jaringan adiposa memecah trigliserida menjadi asam lemak bebas. Asam lemak ini mengalami beta-oksidasi di matriks mitokondria menjadi asetil-KoA. Akumulasi asetil-KoA yang melampaui kapasitas siklus Krebs akan diubah oleh hepar menjadi badan keton (asetoasetat, beta-hidroksibutirat, aseton).",
        topicTag: "Metabolisme Lipid & Bioenergetika"
    },
    {
        id: "Q3_MICROSCOPE",
        patientId: "patient_3",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Pemeriksaan Sampel Sedimen Urine",
        context: "Kamu memeriksa sampel urine Ibu Ratna di mikroskop. Uji Benedict menunjukkan warna merah bata pekat (glukosuria positif).",
        question: "Mengapa glukosa bisa ditemukan di dalam urine pasien diabetes, padahal pada orang sehat urine tidak mengandung glukosa?",
        options: [
            "Glukosa disintesis langsung di dalam kandung kemih oleh mikroflora normal",
            "Kadar glukosa filtrat melebihi ambang batas kapasitas transpor maksimum (*transport maximum/Tm*) protein SGLT2 di tubulus kontortus proksimal nefron",
            "Glomerulus mengalami robekan total sehingga protein dan seluruh molekul darah bocor",
            "Hormon antidiuretik (ADH) merangsang ekskresi gula keluar tubuh untuk mengencerkan darah"
        ],
        correctIndex: 1,
        hint: "Protein transpor di tubulus ginjal memiliki batas kapasitas jenuh (sekitar 180 mg/dL).",
        explanation: "Secara fisiologis, 100% glukosa yang difiltrasi di glomerulus diserap kembali (reabsorpsi aktif sekunder) di tubulus kontortus proksimal oleh kotransporter Na+/glukosa (SGLT2). Namun, jika kadar glukosa plasma melampaui nilai ambang ginjal (sekitar 180 mg/dL), kapasitas transporter jenuh sehingga kelebihan glukosa lolos ke urine dan menarik air secara osmosis (poliuria osmotik).",
        topicTag: "Sistem Ekskresi & Fisiologi Ginjal"
    },
    {
        id: "Q3_THERMO",
        patientId: "patient_3",
        tool: "thermometer",
        toolName: "Termometer & Skrining Infeksi",
        stageTitle: "Pemeriksaan Luka Kecil di Kaki",
        context: "Ada luka lecet kecil di jempol kaki Ibu Ratna yang sulit sembuh. Pasien tidak merasa demam, namun jaringan sekitar luka tampak sedikit merah.",
        question: "Mengapa luka pada pasien diabetes mellitus kronis cenderung sangat lambat sembuh dan rentan terkena infeksi bakteri anaerob?",
        options: [
            "Glukosa tinggi merusak sel saraf sensorik (neuropati), menurunkan perfusi mikrovaskular, dan lingkungan hiperglikemia menjadi media subur bagi proliferasi mikroba",
            "Hiperglikemia menghancurkan seluruh keping darah (trombosit) dalam hitungan menit",
            "Sel makrofag berhenti memproduksi lisosom secara genetik permanen",
            "Darah pasien diabetes kehilangan kemampuan membeku karena kalsium darah habis"
        ],
        correctIndex: 0,
        hint: "Kombinasi neuropati diabetik, rusaknya pembuluh darah halus (angiopati), serta makanan manis bagi bakteri.",
        explanation: "Kadar gula darah tinggi yang kronis menyebabkan glikosilasi protein membran (AGEs/Advanced Glycation End-products), merusak endotel pembuluh mikro (mikroangiopati) sehingga suplai oksigen dan leukosit ke luka menurun. Selain itu, neuropati sensorik membuat pasien tidak menyadari trauma fisik, sementara konsentrasi glukosa jaringan yang tinggi menjadi substrat ideal bagi perkembangbiakan kuman.",
        topicTag: "Patologi Jaringan & Sistem Sirkulasi"
    },
    {
        id: "Q3_TREATMENT",
        patientId: "patient_3",
        tool: "treatment",
        toolName: "Preskripsi & Terapi",
        stageTitle: "Edukasi Diet & Mekanisme Olahraga",
        context: "Kamu memberikan edukasi kepada Ibu Ratna mengenai manfaat latihan fisik aerobik rutin 30 menit sehari.",
        question: "Secara biokimia seluler, bagaimana kontraksi otot saat berolahraga dapat menurunkan kadar gula darah tanpa bergantung pada hormon insulin?",
        options: [
            "Kontraksi otot mengaktifkan protein kinase AMPK yang memicu translokasi GLUT4 ke membran sel otot secara independen dari insulin",
            "Olahraga mengubah glukosa langsung menjadi gas karbondioksida di dalam alveolus",
            "Otot mengeluarkan enzim ptialin yang menguraikan glukosa di dalam cairan interstisial",
            "Olahraga menghentikan seluruh proses glikolisis dan siklus Krebs"
        ],
        correctIndex: 0,
        hint: "Jalur aktivasi enzim sensor energi sel AMPK (AMP-activated protein kinase) saat rasio AMP/ATP naik.",
        explanation: "Saat otot berkontraksi, hidrolisis ATP meningkatkan rasio AMP/ATP seluler, mengaktifkan enzim AMPK (AMP-activated protein kinase). Jalur persinyalan AMPK ini mampu memicu eksositosis vesikel transporter GLUT4 ke sarkolema (membran sel otot) secara independen dari jalur reseptor insulin. Inilah mengapa olahraga adalah terapi primer terbaik bagi penderita resistensi insulin.",
        topicTag: "Biologi Molekuler & Fisiologi Olahraga"
    },

    // =========================================================================
    // KASUS 4: Mas Reza (18 th) - Gejala: Sesak Napas Akut, Bunyi Mengi (Wheezing), Batuk Kering Usai Olahraga Lari
    // Topik: Sistem Respirasi, Pertukaran Gas Alveolus, Transpor Bikarbonat, Alergi
    // =========================================================================
    {
        id: "Q4_STETH",
        patientId: "patient_4",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Auskultasi Paru-Paru (Mengi/Wheezing)",
        context: "Kamu menempelkan stetoskop di punggung dan dada Mas Reza. Terdengar suara nada tinggi saat ekspirasi (wheezing) dan laju pernapasan 32 kali per menit (takipnea).",
        question: "Penyempitan lumen saluran pernapasan pada serangan asma bronkial terutama disebabkan oleh kontraksi otot polos pada organ...",
        options: [
            "Trakea dengan cincin tulang rawan hialin",
            "Bronkiolus terminalis dan respiratorius yang tidak dilapisi cincin tulang rawan",
            "Laring di sekitar pita suara",
            "Faring di dekat epiglotis"
        ],
        correctIndex: 1,
        hint: "Saluran percabangan kecil yang tidak lagi disokong oleh cincin tulang rawan keras melainkan dikelilingi otot polos.",
        explanation: "Berbeda dengan trakea dan bronkus utama yang memiliki cincin tulang rawan hialin kaku untuk menjaga patensi lumen, bronkiolus tidak memiliki kartilago dan dindingnya didominasi oleh otot polos sirkular. Pada serangan asma, spasme otot polos bronkiolus (bronkokonstriksi) disertai edema mukosa dan hipersekresi mukus menyempitkan jalan napas.",
        topicTag: "Anatomi & Histologi Sistem Pernapasan"
    },
    {
        id: "Q4_THERMO",
        patientId: "patient_4",
        tool: "thermometer",
        toolName: "Oksimetri & Skrining Vitals",
        stageTitle: "Pengukuran Saturasi Oksigen (SpO2)",
        context: "Sensor oksimetri pada jari Mas Reza menunjukkan SpO2 90% (normal: 95-100%). Kulit tampak sedikit sianosis (kebiruan).",
        question: "Warna kebiruan pada bibir dan kuku (sianosis) saat hipoksemia timbul karena tingginya konsentrasi molekul...",
        options: [
            "Oksihemoglobin (HbO2) yang memantulkan spektrum cahaya biru",
            "Deoksihemoglobin (hemoglobin tereduksi tanpa O2) di kapiler jaringan",
            "Karbaminohemoglobin yang berikatan kuat dengan gas karbon monoksida",
            "Bilirubin bebas hasil perombakan hati"
        ],
        correctIndex: 1,
        hint: "Darah kaya oksigen berwarna merah terang, sedangkan darah miskin oksigen berwarna merah gelap kebiruan.",
        explanation: "Sianosis secara visual tampak ketika kadar deoksihemoglobin (hemoglobin yang tidak berikatan dengan O2) di kapiler darah melebihi 5 g/dL. Oksihemoglobin menyerap cahaya merah dan memantulkan warna merah cerah, sedangkan deoksihemoglobin menyerap spektrum berbeda sehingga tampak kebiruan/gelap melalui dermis kulit tipis.",
        topicTag: "Fisiologi Gas Darah & Hemoglobin"
    },
    {
        id: "Q4_BLOOD",
        patientId: "patient_4",
        tool: "bloodLab",
        toolName: "Pemeriksaan Analisis Gas Darah (AGD)",
        stageTitle: "Keseimbangan Asam Basa & Ion Bikarbonat",
        context: "Hasil AGD menunjukkan pCO2 meningkat dan pH darah sedikit asam (asidosis respiratorik) akibat hipoventilasi.",
        question: "Mayoritas gas karbondioksida (sekitar 70%) diangkut di dalam sistem peredaran darah manusia dalam bentuk...",
        options: [
            "Gas terlarut bebas di dalam sitoplasma trombosit",
            "Senyawa karbaminohemoglobin terikat rantai alfa globin",
            "Ion bikarbonat (HCO3-) di dalam plasma darah setelah dikonversi oleh enzim karbonat anhidrase eritrosit",
            "Kristal asam karbonat padat di dinding pembuluh arteri pulmonalis"
        ],
        correctIndex: 2,
        hint: "Enzim karbonat anhidrase di dalam sel darah merah mengubah CO2 + H2O menjadi H2CO3 yang terdisosiasi menjadi H+ dan HCO3-.",
        explanation: "Sebagian besar CO2 jaringan berdifusi ke dalam eritrosit, di mana enzim karbonat anhidrase mengkatalisis reaksi: CO2 + H2O <-> H2CO3 <-> H+ + HCO3-. Ion bikarbonat (HCO3-) kemudian dipompa keluar eritrosit ke plasma darah melalui fenomena pergeseran klorida (chloride shift) untuk menjaga kenetralan muatan listrik sel.",
        topicTag: "Biokimia Respirasi & Keseimbangan Asam-Basa"
    },
    {
        id: "Q4_MICROSCOPE",
        patientId: "patient_4",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Observasi Sel Alergi & Imunoglobulin E",
        context: "Apusan dahak (sputum) Mas Reza diwarnai Wright-Giemsa dan diamati di bawah mikroskop: terlihat banyak kristal Charcot-Leyden dan sel leukosit bergranula merah-oranye terang.",
        question: "Sel leukosit apakah yang bergranula kemerahan dan bekerja sama dengan antibodi IgE dalam reaksi hipersensitivitas/asma alergi?",
        options: [
            "Eosinofil",
            "Eritrosit",
            "Monosit",
            "Limfosit T sitotoksik"
        ],
        correctIndex: 0,
        hint: "Granulosit yang menyerap pewarna asam eosin sehingga tampak merah/jingga mencolok.",
        explanation: "Eosinofil dicirikan oleh granula sitoplasma refraktil besar yang terwarnai merah-oranye oleh pewarna asam eosin. Pada asma alergi ekstrinsik, sel mast yang dilapisi IgE mengalami degranulasi dan melepaskan faktor kemotaktik eosinofil. Eosinofil bermigrasi ke mukosa bronkus dan melepaskan protein basa mayor (MBP) yang memicu peradangan jaringan epitel.",
        topicTag: "Sistem Imun & Hipersensitivitas Tipe I"
    },
    {
        id: "Q4_TREATMENT",
        patientId: "patient_4",
        tool: "treatment",
        toolName: "Preskripsi & Terapi",
        stageTitle: "Pemberian Inhaler Bronkodilator",
        context: "Kamu segera memberikan inhalasi Salbutamol melalui nebulizer. Napas Mas Reza perlahan lega dan wheezing mereda.",
        question: "Bagaimana mekanisme farmakologi agonis beta-2 adrenergik (Salbutamol) pada reseptor membran sel otot polos saluran napas?",
        options: [
            "Memblokade reseptor histamin H1 di seluruh permukaan kulit",
            "Merangsang reseptor beta-2 adrenergik, meningkatkan kadar cAMP intraseluler, yang memicu relaksasi otot polos bronkus (bronkodilatasi)",
            "Menghambat sintesis ATP di mitokondria sel epitel trakea",
            "Mengasamkan lendir mukus agar membeku menjadi batu"
        ],
        correctIndex: 1,
        hint: "Jalur protein G stimulator (Gs) -> enzim Adenilat Siklase -> peningkatan cAMP -> relaksasi otot polos.",
        explanation: "Salbutamol bekerja secara selektif pada reseptor beta-2 adrenergik di membran sel otot polos bronkus. Pengikatan ini mengaktifkan protein Gs, yang menstimulasi enzim adenilat siklase untuk mengubah ATP menjadi cAMP (siklik AMP). Kenaikan cAMP menurunkan konsentrasi ion kalsium bebas intraseluler sehingga serat aktin-miosin relaksasi dan lumen bronkus melebar cepat.",
        topicTag: "Transduksi Sinyal Sel & Farmakologi"
    },

    // =========================================================================
    // KASUS 5: Kakek Hasan (65 th) - Gejala: Pembengkakan Kaki (Edema), Tekanan Darah Tinggi, Oliguria (Urine Sedikit)
    // Topik: Sistem Ekskresi, Nefron Ginjal, Filtrasi Glomerulus, Hormon ADH & Aldosteron
    // =========================================================================
    {
        id: "Q5_STETH",
        patientId: "patient_5",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Auskultasi Jantung & Tekanan Vaskular",
        context: "Tekanan darah Kakek Hasan 175/100 mmHg. Saat stetoskop diletakkan di dada, terdengar suara gallop S3 akibat beban volume cairan berlebih (hipervolemia).",
        question: "Ketika perfusi darah ke aparatus jukstaglomerulus ginjal menurun, sel jukstaglomerulus akan melepaskan enzim renin. Rangkaian sistem hormonal apakah yang diaktifkannya?",
        options: [
            "Sistem RAAS (Renin-Angiotensin-Aldosteron) untuk menaikkan reabsorpsi Na+ dan air serta vasokonstriksi arteriol",
            "Sistem Insulin-Glukagon untuk menurunkan sintesis glikogen otot",
            "Sistem Oksitosin-Prolaktin untuk merangsang pengeluaran cairan limfatik",
            "Sistem Kalsitonin-PTH untuk merombak matriks tulang kompak"
        ],
        correctIndex: 0,
        hint: "Sistem pengatur tekanan darah dan volume cairan tubuh jangka panjang yang melibatkan enzim ACE paru-paru.",
        explanation: "Sel jukstaglomerulus di arteriol aferen mensekresi renin saat mendeteksi penurunan tekanan darah. Renin mengubah angiotensinogen (dari hati) menjadi angiotensin I. Enzim ACE di kapiler paru mengubahnya menjadi angiotensin II (vasokonstriktor poten). Angiotensin II merangsang korteks adrenal mensekresikan aldosteron untuk mereabsorpsi ion Na+ dan air di tubulus kontortus distal.",
        topicTag: "Sistem Endokrin & Regulasi Tekanan Darah"
    },
    {
        id: "Q5_THERMO",
        patientId: "patient_5",
        tool: "thermometer",
        toolName: "Pemeriksaan Edema & Vitals",
        stageTitle: "Evaluasi Pitting Edema Ekstremitas",
        context: "Ketika kamu menekan tulang kering Kakek Hasan selama 5 detik, terbentuk cekungan yang lambat kembali (pitting edema derajat 3).",
        question: "Edema (penumpukan cairan di ruang interstisial) pada pasien dengan gangguan filtrasi ginjal dan proteinuria terutama diakibatkan oleh...",
        options: [
            "Peningkatan tekanan onkotik koloid plasma akibat kelebihan albumin darah",
            "Penurunan tekanan onkotik koloid plasma karena hilangnya protein albumin ke dalam urine (hipoalbuminemia)",
            "Peningkatan tekanan atmosfer lingkungan di sekitar tungkai kaki",
            "Pecahnya seluruh sel limfosit di dalam pembuluh kil"
        ],
        correctIndex: 1,
        hint: "Hukum Starling kapiler: Protein albumin di pembuluh darah berfungsi menarik cairan agar tidak bocor ke jaringan interstisial.",
        explanation: "Albumin adalah protein plasma utama yang mempertahankan tekanan onkotik koloid kapiler (sekitar 25 mmHg) yang berfungsi menahan cairan tetap berada di lumen vaskular. Jika ginjal bocor (sindrom nefrotik/proteinuria), terjadi hipoalbuminemia sehingga cairan intravaskular merembes keluar ke ruang interstisial sesuai gradien tekanan Starling.",
        topicTag: "Fisiologi Cairan Tubuh & Hukum Starling"
    },
    {
        id: "Q5_BLOOD",
        patientId: "patient_5",
        tool: "bloodLab",
        toolName: "Pemeriksaan Lab Darah & Urine",
        stageTitle: "Analisis Ureum, Kreatinin & Proteinuria",
        context: "Kadar kreatinin serum Kakek Hasan melonjak menjadi 4.5 mg/dL (normal: 0.7-1.3 mg/dL) dan urinalisis menunjukkan proteinuria berat (++++) serta hematuria.",
        question: "Kerusakan pada lapisan filtrasi glomerulus manakah yang menyebabkan molekul makro seperti protein albumin dan eritrosit bocor ke dalam kapsula Bowman?",
        options: [
            "Sel podosit dengan prosesus kaki (*pedicel*) dan membran basal glomerulus bermuatan negatif",
            "Lapisan mikrovili brush border di tubulus proksimal",
            "Duktus kolektivus medula ginjal",
            "Katup spiral pada ureter"
        ],
        correctIndex: 0,
        hint: "Sawar filtrasi ginjal terdiri dari sel endotel bertingkap, lamina basalis, dan sel podosit khusus.",
        explanation: "Sawar filtrasi glomerulus terdiri dari 3 lapisan: endotel bertingkap fenestrasi, membran basal glomerulus (GBM) kaya heparan sulfat bermuatan negatif, dan slit diaphragm celah podosit. Hilangnya muatan negatif pada membran basal dan rusaknya pedikel podosit melenyapkan selektivitas muatan dan ukuran, menyebabkan protein plasma dan eritrosit lolos ke filtrat glomerulus.",
        topicTag: "Histologi Nefron & Filtrasi Glomerulus"
    },
    {
        id: "Q5_MICROSCOPE",
        patientId: "patient_5",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Observasi Sedimen Urine (Silinder Seluler)",
        context: "Di bawah mikroskop fase kontras, terlihat formasi silinder eritrosit (RBC casts) dan kristal kalsium oksalat pada sampel urine pekat.",
        question: "Di segmen nefron manakah terjadi reabsorpsi air secara masif yang diatur oleh aquaporin di bawah kendali hormon Antidiuretik (ADH/Vasopresin)?",
        options: [
            "Glomerulus kapsula Bowman",
            "Tubulus kontortus distal dan duktus kolektivus (tubulus pengumpul)",
            "Lengkung Henle pars asendens tebal yang kedap air",
            "Arteriol eferen ginjal"
        ],
        correctIndex: 1,
        hint: "Hormon ADH memicu insersi kanal air aquaporin-2 di segmen akhir tubulus sebelum urine masuk ke pelvis ginjal.",
        explanation: "Hormon ADH yang disekresikan hipofisis posterior berikatan dengan reseptor V2 pada membran basolateral sel prinsipal di tubulus distal dan duktus kolektivus. Hal ini memicu fusi vesikel aquaporin-2 ke membran apikal, memungkinkan reabsorpsi air secara osmosis dari lumen tubulus kembali ke interstitium medula ginjal yang hipertonik.",
        topicTag: "Osmoregulasi & Sistem Endokrin"
    },
    {
        id: "Q5_TREATMENT",
        patientId: "patient_5",
        tool: "treatment",
        toolName: "Preskripsi & Terapi",
        stageTitle: "Prinsip Kerja Hemodialisis (Cuci Darah)",
        context: "Kakek Hasan dipersiapkan untuk menjalani prosedur hemodialisis darurat guna membersihkan racun metabolik ureum darah.",
        question: "Prinsip biofisika dan transpor membran apakah yang mendasari proses pembersihan darah pada mesin dialisis ginjal buatan?",
        options: [
            "Transpor aktif primer yang membutuhkan jutaan molekul ATP sintetis",
            "Difusi zat terlarut menuruni gradien konsentrasi melintasi membran semipermeabel sintetis dan ultrafiltrasi osmotik",
            "Endositosis makrofag yang menelan racun ureum dalam sirkuit mesin",
            "Fermentasi asam cuka di dalam tabung dialiser"
        ],
        correctIndex: 1,
        hint: "Molekul kecil seperti ureum dan kreatinin berpindah dari daerah berkonsentrasi tinggi ke cairan dialisat encer melalui membran semipermeabel.",
        explanation: "Hemodialisis memanfaatkan prinsip difusi pasif dan ultrafiltrasi. Darah pasien dialirkan melewati ribuan serat berongga yang tersusun dari membran semipermeabel sintetis. Ureum, kreatinin, dan ion berlebih dalam darah berdifusi menuruni gradien konsentrasi menuju cairan dialisat bersih yang mengalir berlawanan arah (*counter-current flow*) untuk efisiensi maksimal.",
        topicTag: "Biofisika Sel & Transpor Pasif Membran"
    },

    // =========================================================================
    // KASUS 6: Nadia (17 th) - Gejala: Riwayat Keluarga Kelainan Darah, Splenomegali (Limpa Membesar), Mudah Lelah
    // Topik: Genetika Molekuler, Sintesis Protein, Mutasi Gen Rantai Globin, Hukum Mendel
    // =========================================================================
    {
        id: "Q6_STETH",
        patientId: "patient_6",
        tool: "stethoscope",
        toolName: "Stetoskop",
        stageTitle: "Pemeriksaan Fisik & Palpasi Abdomen",
        context: "Kamu melakukan palpasi abdomen pada Nadia. Teraba pembesaran limpa (splenomegali Schuffner II) dan murmur fungsional jantung.",
        question: "Mengapa pada penyakit kelainan hemoglobin herediter (seperti talasemia dan anemia sel sabit) sering terjadi pembesaran organ limpa (splenomegali)?",
        options: [
            "Limpa bekerja ekstra keras memfagositosis dan menghancurkan eritrosit abnormal yang rapuh dan cacat bentuk di pulpa merah",
            "Limpa memproduksi hormon insulin cadangan dalam jumlah masif",
            "Bakteri usus berpindah secara permanen ke dalam sinus limfa",
            "Limpa mengalami penumpukan kalsium akibat konsumsi susu berlebih"
        ],
        correctIndex: 0,
        hint: "Organ limpa (pulpa merah) merupakan tempat pemakaman dan penyaringan sel darah merah tua atau abnormal oleh makrofag.",
        explanation: "Eritrosit yang memiliki rantai hemoglobin abnormal tidak elastis dan mudah pecah saat melewati jejaring retikuler sempit di pulpa merah limpa. Makrofag limpa aktif memfagositosis fragmen eritrosit yang rusak ini (hemolisis ekstravaskular). Beban kerja berlebih dan eritropoiesis ekstramedular menyebabkan hipertrofi limpa (splenomegali).",
        topicTag: "Sistem Imun & Fungsi Organ Limfatik"
    },
    {
        id: "Q6_BLOOD",
        patientId: "patient_6",
        tool: "bloodLab",
        toolName: "Pemeriksaan Elektroforesis Hemoglobin",
        stageTitle: "Analisis Varian Hemoglobin Protein",
        context: "Hasil elektroforesis hemoglobin Nadia menunjukkan kadar HbA1 menurun drastis dan terdapat lonjakan signifikan pada HbF (Fetal Hemoglobin) dan HbA2.",
        question: "Hemoglobin dewasa normal (HbA) terdiri atas kombinasi empat rantai polipeptida, yaitu...",
        options: [
            "Dua rantai alfa (α) dan dua rantai beta (β)",
            "Empat rantai gama (γ) identik",
            "Dua rantai delta (δ) dan dua rantai epsilon (ε)",
            "Satu rantai alfa, satu beta, satu gama, dan satu delta"
        ],
        correctIndex: 0,
        hint: "Tetramer protein globular utama darah manusia dewasa: 2 rantai α dan 2 rantai β (α2β2).",
        explanation: "Struktur kuartener molekul hemoglobin manusia dewasa normal (HbA1) tersusun atas tetramer dua rantai alfa-globin (141 asam amino) dan dua rantai beta-globin (146 asam amino), dituliskan secara biologis sebagai α2β2. Masing-masing rantai mengikat satu cincin porfirin heme dengan ion Fe2+.",
        topicTag: "Biologi Molekuler & Struktur Protein"
    },
    {
        id: "Q6_MICROSCOPE",
        patientId: "patient_6",
        tool: "microscope",
        toolName: "Mikroskop Biologi",
        stageTitle: "Observasi Morfologi Sel Target & Mikrositosis",
        context: "Di bawah mikroskop apusan darah tepi, ditemukan banyak sel target (*target cells/leptosit*) menyerupai sasaran tembak panahan dan benda Howell-Jolly.",
        question: "Pada talasemia mayor, mutasi genetik pada kromosom nomor 11 menyebabkan kegagalan transkripsi atau translasi rantai beta-globin. Jenis mutasi DNA apakah yang umumnya memicu perubahan pembacaan kerangka (*frameshift mutation*)?",
        options: [
            "Delesi atau insersi satu atau dua pasang basa nitrogen yang menggeser kerangka baca kodon triplet mRNA",
            "Substitusi basa nitrogen sinonim (silent mutation) yang mengodekan asam amino identik",
            "Pembalikan arah sentromer kromosom tanpa kehilangan materi genetik",
            "Pergantian basa pirimidin sitosin menjadi timin pada sekuens intron non-koding"
        ],
        correctIndex: 0,
        hint: "Penambahan atau pengurangan basa yang bukan kelipatan 3 mengubah seluruh deretan kodon asam amino setelah titik mutasi.",
        explanation: "Kode genetik dibaca dalam satuan kodon triplet (tiga nukleotida). Delesi atau insersi nukleotida yang bukan kelipatan 3 akan merusak kerangka baca (*reading frame*) mRNA saat translasi ribosom. Akibatnya, semua asam amino di hilir mutasi menjadi salah atau terbentuk kodon stop prematur (UAA, UAG, UGA), menghasilkan protein terpotong yang tidak fungsional.",
        topicTag: "Genetika Molekuler & Mutasi Gen"
    },
    {
        id: "Q6_THERMO",
        patientId: "patient_6",
        tool: "thermometer",
        toolName: "Pemeriksaan Silsilah & Genogram",
        stageTitle: "Konseling Genetik & Silsilah Keluarga",
        context: "Kedua orang tua Nadia tampak sehat bugar secara fisik, namun setelah dites darah, keduanya merupakan pembawa sifat (*carrier/talasemia minor*).",
        question: "Talasemia beta diwariskan secara autosom resesif (genotipe carrier: Tt). Berdasarkan hukum segregasi bebas Mendel, berapa probabilitas anak mereka menderita talasemia mayor (genotipe homozigot resesif: tt)?",
        options: [
            "25% (1 dari 4 kemungkinan)",
            "50% (2 dari 4 kemungkinan)",
            "75% (3 dari 4 kemungkinan)",
            "100% (pasti seluruh anak menderita)"
        ],
        correctIndex: 0,
        hint: "Persilangan monohibrid dua individu heterozigot (Tt x Tt) menghasilkan rasio genotipe 1 TT : 2 Tt : 1 tt.",
        explanation: "Persilangan antara dua pembawa sifat (carrier) heterozigot: P = Tt x Tt. Gamet yang dihasilkan masing-masing adalah T (50%) dan t (50%). Kombinasi keturunan F1 pada papan catur Punnett: 1 TT (Normal, 25%), 2 Tt (Carrier talasemia minor, 50%), dan 1 tt (Talasemia mayor, 25%). Jadi peluang memiliki anak menderita talasemia mayor adalah 25%.",
        topicTag: "Pewarisan Sifat & Hukum Mendel"
    },
    {
        id: "Q6_TREATMENT",
        patientId: "patient_6",
        tool: "treatment",
        toolName: "Preskripsi & Terapi",
        stageTitle: "Terapi Transfusi & Kelasi Besi",
        context: "Nadia membutuhkan transfusi darah rutin. Namun transfusi berkali-kali berisiko menyebabkan penumpukan zat besi beracun (hemokromatosis). Kamu harus meresepkan agen kelasi besi.",
        question: "Mengapa tubuh manusia tidak memiliki mekanisme fisiologis aktif untuk mengekskresikan kelebihan zat besi selain melalui deskuamasi sel epitel kulit dan saluran cerna yang sangat terbatas?",
        options: [
            "Zat besi tidak pernah diserap ke dalam aliran darah manusia",
            "Secara evolusi biologis, tubuh manusia beradaptasi untuk mempertahankan dan mendaur ulang zat besi secara ketat guna bertahan hidup dari kelaparan nutrisi",
            "Semua ion besi langsung menguap melalui saluran pernapasan saat ekspirasi",
            "Besi diubah oleh ginjal menjadi vitamin larut lemak"
        ],
        correctIndex: 1,
        hint: "Tubuh mendaur ulang zat besi dari eritrosit tua melalui makrofag hati dan limpa, namun tidak punya organ khusus pembuang besi berlebih.",
        explanation: "Secara evolusioner, mamalia beradaptasi dalam kondisi langka nutrisi sehingga tubuh mengembangkan sistem pengikatan (transferin, feritin) dan daur ulang zat besi yang sangat efisien oleh sistem retikuloendotelial tanpa adanya jalur ekskresi aktif teratur. Oleh sebab itu, pasien yang menerima transfusi rutin memerlukan obat pengikat besi (*iron chelator* seperti deferoksamin) untuk mencegah toksisitas radikal bebas hidroksil (reaksi Fenton).",
        topicTag: "Bioinorganik & Homeostasis Logam Tubuh"
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
window.BIOLOGY_QUESTIONS = BIOLOGY_QUESTIONS;
window.getQuestionsForPatient = getQuestionsForPatient;
window.getQuestionForPatientAndTool = getQuestionForPatientAndTool;
