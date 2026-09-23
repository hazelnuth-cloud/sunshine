/**
 * Biology Champions - Patient Profiles & Medical Ward Simulation
 * Playful Hospital Ward with animated SVG avatars, dynamic vital signs, and recovery state
 */

const PATIENTS_DATA = [
    {
        id: "patient_1",
        bedNumber: "Bed 101 - Bangsal Sirkulasi",
        name: "Pak Budi",
        age: "52 Tahun",
        gender: "Laki-laki",
        condition: "Anemia Berat & Hipoksia Jaringan",
        organSystem: "Sistem Peredaran Darah & Eritrosit",
        badgeColor: "#00B4D8",
        complaint: "Badan lemas luar biasa, pandangan berkunang-kunang, dan telapak tangan pucat dingin.",
        initialVitals: {
            hr: 115,            // Takikardia kompensasi
            temp: 36.4,
            spo2: 92,
            bp: "90/60 mmHg"
        },
        healthyVitals: {
            hr: 75,
            temp: 36.6,
            spo2: 99,
            bp: "120/80 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Hair -->
                <path d="M30 46 C25 25, 95 20, 90 46 Z" fill="#4A5568"/>
                <!-- Head -->
                <circle cx="60" cy="55" r="32" fill="#E2E8F0"/>
                <!-- Pale cheeks -->
                <circle cx="45" cy="62" r="5" fill="#CBD5E1" opacity="0.6"/>
                <circle cx="75" cy="62" r="5" fill="#CBD5E1" opacity="0.6"/>
                <!-- Sleepy pale eyes -->
                <line x1="42" y1="52" x2="52" y2="52" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
                <line x1="68" y1="52" x2="78" y2="52" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
                <!-- Droopy eyebrows -->
                <path d="M40 45 Q47 48 54 48" stroke="#334155" stroke-width="2.5" fill="none"/>
                <path d="M66 48 Q73 48 80 45" stroke="#334155" stroke-width="2.5" fill="none"/>
                <!-- Weak mouth -->
                <path d="M52 74 Q60 69 68 74" stroke="#475569" stroke-width="3" fill="none" stroke-linecap="round"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#90E0EF"/>
                <line x1="60" y1="86" x2="60" y2="120" stroke="#0077B6" stroke-width="2" stroke-dasharray="4"/>
                <!-- Weak sweat drop -->
                <path d="M83 40 Q86 46 83 49 A3 3 0 0 1 80 46 Q80 43 83 40" fill="#67E8F9"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Sparkles -->
                <polygon points="15,20 18,28 26,30 18,32 15,40 12,32 4,30 12,28" fill="#FACC15"/>
                <polygon points="105,25 107,31 113,33 107,35 105,41 103,35 97,33 103,31" fill="#FACC15"/>
                <!-- Hair -->
                <path d="M30 46 C25 25, 95 20, 90 46 Z" fill="#334155"/>
                <!-- Head with healthy blush -->
                <circle cx="60" cy="55" r="32" fill="#FED7AA"/>
                <!-- Rosy cheeks -->
                <circle cx="43" cy="62" r="6" fill="#F472B6" opacity="0.6"/>
                <circle cx="77" cy="62" r="6" fill="#F472B6" opacity="0.6"/>
                <!-- Happy curved eyes -->
                <path d="M42 53 Q48 45 54 53" stroke="#1E293B" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <path d="M66 53 Q72 45 78 53" stroke="#1E293B" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <!-- Cheerful smile -->
                <path d="M48 68 Q60 84 72 68" stroke="#1E293B" stroke-width="3" fill="#E11D48"/>
                <path d="M52 69 Q60 74 68 69" fill="#FFF"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#00C9A7"/>
                <!-- Champion badge -->
                <circle cx="78" cy="98" r="8" fill="#FACC15"/>
                <text x="75" y="102" font-size="10" font-weight="bold" fill="#78350F">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_2",
        bedNumber: "Bed 102 - Bangsal Infeksi & Imun",
        name: "Adik Citra",
        age: "16 Tahun",
        gender: "Perempuan",
        condition: "Faringitis Bakteri Akut & Respon Imun",
        organSystem: "Sistem Imun & Mikroorganisme",
        badgeColor: "#F43F5E",
        complaint: "Demam tinggi mendadak (39.2°C), sakit menelan, tenggorokan merah berbintik putih nanah.",
        initialVitals: {
            hr: 110,
            temp: 39.2,         // Demam tinggi
            spo2: 97,
            bp: "110/70 mmHg"
        },
        healthyVitals: {
            hr: 80,
            temp: 36.7,
            spo2: 99,
            bp: "115/75 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Ponytail -->
                <path d="M25 40 Q15 65 30 75" stroke="#78350F" stroke-width="8" fill="none" stroke-linecap="round"/>
                <path d="M30 46 C25 20, 95 20, 90 46 Z" fill="#78350F"/>
                <!-- Fever head (flushed) -->
                <circle cx="60" cy="55" r="32" fill="#FDE047"/>
                <!-- Fever red cheeks -->
                <circle cx="43" cy="62" r="8" fill="#EF4444" opacity="0.6"/>
                <circle cx="77" cy="62" r="8" fill="#EF4444" opacity="0.6"/>
                <!-- Fever compress on forehead -->
                <rect x="40" y="32" width="40" height="12" rx="4" fill="#67E8F9" stroke="#0891B2" stroke-width="1.5"/>
                <!-- Water drops on compress -->
                <circle cx="48" cy="38" r="2" fill="#0284C7"/>
                <circle cx="60" cy="38" r="2" fill="#0284C7"/>
                <!-- Sad tired eyes -->
                <circle cx="48" cy="54" r="3" fill="#1F2937"/>
                <circle cx="72" cy="54" r="3" fill="#1F2937"/>
                <!-- Throat ice pack/scarf -->
                <path d="M40 76 Q60 85 80 76 L82 86 Q60 92 38 86 Z" fill="#F43F5E"/>
                <!-- Small sad mouth -->
                <path d="M54 71 Q60 67 66 71" stroke="#991B1B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#FBCFE8"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Hair with cute hairclip -->
                <path d="M25 40 Q15 65 30 75" stroke="#78350F" stroke-width="8" fill="none" stroke-linecap="round"/>
                <path d="M30 46 C25 20, 95 20, 90 46 Z" fill="#78350F"/>
                <circle cx="78" cy="34" r="5" fill="#EC4899"/>
                <!-- Healthy glow face -->
                <circle cx="60" cy="55" r="32" fill="#FED7AA"/>
                <circle cx="43" cy="62" r="6" fill="#F472B6" opacity="0.5"/>
                <circle cx="77" cy="62" r="6" fill="#F472B6" opacity="0.5"/>
                <!-- Happy sparkly eyes -->
                <circle cx="48" cy="53" r="4" fill="#0F172A"/>
                <circle cx="50" cy="51" r="1.5" fill="#FFF"/>
                <circle cx="72" cy="53" r="4" fill="#0F172A"/>
                <circle cx="74" cy="51" r="1.5" fill="#FFF"/>
                <!-- Cute smiling mouth -->
                <path d="M50 67 Q60 80 70 67" stroke="#1E293B" stroke-width="3" fill="#FB7185"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#00C9A7"/>
                <circle cx="78" cy="98" r="8" fill="#FACC15"/>
                <text x="75" y="102" font-size="10" font-weight="bold" fill="#78350F">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_3",
        bedNumber: "Bed 103 - Bangsal Metabolik",
        name: "Ibu Ratna",
        age: "45 Tahun",
        gender: "Perempuan",
        condition: "Diabetes Mellitus Tipe 2 & Resistensi Insulin",
        organSystem: "Metabolisme Sel & Sinyal Hormon",
        badgeColor: "#F59E0B",
        complaint: "Sering kencing malam hari, haus terus-menerus, cepat lelah, luka gores di kaki sulit sembuh.",
        initialVitals: {
            hr: 88,
            temp: 36.8,
            spo2: 98,
            bp: "140/90 mmHg"
        },
        healthyVitals: {
            hr: 72,
            temp: 36.5,
            spo2: 99,
            bp: "120/78 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Hair bun -->
                <circle cx="60" cy="22" r="14" fill="#374151"/>
                <path d="M28 48 C25 25, 95 25, 92 48 Z" fill="#374151"/>
                <!-- Head -->
                <circle cx="60" cy="55" r="32" fill="#FFEDD5"/>
                <!-- Thirsty dry mouth -->
                <path d="M52 72 Q60 70 68 72" stroke="#9A3412" stroke-width="3" fill="none" stroke-linecap="round"/>
                <!-- Weary eyes with dark circles -->
                <ellipse cx="46" cy="56" rx="8" ry="4" fill="#FED7AA"/>
                <circle cx="46" cy="53" r="3" fill="#1F2937"/>
                <ellipse cx="74" cy="56" rx="8" ry="4" fill="#FED7AA"/>
                <circle cx="74" cy="53" r="3" fill="#1F2937"/>
                <!-- Eyeglasses -->
                <circle cx="46" cy="53" r="9" fill="none" stroke="#D97706" stroke-width="2"/>
                <circle cx="74" cy="53" r="9" fill="none" stroke="#D97706" stroke-width="2"/>
                <line x1="55" y1="53" x2="65" y2="53" stroke="#D97706" stroke-width="2"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#FEF08A"/>
                <circle cx="85" cy="40" r="3" fill="#F59E0B" opacity="0.7"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Hair bun -->
                <circle cx="60" cy="22" r="14" fill="#1F2937"/>
                <path d="M28 48 C25 25, 95 25, 92 48 Z" fill="#1F2937"/>
                <!-- Healthy face -->
                <circle cx="60" cy="55" r="32" fill="#FED7AA"/>
                <circle cx="43" cy="63" r="5" fill="#F472B6" opacity="0.6"/>
                <circle cx="77" cy="63" r="5" fill="#F472B6" opacity="0.6"/>
                <!-- Eyeglasses with smiling eyes -->
                <circle cx="46" cy="53" r="9" fill="none" stroke="#0284C7" stroke-width="2.5"/>
                <circle cx="74" cy="53" r="9" fill="none" stroke="#0284C7" stroke-width="2.5"/>
                <line x1="55" y1="53" x2="65" y2="53" stroke="#0284C7" stroke-width="2.5"/>
                <path d="M42 54 Q46 49 50 54" stroke="#0F172A" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M70 54 Q74 49 78 54" stroke="#0F172A" stroke-width="3" fill="none" stroke-linecap="round"/>
                <!-- Big happy smile -->
                <path d="M48 68 Q60 82 72 68" stroke="#1E293B" stroke-width="3" fill="#E11D48"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#00C9A7"/>
                <circle cx="78" cy="98" r="8" fill="#FACC15"/>
                <text x="75" y="102" font-size="10" font-weight="bold" fill="#78350F">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_4",
        bedNumber: "Bed 104 - Bangsal Respirasi",
        name: "Mas Reza",
        age: "18 Tahun",
        gender: "Laki-laki",
        condition: "Eksaserbasi Asma Bronkial Akut",
        organSystem: "Sistem Pernapasan & Gas Darah",
        badgeColor: "#06B6D4",
        complaint: "Dada terasa sangat tertekan, napas berbunyi 'ngik-ngik' nyaring, kesulitan bernapas setelah jogging sore.",
        initialVitals: {
            hr: 122,
            temp: 36.7,
            spo2: 90,            // Hipoksemia
            bp: "135/85 mmHg"
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
                <!-- Short spiky hair -->
                <path d="M30 45 L35 30 L45 35 L55 25 L65 35 L75 26 L85 35 L90 45 Z" fill="#1E293B"/>
                <!-- Head with mild cyanosis tint -->
                <circle cx="60" cy="55" r="32" fill="#E0F2FE"/>
                <!-- Wide anxious eyes -->
                <circle cx="46" cy="50" r="5" fill="#0F172A"/>
                <circle cx="48" cy="48" r="1.5" fill="#FFF"/>
                <circle cx="74" cy="50" r="5" fill="#0F172A"/>
                <circle cx="76" cy="48" r="1.5" fill="#FFF"/>
                <!-- Oxygen nasal cannula -->
                <path d="M30 60 Q60 67 90 60" stroke="#38BDF8" stroke-width="2.5" fill="none"/>
                <line x1="56" y1="62" x2="56" y2="58" stroke="#38BDF8" stroke-width="3"/>
                <line x1="64" y1="62" x2="64" y2="58" stroke="#38BDF8" stroke-width="3"/>
                <!-- Gasping mouth -->
                <ellipse cx="60" cy="72" rx="6" ry="8" fill="#0284C7"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#BAE6FD"/>
                <!-- Sweat of struggle -->
                <path d="M85 45 Q88 50 85 53 A2 2 0 0 1 82 50 Q82 47 85 45" fill="#38BDF8"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Cool spiky hair -->
                <path d="M30 45 L35 30 L45 35 L55 25 L65 35 L75 26 L85 35 L90 45 Z" fill="#0F172A"/>
                <!-- Warm healthy face -->
                <circle cx="60" cy="55" r="32" fill="#FED7AA"/>
                <circle cx="43" cy="62" r="5" fill="#F472B6" opacity="0.6"/>
                <circle cx="77" cy="62" r="5" fill="#F472B6" opacity="0.6"/>
                <!-- Relaxed wink / confident eyes -->
                <circle cx="46" cy="52" r="4" fill="#0F172A"/>
                <circle cx="48" cy="50" r="1.5" fill="#FFF"/>
                <path d="M70 52 Q74 46 78 52" stroke="#0F172A" stroke-width="3" fill="none" stroke-linecap="round"/>
                <!-- Relaxed smile -->
                <path d="M48 68 Q60 80 72 68" stroke="#1E293B" stroke-width="3" fill="#E11D48"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#00C9A7"/>
                <circle cx="78" cy="98" r="8" fill="#FACC15"/>
                <text x="75" y="102" font-size="10" font-weight="bold" fill="#78350F">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_5",
        bedNumber: "Bed 105 - Bangsal Nefrologi",
        name: "Kakek Hasan",
        age: "65 Tahun",
        gender: "Laki-laki",
        condition: "Sindrom Nefrotik & Kegagalan Filtrasi Ginjal",
        organSystem: "Sistem Ekskresi & Osmoregulasi",
        badgeColor: "#8B5CF6",
        complaint: "Kedua tungkai kaki bengkak (edema), buang air kecil sangat sedikit dan berbusa, tekanan darah melonjak tinggi.",
        initialVitals: {
            hr: 82,
            temp: 36.5,
            spo2: 96,
            bp: "175/100 mmHg"    // Hipertensi renal
        },
        healthyVitals: {
            hr: 70,
            temp: 36.5,
            spo2: 98,
            bp: "125/80 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Gray hair on sides & bald top -->
                <path d="M26 55 Q24 35 34 32 Q36 45 32 60 Z" fill="#94A3B8"/>
                <path d="M94 55 Q96 35 86 32 Q84 45 88 60 Z" fill="#94A3B8"/>
                <ellipse cx="60" cy="40" rx="28" ry="16" fill="#F1F5F9"/>
                <!-- Puffy swollen face (edema) -->
                <ellipse cx="60" cy="58" rx="36" ry="32" fill="#E2E8F0"/>
                <!-- Puffy bags under eyes -->
                <ellipse cx="44" cy="58" rx="8" ry="5" fill="#CBD5E1"/>
                <ellipse cx="76" cy="58" rx="8" ry="5" fill="#CBD5E1"/>
                <line x1="40" y1="52" x2="48" y2="52" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
                <line x1="72" y1="52" x2="80" y2="52" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
                <!-- Gray mustache -->
                <path d="M48 68 Q60 64 72 68 Q60 74 48 68" fill="#94A3B8"/>
                <!-- Worried mouth line -->
                <path d="M54 75 Q60 72 66 75" stroke="#475569" stroke-width="2.5" fill="none"/>
                <!-- Hospital Gown -->
                <path d="M26 89 Q60 84 94 89 L100 120 L20 120 Z" fill="#DDD6FE"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Hair -->
                <path d="M26 55 Q24 35 34 32 Q36 45 32 60 Z" fill="#94A3B8"/>
                <path d="M94 55 Q96 35 86 32 Q84 45 88 60 Z" fill="#94A3B8"/>
                <ellipse cx="60" cy="40" rx="26" ry="15" fill="#FED7AA"/>
                <!-- Healthy head without swelling -->
                <circle cx="60" cy="55" r="31" fill="#FED7AA"/>
                <!-- Gentle warm eyes with smile lines -->
                <path d="M40 52 Q46 47 52 52" stroke="#1E293B" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M68 52 Q74 47 80 52" stroke="#1E293B" stroke-width="3" fill="none" stroke-linecap="round"/>
                <!-- Cheerful mustache & smile -->
                <path d="M46 66 Q60 62 74 66 Q60 72 46 66" fill="#64748B"/>
                <path d="M52 73 Q60 80 68 73" stroke="#1E293B" stroke-width="2.5" fill="#E11D48"/>
                <!-- Hospital Gown -->
                <path d="M28 87 Q60 82 92 87 L98 120 L22 120 Z" fill="#00C9A7"/>
                <circle cx="78" cy="98" r="8" fill="#FACC15"/>
                <text x="75" y="102" font-size="10" font-weight="bold" fill="#78350F">✓</text>
            </svg>`
        }
    },
    {
        id: "patient_6",
        bedNumber: "Bed 106 - Bangsal Genetika Molekuler",
        name: "Nadia",
        age: "17 Tahun",
        gender: "Perempuan",
        condition: "Talasemia Beta & Gangguan Rantai Globin",
        organSystem: "Genetika & Sintesis Protein",
        badgeColor: "#10B981",
        complaint: "Kulit tampak kekuningan (ikterus ringan), perut membesar akibat splenomegali, lelah saat aktivitas sekolah.",
        initialVitals: {
            hr: 104,
            temp: 36.8,
            spo2: 94,
            bp: "100/65 mmHg"
        },
        healthyVitals: {
            hr: 74,
            temp: 36.6,
            spo2: 99,
            bp: "115/75 mmHg"
        },
        avatarSvg: {
            sick: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg">
                <!-- Long dark hair with bangs -->
                <path d="M30 40 Q20 85 24 100" stroke="#0F172A" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M90 40 Q100 85 96 100" stroke="#0F172A" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M28 45 C25 18, 95 18, 92 45 Z" fill="#0F172A"/>
                <rect x="36" y="32" width="48" height="15" rx="3" fill="#0F172A"/>
                <!-- Slightly jaundiced pale face -->
                <circle cx="60" cy="56" r="31" fill="#FEF3C7"/>
                <!-- Sad eyes with yellow sclera tinge -->
                <ellipse cx="46" cy="54" rx="5" ry="4" fill="#FEF9C3"/>
                <circle cx="46" cy="54" r="3" fill="#1E293B"/>
                <ellipse cx="74" cy="54" rx="5" ry="4" fill="#FEF9C3"/>
                <circle cx="74" cy="54" r="3" fill="#1E293B"/>
                <!-- Gentle faint smile -->
                <path d="M52 72 Q60 70 68 72" stroke="#78350F" stroke-width="2.5" fill="none"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#CCFBF1"/>
            </svg>`,
            cured: `
            <svg viewBox="0 0 120 120" class="patient-avatar-svg cured-anim">
                <!-- Shiny dark hair with flower pin -->
                <path d="M30 40 Q20 85 24 100" stroke="#0F172A" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M90 40 Q100 85 96 100" stroke="#0F172A" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M28 45 C25 18, 95 18, 92 45 Z" fill="#0F172A"/>
                <rect x="36" y="32" width="48" height="15" rx="3" fill="#0F172A"/>
                <!-- Flower pin -->
                <circle cx="82" cy="36" r="5" fill="#38BDF8"/>
                <circle cx="82" cy="36" r="2" fill="#FDE047"/>
                <!-- Bright glowing face -->
                <circle cx="60" cy="56" r="31" fill="#FED7AA"/>
                <circle cx="44" cy="64" r="5" fill="#F472B6" opacity="0.6"/>
                <circle cx="76" cy="64" r="5" fill="#F472B6" opacity="0.6"/>
                <!-- Sparkling animated eyes -->
                <circle cx="47" cy="53" r="4.5" fill="#0F172A"/>
                <circle cx="49" cy="51" r="1.5" fill="#FFF"/>
                <circle cx="73" cy="53" r="4.5" fill="#0F172A"/>
                <circle cx="75" cy="51" r="1.5" fill="#FFF"/>
                <!-- Radiant smile -->
                <path d="M49 68 Q60 82 71 68" stroke="#1E293B" stroke-width="3" fill="#E11D48"/>
                <!-- Hospital Gown -->
                <path d="M30 87 Q60 82 90 87 L98 120 L22 120 Z" fill="#00C9A7"/>
                <circle cx="78" cy="98" r="8" fill="#FACC15"/>
                <text x="75" y="102" font-size="10" font-weight="bold" fill="#78350F">✓</text>
            </svg>`
        }
    }
];

// Helper to get patient by ID
function getPatientById(id) {
    return PATIENTS_DATA.find(p => p.id === id);
}

// Export to window
window.PATIENTS_DATA = PATIENTS_DATA;
window.getPatientById = getPatientById;
