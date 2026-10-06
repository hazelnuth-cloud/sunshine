/**
 * Biology Champions: Klinik Dokter Usagi (Chiikawa Bio Care)
 * Patient Profiles & Medical Ward Simulation with Chiikawa Characters
 * Chiikawa, Hachiware, Kurimanju, Momonga, Rakko, Shisa
 */

const PATIENTS_DATA = [
    {
        id: "patient_1",
        bedNumber: "Bed 101 - Kamar Chiikawa",
        name: "Chiikawa",
        age: "Sahabat Hutan",
        gender: "Karakter Chiikawa",
        condition: "Iritasi Lambung & Asam Lambung Berlebih",
        organSystem: "Sistem Pencernaan & Lambung (HCl)",
        badgeColor: "#F472B6",
        complaint: "Wawa... perutku perih melilit dan panas setelah seharian telat makan kue...",
        targetMedicineId: "med_antasida",
        targetMedicineName: "Sirup Antasida (Mg(OH)2)",
        curedDialog: "Wawaa! (Perutku sudah tidak perih lagi! Terima kasih banyak Dokter Usagi! YAHA!)",
        initialVitals: {
            hr: 98,
            temp: 36.8,
            spo2: 98,
            bp: "105/70 mmHg"
        },
        healthyVitals: {
            hr: 78,
            temp: 36.5,
            spo2: 99,
            bp: "115/75 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Chiikawa Sick Body -->
                <!-- Ears -->
                <circle cx="42" cy="36" r="10" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <circle cx="78" cy="36" r="10" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <circle cx="42" cy="36" r="5" fill="#FED7AA"/>
                <circle cx="78" cy="36" r="5" fill="#FED7AA"/>
                <!-- Head & Round Body -->
                <ellipse cx="60" cy="62" rx="34" ry="32" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <!-- Sad Teary Eyes -->
                <circle cx="48" cy="58" r="4.5" fill="#1E293B"/>
                <circle cx="72" cy="58" r="4.5" fill="#1E293B"/>
                <circle cx="46" cy="56" r="1.5" fill="#FFFFFF"/>
                <circle cx="70" cy="56" r="1.5" fill="#FFFFFF"/>
                <!-- Big Teardrops -->
                <ellipse cx="44" cy="66" rx="2.5" ry="4" fill="#38BDF8" opacity="0.85"/>
                <ellipse cx="76" cy="66" rx="2.5" ry="4" fill="#38BDF8" opacity="0.85"/>
                <!-- Blushing Cheeks -->
                <circle cx="40" cy="65" r="5" fill="#F472B6" opacity="0.45"/>
                <circle cx="80" cy="65" r="5" fill="#F472B6" opacity="0.45"/>
                <!-- Trembling Wavy Sad Mouth -->
                <path d="M54 70 Q60 66 66 70" stroke="#334155" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- Fever cooling patch on forehead -->
                <rect x="47" y="38" width="26" height="10" rx="3" fill="#93C5FD" stroke="#3B82F6" stroke-width="1.5"/>
                <line x1="51" y1="43" x2="69" y2="43" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Hospital blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#99F6E4" stroke="#0D9488" stroke-width="2.5"/>
                <circle cx="40" cy="95" r="3" fill="#14B8A6" opacity="0.6"/>
                <circle cx="60" cy="95" r="3" fill="#14B8A6" opacity="0.6"/>
                <circle cx="80" cy="95" r="3" fill="#14B8A6" opacity="0.6"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Sparkles -->
                <polygon points="18,18 21,25 28,27 21,29 18,36 15,29 8,27 15,25" fill="#FACC15"/>
                <polygon points="102,22 104,27 110,29 104,31 102,36 100,31 94,29 100,27" fill="#FACC15"/>
                <!-- Chiikawa Happy Body -->
                <!-- Ears -->
                <circle cx="42" cy="35" r="10" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <circle cx="78" cy="35" r="10" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <circle cx="42" cy="35" r="5" fill="#F472B6" opacity="0.5"/>
                <circle cx="78" cy="35" r="5" fill="#F472B6" opacity="0.5"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="32" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <!-- Happy Sparkle Eyes -->
                <path d="M44 58 Q48 51 53 58" stroke="#1E293B" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M67 58 Q71 51 76 58" stroke="#1E293B" stroke-width="3" fill="none" stroke-linecap="round"/>
                <!-- Pink Cheeks -->
                <circle cx="39" cy="64" r="6" fill="#F472B6" opacity="0.75"/>
                <circle cx="81" cy="64" r="6" fill="#F472B6" opacity="0.75"/>
                <!-- Big Happy Open Smile -->
                <path d="M52 65 Q60 77 68 65" stroke="#1E293B" stroke-width="2.5" fill="#F43F5E"/>
                <!-- Raised happy paws -->
                <circle cx="30" cy="56" r="6" fill="#FFFFFF" stroke="#334155" stroke-width="2"/>
                <circle cx="90" cy="56" r="6" fill="#FFFFFF" stroke="#334155" stroke-width="2"/>
                <!-- Hospital blanket with cured badge -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#A7F3D0" stroke="#059669" stroke-width="2.5"/>
                <circle cx="76" cy="96" r="7" fill="#FACC15"/>
                <text x="73" y="100" font-size="9" font-weight="900" fill="#92400E">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_2",
        bedNumber: "Bed 102 - Kamar Hachiware",
        name: "Hachiware",
        age: "Kucing Ceria",
        gender: "Karakter Chiikawa",
        condition: "Anemia Defisiensi Besi & Hipoksia Eritrosit",
        organSystem: "Sistem Peredaran Darah & Hemoglobin",
        badgeColor: "#0284C7",
        complaint: "Aduh Usagi... kepalaku pusing berkunang-kunang, nafasku terengah lemas, dan ujung tanganku pucat dingin...",
        targetMedicineId: "med_iron",
        targetMedicineName: "Tablet Zat Besi (Fe) & Vitamin C",
        curedDialog: "Nanto kana nare! (Wah, badanku segar bugar kembali! Terima kasih banyak Dokter Usagi! YAHA!)",
        initialVitals: {
            hr: 114,
            temp: 36.3,
            spo2: 92,
            bp: "90/60 mmHg"
        },
        healthyVitals: {
            hr: 76,
            temp: 36.6,
            spo2: 99,
            bp: "118/76 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Hachiware Pointed Cat Ears -->
                <polygon points="34,42 42,24 52,38" fill="#38BDF8" stroke="#334155" stroke-width="2.5"/>
                <polygon points="86,42 78,24 68,38" fill="#38BDF8" stroke="#334155" stroke-width="2.5"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <!-- Signature Blue Parted Bangs (Hachiware forehead) -->
                <path d="M38 42 C44 32, 54 36, 60 48 C66 36, 76 32, 82 42 C80 34, 40 34, 38 42 Z" fill="#38BDF8"/>
                <!-- Pale Weak Eyes -->
                <line x1="44" y1="58" x2="53" y2="58" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>
                <line x1="67" y1="58" x2="76" y2="58" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>
                <!-- Sweat Drop of Weakness -->
                <path d="M84 48 Q87 53 84 56 A2.5 2.5 0 0 1 81 53 Q81 50 84 48" fill="#67E8F9"/>
                <!-- Weak cat mouth -->
                <path d="M55 70 Q60 67 65 70" stroke="#334155" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="2.5"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Sparkles -->
                <polygon points="20,18 22,24 28,26 22,28 20,34 18,28 12,26 18,24" fill="#FACC15"/>
                <!-- Ears -->
                <polygon points="34,40 42,22 52,36" fill="#38BDF8" stroke="#334155" stroke-width="2.5"/>
                <polygon points="86,40 78,22 68,36" fill="#38BDF8" stroke="#334155" stroke-width="2.5"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <!-- Forehead Blue Bangs -->
                <path d="M38 40 C44 30, 54 34, 60 46 C66 34, 76 30, 82 40 C80 32, 40 32, 38 40 Z" fill="#38BDF8"/>
                <!-- Happy Sparkle Eyes -->
                <circle cx="48" cy="56" r="4.5" fill="#1E293B"/>
                <circle cx="72" cy="56" r="4.5" fill="#1E293B"/>
                <circle cx="46" cy="54" r="1.5" fill="#FFFFFF"/>
                <circle cx="70" cy="54" r="1.5" fill="#FFFFFF"/>
                <!-- Pink Cheeks -->
                <circle cx="39" cy="63" r="5.5" fill="#F472B6" opacity="0.75"/>
                <circle cx="81" cy="63" r="5.5" fill="#F472B6" opacity="0.75"/>
                <!-- Cheerful Cat 'ω' Smile -->
                <path d="M52 66 Q56 70 60 67 Q64 70 68 66" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="2.5"/>
                <circle cx="76" cy="96" r="7" fill="#FACC15"/>
                <text x="73" y="100" font-size="9" font-weight="900" fill="#92400E">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_3",
        bedNumber: "Bed 103 - Kamar Kurimanju",
        name: "Kurimanju",
        age: "Senior Bijak",
        gender: "Karakter Chiikawa",
        condition: "Penyempitan Saluran Bronkiolus & Iritasi Paru",
        organSystem: "Sistem Pernapasan & Alveolus",
        badgeColor: "#D97706",
        complaint: "Uhuk... dadaku sesak sekali dan napas berbunyi setelah lari santai di tempat berdebu...",
        targetMedicineId: "med_inhaler",
        targetMedicineName: "Inhaler Bronkodilator Pelega Alveolus",
        curedDialog: "Haaaah... (Napas terasa lega dan segar! Teh hangat ini jadi terasa jauh lebih nikmat! Makasih Dokter Usagi!)",
        initialVitals: {
            hr: 105,
            temp: 36.9,
            spo2: 90,
            bp: "125/82 mmHg"
        },
        healthyVitals: {
            hr: 72,
            temp: 36.6,
            spo2: 99,
            bp: "120/80 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Kurimanju Rounded Ears -->
                <circle cx="42" cy="38" r="9" fill="#B45309" stroke="#334155" stroke-width="2.5"/>
                <circle cx="78" cy="38" r="9" fill="#B45309" stroke="#334155" stroke-width="2.5"/>
                <!-- Head (Chestnut color on top, beige face) -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#FEF3C7" stroke="#334155" stroke-width="2.5"/>
                <path d="M26 60 C30 35, 90 35, 94 60 C80 48, 40 48, 26 60 Z" fill="#B45309"/>
                <!-- Coughing Eyes (slanted) -->
                <line x1="43" y1="56" x2="52" y2="60" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
                <line x1="77" y1="56" x2="68" y2="60" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
                <!-- Coughing cloud / dust puff -->
                <ellipse cx="60" cy="71" rx="5" ry="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#FED7AA" stroke="#D97706" stroke-width="2.5"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Kurimanju Rounded Ears -->
                <circle cx="42" cy="38" r="9" fill="#B45309" stroke="#334155" stroke-width="2.5"/>
                <circle cx="78" cy="38" r="9" fill="#B45309" stroke="#334155" stroke-width="2.5"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#FEF3C7" stroke="#334155" stroke-width="2.5"/>
                <path d="M26 60 C30 35, 90 35, 94 60 C80 48, 40 48, 26 60 Z" fill="#B45309"/>
                <!-- Calm Satisfied Eyes -->
                <path d="M44 58 Q48 55 52 58" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M68 58 Q72 55 76 58" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- Blush of satisfaction -->
                <circle cx="40" cy="64" r="5" fill="#FB923C" opacity="0.6"/>
                <circle cx="80" cy="64" r="5" fill="#FB923C" opacity="0.6"/>
                <!-- Serene gentle smile -->
                <path d="M54 67 Q60 72 66 67" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#FED7AA" stroke="#D97706" stroke-width="2.5"/>
                <circle cx="76" cy="96" r="7" fill="#FACC15"/>
                <text x="73" y="100" font-size="9" font-weight="900" fill="#92400E">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_4",
        bedNumber: "Bed 104 - Kamar Momonga",
        name: "Momonga",
        age: "Tupai Lucu",
        gender: "Karakter Chiikawa",
        condition: "Demam Infeksi & Respon Leukosit Imun",
        organSystem: "Sistem Imun & Sel Darah Putih",
        badgeColor: "#EC4899",
        complaint: "Hatchii! Badanku hangat demam, hidungku bersin-bersin terus... Usagi cepat elus dan obati aku!",
        targetMedicineId: "med_immune",
        targetMedicineName: "Kapsul Imunomodulator & Vitamin Imun",
        curedDialog: "Puu-puu! (Lihat betapa imut dan sehatnya aku sekarang! Kamu memang dokter hebat, Usagi!)",
        initialVitals: {
            hr: 110,
            temp: 39.1,
            spo2: 97,
            bp: "112/74 mmHg"
        },
        healthyVitals: {
            hr: 78,
            temp: 36.7,
            spo2: 99,
            bp: "115/75 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Fluffy Flying Squirrel Big Ears with Blue inner -->
                <ellipse cx="38" cy="34" rx="14" ry="16" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <ellipse cx="82" cy="34" rx="14" ry="16" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <ellipse cx="38" cy="34" rx="8" ry="10" fill="#38BDF8"/>
                <ellipse cx="82" cy="34" rx="8" ry="10" fill="#38BDF8"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <!-- Fever Cheek Flush -->
                <circle cx="38" cy="64" r="7" fill="#F43F5E" opacity="0.65"/>
                <circle cx="82" cy="64" r="7" fill="#F43F5E" opacity="0.65"/>
                <!-- Sneezing cute teary eyes with eyelashes -->
                <path d="M44 56 Q48 52 52 56" stroke="#1E293B" stroke-width="2.5" fill="none"/>
                <path d="M68 56 Q72 52 76 56" stroke="#1E293B" stroke-width="2.5" fill="none"/>
                <!-- Fever Ice Bag on head -->
                <ellipse cx="60" cy="38" rx="12" ry="7" fill="#60A5FA"/>
                <rect x="58" y="28" width="4" height="6" fill="#F59E0B"/>
                <!-- Sad mouth -->
                <path d="M55 70 Q60 66 65 70" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#FBCFE8" stroke="#EC4899" stroke-width="2.5"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Ears -->
                <ellipse cx="38" cy="34" rx="14" ry="16" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <ellipse cx="82" cy="34" rx="14" ry="16" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <ellipse cx="38" cy="34" rx="8" ry="10" fill="#38BDF8"/>
                <ellipse cx="82" cy="34" rx="8" ry="10" fill="#38BDF8"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
                <!-- Huge sparkly cute eyes with eyelashes -->
                <circle cx="48" cy="56" r="6" fill="#1E293B"/>
                <circle cx="72" cy="56" r="6" fill="#1E293B"/>
                <circle cx="46" cy="53" r="2.2" fill="#FFFFFF"/>
                <circle cx="70" cy="53" r="2.2" fill="#FFFFFF"/>
                <line x1="52" y1="50" x2="55" y2="48" stroke="#1E293B" stroke-width="1.5"/>
                <line x1="76" y1="50" x2="79" y2="48" stroke="#1E293B" stroke-width="1.5"/>
                <!-- Blush -->
                <circle cx="38" cy="65" r="5.5" fill="#F472B6" opacity="0.8"/>
                <circle cx="82" cy="65" r="5.5" fill="#F472B6" opacity="0.8"/>
                <!-- Spoiled cute smile -->
                <path d="M54 67 Q60 74 66 67" stroke="#1E293B" stroke-width="2.5" fill="#F43F5E"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#FBCFE8" stroke="#EC4899" stroke-width="2.5"/>
                <circle cx="76" cy="96" r="7" fill="#FACC15"/>
                <text x="73" y="100" font-size="9" font-weight="900" fill="#92400E">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_5",
        bedNumber: "Bed 105 - Kamar Rakko",
        name: "Rakko",
        age: "Pahlawan Terkuat",
        gender: "Karakter Chiikawa",
        condition: "Kram Otot & Penumpukan Asam Laktat",
        organSystem: "Metabolisme Seluler & Mitokondria Otot",
        badgeColor: "#8B5CF6",
        complaint: "Otot kaki dan lenganku kaku kram luar biasa setelah latihan pedang berat nonstop seharian...",
        targetMedicineId: "med_muscle",
        targetMedicineName: "Gel Glukosa & Magnesium Relaksasi Otot",
        curedDialog: "Kerja bagus, Usagi! (Ototku sudah rileks dan energinya pulih penuh. Aku siap berlatih lagi!)",
        initialVitals: {
            hr: 118,
            temp: 37.4,
            spo2: 95,
            bp: "135/88 mmHg"
        },
        healthyVitals: {
            hr: 68,
            temp: 36.6,
            spo2: 99,
            bp: "120/80 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Rakko Otter Ears -->
                <circle cx="40" cy="38" r="8" fill="#78350F" stroke="#334155" stroke-width="2.5"/>
                <circle cx="80" cy="38" r="8" fill="#78350F" stroke="#334155" stroke-width="2.5"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#78350F" stroke="#334155" stroke-width="2.5"/>
                <!-- White muzzle area -->
                <ellipse cx="60" cy="67" rx="16" ry="12" fill="#FFFFFF"/>
                <polygon points="60,60 56,57 64,57" fill="#1E293B"/>
                <!-- Star Scar on Forehead -->
                <path d="M57 44 L60 38 L63 44 L69 45 L64 49 L66 55 L60 51 L54 55 L56 49 L51 45 Z" fill="#FACC15"/>
                <!-- Exhausted squinting eyes -->
                <line x1="43" y1="54" x2="51" y2="54" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
                <line x1="69" y1="54" x2="77" y2="54" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
                <!-- Pained grimace -->
                <line x1="56" y1="71" x2="64" y2="71" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="2.5"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Rakko Otter Ears -->
                <circle cx="40" cy="38" r="8" fill="#78350F" stroke="#334155" stroke-width="2.5"/>
                <circle cx="80" cy="38" r="8" fill="#78350F" stroke="#334155" stroke-width="2.5"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#78350F" stroke="#334155" stroke-width="2.5"/>
                <ellipse cx="60" cy="67" rx="16" ry="12" fill="#FFFFFF"/>
                <polygon points="60,60 56,57 64,57" fill="#1E293B"/>
                <!-- Star Scar -->
                <path d="M57 44 L60 38 L63 44 L69 45 L64 49 L66 55 L60 51 L54 55 L56 49 L51 45 Z" fill="#FACC15"/>
                <!-- Determined Heroic Eyes -->
                <circle cx="48" cy="54" r="4.5" fill="#FFFFFF"/>
                <circle cx="72" cy="54" r="4.5" fill="#FFFFFF"/>
                <circle cx="48" cy="54" r="3" fill="#1E293B"/>
                <circle cx="72" cy="54" r="3" fill="#1E293B"/>
                <!-- Confident Hero Smile -->
                <path d="M55 70 Q60 74 65 70" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="2.5"/>
                <circle cx="76" cy="96" r="7" fill="#FACC15"/>
                <text x="73" y="100" font-size="9" font-weight="900" fill="#92400E">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_6",
        bedNumber: "Bed 106 - Kamar Shisa",
        name: "Shisa",
        age: "Singa Penjaga",
        gender: "Karakter Chiikawa",
        condition: "Dehidrasi & Gangguan Regulasi Osmotik Ginjal",
        organSystem: "Sistem Ekskresi Ginjal & Cairan Tubuh",
        badgeColor: "#F59E0B",
        complaint: "Haus sekali Usagi... bibirku kering pecah-pecah dan jarang buang air kecil setelah jaga kedai di bawah terik matahari...",
        targetMedicineId: "med_oralit",
        targetMedicineName: "Larutan Oralit & Cairan Elektrolit",
        curedDialog: "Ureshii saa! (Cairan tubuhku kembali seimbang! Semangat kerjaku membara lagi! Makasih Dokter Usagi!)",
        initialVitals: {
            hr: 112,
            temp: 37.8,
            spo2: 97,
            bp: "94/62 mmHg"
        },
        healthyVitals: {
            hr: 75,
            temp: 36.6,
            spo2: 99,
            bp: "118/78 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Shisa Fluffy Lion Dog Mane & Ears -->
                <circle cx="36" cy="38" r="10" fill="#FBBF24" stroke="#334155" stroke-width="2.5"/>
                <circle cx="84" cy="38" r="10" fill="#FBBF24" stroke="#334155" stroke-width="2.5"/>
                <!-- Fluffy Mane Puffs around Head -->
                <circle cx="28" cy="54" r="8" fill="#F59E0B"/>
                <circle cx="92" cy="54" r="8" fill="#F59E0B"/>
                <circle cx="32" cy="72" r="8" fill="#F59E0B"/>
                <circle cx="88" cy="72" r="8" fill="#F59E0B"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#FEF08A" stroke="#334155" stroke-width="2.5"/>
                <!-- Thirsty dry tongue -->
                <path d="M58 70 Q60 78 62 70" fill="#F87171" stroke="#334155" stroke-width="1.5"/>
                <!-- Parched Dry Eyes -->
                <line x1="44" y1="56" x2="52" y2="56" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
                <line x1="68" y1="56" x2="76" y2="56" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
                <!-- Sweat Drop of Dehydration -->
                <path d="M82 46 Q85 52 82 55 A2.5 2.5 0 0 1 79 52 Q79 49 82 46" fill="#38BDF8"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#FEF08A" stroke="#F59E0B" stroke-width="2.5"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Mane -->
                <circle cx="36" cy="38" r="10" fill="#FBBF24" stroke="#334155" stroke-width="2.5"/>
                <circle cx="84" cy="38" r="10" fill="#FBBF24" stroke="#334155" stroke-width="2.5"/>
                <circle cx="28" cy="54" r="8" fill="#F59E0B"/>
                <circle cx="92" cy="54" r="8" fill="#F59E0B"/>
                <!-- Head -->
                <ellipse cx="60" cy="62" rx="34" ry="31" fill="#FEF08A" stroke="#334155" stroke-width="2.5"/>
                <!-- Happy Sparkly Eyes -->
                <circle cx="48" cy="56" r="4.5" fill="#1E293B"/>
                <circle cx="72" cy="56" r="4.5" fill="#1E293B"/>
                <circle cx="46" cy="54" r="1.5" fill="#FFFFFF"/>
                <circle cx="70" cy="54" r="1.5" fill="#FFFFFF"/>
                <!-- Cheerful Shisa Smile -->
                <path d="M52 66 Q60 76 68 66" stroke="#1E293B" stroke-width="2.5" fill="#EF4444"/>
                <path d="M55 67 Q60 71 65 67" fill="#FFFFFF"/>
                <!-- Blush -->
                <circle cx="38" cy="64" r="5" fill="#F472B6" opacity="0.6"/>
                <circle cx="82" cy="64" r="5" fill="#F472B6" opacity="0.6"/>
                <!-- Blanket -->
                <path d="M26 82 Q60 76 94 82 L96 115 L24 115 Z" fill="#FEF08A" stroke="#F59E0B" stroke-width="2.5"/>
                <circle cx="76" cy="96" r="7" fill="#FACC15"/>
                <text x="73" y="100" font-size="9" font-weight="900" fill="#92400E">✓</text>
            </svg>`
        }
    }
];

// Medicines available in the Pharmacy / Ruangan Obat-obatan
const PHARMACY_MEDICINES = [
    {
        id: "med_antasida",
        name: "Sirup Antasida (Mg(OH)2)",
        icon: "💊",
        color: "#10B981",
        shelfTag: "Rak 1: Pencernaan & Lambung",
        organTarget: "Sistem Pencernaan & Dinding Lambung",
        description: "Basa lemah penetral Asam Lambung (HCl). Reaksi netralisasi meredakan iritasi lambung seketika.",
        correctForPatientId: "patient_1"
    },
    {
        id: "med_iron",
        name: "Tablet Zat Besi (Fe) & Vit C",
        icon: "🩸",
        color: "#0284C7",
        shelfTag: "Rak 2: Sirkulasi & Sel Darah",
        organTarget: "Sistem Peredaran Darah & Eritrosit",
        description: "Menyediakan ion Besi (Fe) esensial untuk sintesis Hemoglobin, memulihkan suplai oksigen tubuh.",
        correctForPatientId: "patient_2"
    },
    {
        id: "med_inhaler",
        name: "Inhaler Bronkodilator Pelega",
        icon: "🫁",
        color: "#D97706",
        shelfTag: "Rak 3: Saluran Napas & Alveolus",
        organTarget: "Sistem Pernapasan & Paru-Paru",
        description: "Merelaksasi otot polos bronkiolus yang menyempit agar pertukaran oksigen di alveolus lancar.",
        correctForPatientId: "patient_3"
    },
    {
        id: "med_immune",
        name: "Kapsul Imunomodulator & Vit C",
        icon: "🛡️",
        color: "#EC4899",
        shelfTag: "Rak 4: Sistem Imunitas",
        organTarget: "Sistem Imun & Sel Darah Putih (Leukosit)",
        description: "Meningkatkan daya tahan tubuh dan membantu kerja leukosit dalam memfagositosis bakteri patogen.",
        correctForPatientId: "patient_4"
    },
    {
        id: "med_muscle",
        name: "Gel Glukosa & Magnesium Relaksasi",
        icon: "⚡",
        color: "#8B5CF6",
        shelfTag: "Rak 5: Metabolisme Sel & Otot",
        organTarget: "Mitokondria & Serat Otot",
        description: "Sumber energi cepat pembentuk ATP dan meredakan kram akibat timbunan asam laktat seluler.",
        correctForPatientId: "patient_5"
    },
    {
        id: "med_oralit",
        name: "Larutan Oralit & Cairan Elektrolit",
        icon: "💧",
        color: "#F59E0B",
        shelfTag: "Rak 6: Osmoregulasi Ginjal",
        organTarget: "Sistem Ekskresi & Keseimbangan Cairan Ginjal",
        description: "Mengembalikan kadar ion natrium (Na+), kalium (K+) dan cairan darah agar kerja nefron ginjal stabil.",
        correctForPatientId: "patient_6"
    }
];

// Helper function to find patient by ID
function getPatientById(id) {
    return PATIENTS_DATA.find(p => p.id === id);
}

// Export to window
if (typeof window !== 'undefined') {
    window.PATIENTS_DATA = PATIENTS_DATA;
    window.PHARMACY_MEDICINES = PHARMACY_MEDICINES;
    window.getPatientById = getPatientById;
}


