/**
 * Biology Champions: Klinik Dokter Usagi (Chiikawa Bio Care)
 * Game Engine & Interactive Doctor Usagi Controller
 * Manages 2-room exploration (Ruang Pemeriksaan & Ruang Obat), character walking,
 * patient interactions, quiz flow, medicine retrieval, and celebrations
 */

class BiologyGame {
    constructor() {
        // Player & Doctor Usagi State
        this.nurseName = "Dokter Usagi";
        this.nurseAvatar = "🐰";
        this.nurseRank = "Dokter Spesialis Biologi SMA";
        this.xp = 0;
        this.stars = 0;
        this.curedCount = 0;

        // Ward State
        this.activePatientId = "patient_1";
        this.patientProgress = {}; // { [patientId]: { completedTools: Set, recovery: 0, isCured: false } }
        
        // Active Question State
        this.currentQuestion = null;
        this.currentTool = null;
        this.hasAnswered = false;

        // Inventory & Medicine Pickup State
        this.carryingMedicine = null; // null or medicine object
        this.activeMission = "Periksa pasien di Ruang Pemeriksaan!";

        // Usagi Walking & Physics State
        this.usagiX = 240;      // Start near patient bed in Ruang Periksa
        this.usagiY = 240;
        this.usagiSpeed = 220;  // Pixels per second
        this.targetX = null;    // For click-to-walk
        this.targetY = null;
        this.keysDown = {};
        this.facingRight = true;
        this.isWalking = false;
        this.activeInteractTarget = null; // 'bed' or 'pharmacy' or null
        this.animFrameId = null;
        this.lastFrameTime = performance.now();

        // World Bounds (Width: 1080px, Height: 420px)
        this.worldWidth = 1080;
        this.worldHeight = 420;
        this.bedPos = { x: 130, y: 220 };
        this.shelvesPos = { x: 820, y: 170 };

        // EKG Canvas State
        this.ekgCanvas = null;
        this.ekgCtx = null;
        this.ekgAnimId = null;
        this.ekgPoints = [];
        this.ekgX = 0;
        this.currentHeartRate = 80;

        // Confetti Canvas State
        this.confettiCanvas = null;
        this.confettiCtx = null;
        this.confettiParticles = [];
        this.confettiAnimId = null;

        // Init progress tracker for each patient
        PATIENTS_DATA.forEach(p => {
            this.patientProgress[p.id] = {
                completedTools: new Set(),
                recovery: 0,
                isCured: false
            };
        });
    }

    init() {
        this.setupDOMElements();
        this.bindEvents();
        this.initEKG();
        this.initConfetti();
        this.initUsagiController();
        this.renderRoster();
    }

    setupDOMElements() {
        // Screens
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.wardScreen = document.getElementById('wardScreen');

        // Modals
        this.questionModal = document.getElementById('questionModal');
        this.celebrationModal = document.getElementById('celebrationModal');
        this.encyclopediaModal = document.getElementById('encyclopediaModal');
        this.microscopeModal = document.getElementById('microscopeModal');
        this.medicineCabinetModal = document.getElementById('medicineCabinetModal');

        // Topbar displays
        this.dispNurseName = document.getElementById('dispNurseName');
        this.dispNurseRank = document.getElementById('dispNurseRank');
        this.dispNurseAvatar = document.getElementById('dispNurseAvatar');
        this.dispXp = document.getElementById('dispXp');
        this.dispPatientsCount = document.getElementById('dispPatientsCount');

        // Bed & Patient displays
        this.patientBedNumber = document.getElementById('patientBedNumber');
        this.patientName = document.getElementById('patientName');
        this.patientMeta = document.getElementById('patientMeta');
        this.patientComplaint = document.getElementById('patientComplaint');
        this.patientAvatarBox = document.getElementById('patientAvatarBox');
        this.recoveryFill = document.getElementById('recoveryFill');
        this.recoveryPercentText = document.getElementById('recoveryPercentText');

        // Vital Signs Displays
        this.vitalHR = document.getElementById('vitalHR');
        this.vitalSpO2 = document.getElementById('vitalSpO2');
        this.vitalTemp = document.getElementById('vitalTemp');
        this.vitalBP = document.getElementById('vitalBP');
        this.organTagBadge = document.getElementById('organTagBadge');
        this.clinicalDiagnosis = document.getElementById('clinicalDiagnosis');

        // Medical Tools
        this.toolButtons = document.querySelectorAll('.medical-tool-btn');

        // Interactive Walkable Hospital Elements
        this.hospitalStage = document.getElementById('hospitalStage');
        this.hospitalWorld = document.getElementById('hospitalWorld');
        this.usagiCharacter = document.getElementById('usagiCharacter');
        this.usagiCarriedItem = document.getElementById('usagiCarriedItem');
        this.usagiSpeechBubble = document.getElementById('usagiSpeechBubble');
        this.stageInteractPrompt = document.getElementById('stageInteractPrompt');
        this.missionBannerText = document.getElementById('missionBannerText');
        this.usagiInventoryText = document.getElementById('usagiInventoryText');

        // Stage Bed & Shelves
        this.stagePatientBed = document.getElementById('stagePatientBed');
        this.stagePatientAvatar = document.getElementById('stagePatientAvatar');
        this.stageBedComplaint = document.getElementById('stageBedComplaint');
        this.stagePharmacyShelves = document.getElementById('stagePharmacyShelves');
    }

    bindEvents() {
        // Welcome avatar selections
        const avatarChoices = document.querySelectorAll('.avatar-choice');
        avatarChoices.forEach(choice => {
            choice.addEventListener('click', () => {
                avatarChoices.forEach(c => c.classList.remove('active'));
                choice.classList.add('active');
                this.nurseAvatar = choice.dataset.avatar || "🐰";
                window.soundSystem.playToolClick();
            });
        });

        // Start shift button
        const btnStartGame = document.getElementById('btnStartGame');
        if (btnStartGame) {
            btnStartGame.addEventListener('click', () => this.startShift());
        }

        // Sound Mute Toggle
        const btnToggleSound = document.getElementById('btnToggleSound');
        if (btnToggleSound) {
            btnToggleSound.addEventListener('click', () => {
                const muted = window.soundSystem.toggleMute();
                btnToggleSound.innerHTML = muted ? '🔇' : '🔊';
                btnToggleSound.title = muted ? 'Aktifkan Suara' : 'Bisukan Suara';
            });
        }

        // Ambient Music Toggle
        const btnToggleMusic = document.getElementById('btnToggleMusic');
        if (btnToggleMusic) {
            btnToggleMusic.addEventListener('click', () => {
                const playing = window.soundSystem.toggleAmbient();
                btnToggleMusic.style.borderColor = playing ? '#00C9A7' : '#CBD5E1';
                btnToggleMusic.style.background = playing ? '#F0FDFA' : 'white';
            });
        }

        // Pocket Book / Encyclopedia Toggle
        const btnOpenBook = document.getElementById('btnOpenBook');
        const btnCloseEncyclopedia = document.getElementById('btnCloseEncyclopedia');
        if (btnOpenBook) {
            btnOpenBook.addEventListener('click', () => this.openEncyclopedia());
        }
        if (btnCloseEncyclopedia) {
            btnCloseEncyclopedia.addEventListener('click', () => this.closeEncyclopedia());
        }

        // Encyclopedia tabs
        const encyclopediaTabs = document.querySelectorAll('.encyclopedia-tab');
        encyclopediaTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                encyclopediaTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetTopic = tab.dataset.topic;
                document.querySelectorAll('.encyclopedia-topic-content').forEach(c => c.classList.remove('active'));
                const targetContent = document.getElementById(`topic_${targetTopic}`);
                if (targetContent) targetContent.classList.add('active');
                window.soundSystem.playToolClick();
            });
        });

        // Tool buttons click
        this.toolButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const toolType = btn.dataset.tool;
                this.handleToolClick(toolType);
            });
        });

        // Question modal close
        const btnCloseQuestion = document.getElementById('btnCloseQuestion');
        if (btnCloseQuestion) {
            btnCloseQuestion.addEventListener('click', () => this.closeQuestionModal());
        }

        // Hint button
        const btnHint = document.getElementById('btnHint');
        if (btnHint) {
            btnHint.addEventListener('click', () => this.showQuestionHint());
        }

        // Continue next button
        const btnContinueNext = document.getElementById('btnContinueNext');
        if (btnContinueNext) {
            btnContinueNext.addEventListener('click', () => this.closeQuestionModal());
        }

        // Celebration Next Patient button
        const btnNextPatient = document.getElementById('btnNextPatient');
        if (btnNextPatient) {
            btnNextPatient.addEventListener('click', () => this.handleNextPatient());
        }

        // Close microscope modal
        const btnCloseMicroscope = document.getElementById('btnCloseMicroscope');
        if (btnCloseMicroscope) {
            btnCloseMicroscope.addEventListener('click', () => {
                this.microscopeModal.classList.remove('active');
            });
        }

        // Close Medicine Cabinet Modal
        const btnCloseCabinet = document.getElementById('btnCloseCabinet');
        if (btnCloseCabinet) {
            btnCloseCabinet.addEventListener('click', () => {
                if (this.medicineCabinetModal) this.medicineCabinetModal.classList.remove('active');
            });
        }

        // Quick Travel buttons
        const btnGoExam = document.getElementById('btnGoExam');
        if (btnGoExam) {
            btnGoExam.addEventListener('click', () => {
                this.walkTo(250, 240);
                this.showUsagiSpeech("YAHA! Menuju Ruang Periksa!");
            });
        }

        const btnGoPharmacy = document.getElementById('btnGoPharmacy');
        if (btnGoPharmacy) {
            btnGoPharmacy.addEventListener('click', () => {
                this.walkTo(780, 240);
                this.showUsagiSpeech("URA! Menuju Ruang Obat!");
            });
        }

        // Mobile On-Screen D-Pad and Action button
        const dpadUp = document.getElementById('dpadUp');
        const dpadDown = document.getElementById('dpadDown');
        const dpadLeft = document.getElementById('dpadLeft');
        const dpadRight = document.getElementById('dpadRight');
        const btnMobileAction = document.getElementById('btnMobileAction');

        const bindDpadButton = (btn, keyName) => {
            if (!btn) return;
            const startPress = (e) => {
                e.preventDefault();
                this.keysDown[keyName] = true;
                this.targetX = null; // override click-to-walk
                this.targetY = null;
            };
            const endPress = (e) => {
                e.preventDefault();
                this.keysDown[keyName] = false;
            };
            btn.addEventListener('mousedown', startPress);
            btn.addEventListener('mouseup', endPress);
            btn.addEventListener('mouseleave', endPress);
            btn.addEventListener('touchstart', startPress, { passive: false });
            btn.addEventListener('touchend', endPress, { passive: false });
        };

        bindDpadButton(dpadUp, 'ArrowUp');
        bindDpadButton(dpadDown, 'ArrowDown');
        bindDpadButton(dpadLeft, 'ArrowLeft');
        bindDpadButton(dpadRight, 'ArrowRight');

        if (btnMobileAction) {
            btnMobileAction.addEventListener('click', () => this.handleActionTrigger());
        }

        // Stage click/tap to walk
        if (this.hospitalWorld) {
            this.hospitalWorld.addEventListener('click', (e) => {
                // If clicked an interactive button or popup, don't walk
                if (e.target.closest('.interactive-clickable') || e.target.closest('button')) {
                    return;
                }
                const rect = this.hospitalWorld.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;
                this.walkTo(clickX, clickY);
            });
        }

        // Interactive stage objects click
        if (this.stagePatientBed) {
            this.stagePatientBed.addEventListener('click', (e) => {
                e.stopPropagation();
                // Walk toward bed and interact
                this.walkTo(this.bedPos.x + 90, this.bedPos.y + 20, () => {
                    this.handleActionTrigger();
                });
            });
        }

        if (this.stagePharmacyShelves) {
            this.stagePharmacyShelves.addEventListener('click', (e) => {
                e.stopPropagation();
                // Walk toward shelves and open cabinet
                this.walkTo(this.shelvesPos.x, this.shelvesPos.y + 70, () => {
                    this.handleActionTrigger();
                });
            });
        }

        if (this.stageInteractPrompt) {
            this.stageInteractPrompt.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleActionTrigger();
            });
        }
    }

    startShift() {
        const inputName = document.getElementById('nurseNameInput');
        if (inputName && inputName.value.trim()) {
            this.nurseName = inputName.value.trim();
        }

        this.dispNurseName.textContent = this.nurseName;
        this.dispNurseAvatar.textContent = this.nurseAvatar;
        this.dispNurseRank.textContent = this.nurseRank;

        window.soundSystem.playCorrect();
        this.showUsagiSpeech("YAHA! Selamat Datang di Klinik Bio!");
        this.welcomeScreen.style.display = 'none';
        this.wardScreen.style.display = 'grid';

        // Load default first patient
        this.loadPatient(this.activePatientId);

        // Position Usagi in examination room
        this.usagiX = 250;
        this.usagiY = 240;
        this.updateUsagiPositionVisual();
    }

    renderRoster() {
        const rosterContainer = document.getElementById('patientRosterList');
        if (!rosterContainer) return;

        rosterContainer.innerHTML = '';
        PATIENTS_DATA.forEach(patient => {
            const progress = this.patientProgress[patient.id];
            const isCured = progress.isCured;
            const isActive = patient.id === this.activePatientId;

            const item = document.createElement('div');
            item.className = `patient-roster-item ${isActive ? 'active' : ''} ${isCured ? 'cured' : ''}`;
            item.onclick = () => this.loadPatient(patient.id);

            item.innerHTML = `
                <div class="roster-avatar-box">
                    ${isCured ? '💖' : '🐰'}
                </div>
                <div class="roster-info">
                    <div class="roster-name">${patient.name}</div>
                    <div class="roster-condition">${patient.condition}</div>
                    <span class="roster-status-badge ${isCured ? 'status-cured' : 'status-treating'}">
                        ${isCured ? '✓ Sudah Sembuh' : `Dalam Perawatan (${progress.recovery}%)`}
                    </span>
                </div>
            `;
            rosterContainer.appendChild(item);
        });
    }

    loadPatient(patientId) {
        this.activePatientId = patientId;
        const patient = getPatientById(patientId);
        if (!patient) return;

        const progress = this.patientProgress[patientId];

        // Update Bed displays
        this.patientBedNumber.textContent = patient.bedNumber;
        this.patientName.textContent = patient.name;
        this.patientMeta.textContent = `${patient.age} • ${patient.gender} • ${patient.condition}`;
        this.patientComplaint.textContent = `"${patient.complaint}"`;
        this.organTagBadge.textContent = patient.organSystem;
        this.clinicalDiagnosis.textContent = patient.condition;

        // Update Bed avatars
        const avatarSvg = progress.isCured ? patient.avatarSvg.cured : patient.avatarSvg.sick;
        this.patientAvatarBox.innerHTML = avatarSvg;
        if (this.stagePatientAvatar) {
            this.stagePatientAvatar.innerHTML = avatarSvg;
        }
        if (this.stageBedComplaint) {
            this.stageBedComplaint.textContent = progress.isCured ? `"${patient.curedDialog}"` : `"${patient.complaint}"`;
        }

        // Update Recovery bar
        this.updateRecoveryDisplay(progress.recovery);

        // Update Vitals based on recovery
        this.updateVitals(patient, progress.recovery);

        // Update Tools button state
        this.updateToolButtonsState(patientId);

        // Update Mission HUD
        this.updateMissionHUD();

        // Re-render roster to reflect active class
        this.renderRoster();

        window.soundSystem.playHeartbeat();
    }

    updateRecoveryDisplay(percent) {
        this.recoveryFill.style.width = `${percent}%`;
        this.recoveryPercentText.textContent = `${percent}% Kesembuhan`;

        if (percent === 100) {
            this.recoveryFill.style.background = 'linear-gradient(90deg, #10B981, #00C9A7)';
        } else {
            this.recoveryFill.style.background = 'linear-gradient(90deg, #00B4D8, #00C9A7)';
        }
    }

    updateVitals(patient, recoveryPercent) {
        const factor = recoveryPercent / 100;
        const init = patient.initialVitals;
        const target = patient.healthyVitals;

        // Smoothly interpolate HR
        const currentHR = Math.round(init.hr + (target.hr - init.hr) * factor);
        this.currentHeartRate = currentHR;
        this.vitalHR.textContent = currentHR;

        // Temp
        const currentTemp = (init.temp + (target.temp - init.temp) * factor).toFixed(1);
        this.vitalTemp.textContent = `${currentTemp}°C`;

        // SpO2
        const currentSpO2 = Math.round(init.spo2 + (target.spo2 - init.spo2) * factor);
        this.vitalSpO2.textContent = `${currentSpO2}%`;

        // BP
        this.vitalBP.textContent = recoveryPercent === 100 ? target.bp : init.bp;
    }

    updateToolButtonsState(patientId) {
        const progress = this.patientProgress[patientId];
        const completed = progress.completedTools;

        this.toolButtons.forEach(btn => {
            const toolType = btn.dataset.tool;
            btn.classList.remove('completed', 'ready');

            if (completed.has(toolType)) {
                btn.classList.add('completed');
            } else {
                // If not completed, make it ready to click
                btn.classList.add('ready');
            }
        });
    }

    handleToolClick(toolType) {
        window.soundSystem.playToolClick();

        const patient = getPatientById(this.activePatientId);
        const question = getQuestionForPatientAndTool(this.activePatientId, toolType);

        if (!question) {
            alert("Tidak ada interaksi khusus untuk alat ini pada pasien ini.");
            return;
        }

        // If microscope, show brief specimen view before clipboard
        if (toolType === 'microscope') {
            this.showMicroscopeSlide(patient, question);
        } else {
            this.openQuestionModal(question, toolType);
        }
    }

    showMicroscopeSlide(patient, question) {
        const specimenSvgBox = document.getElementById('microscopeSpecimenSvg');
        const specimenTitle = document.getElementById('microscopeSpecimenTitle');

        if (specimenTitle) {
            specimenTitle.textContent = `Apusan Mikroskopis: ${patient.name} (${question.stageTitle})`;
        }

        // Render dynamic cell specimen graphic based on patient
        let cellSvg = '';
        if (patient.id === 'patient_1') {
            // Stomach mucosa cells with mucus
            cellSvg = `
                <svg viewBox="0 0 100 100" class="specimen-cell-svg">
                    <rect x="10" y="10" width="80" height="80" rx="10" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
                    <circle cx="35" cy="35" r="14" fill="#F472B6"/>
                    <circle cx="65" cy="35" r="14" fill="#F472B6"/>
                    <circle cx="50" cy="65" r="16" fill="#F472B6"/>
                    <circle cx="35" cy="35" r="5" fill="#831843"/>
                    <circle cx="65" cy="35" r="5" fill="#831843"/>
                    <circle cx="50" cy="65" r="6" fill="#831843"/>
                </svg>
            `;
        } else if (patient.id === 'patient_2') {
            // Microcytic pale RBCs
            cellSvg = `
                <svg viewBox="0 0 100 100" class="specimen-cell-svg">
                    <circle cx="50" cy="50" r="38" fill="#FDA4AF" stroke="#E11D48" stroke-width="2"/>
                    <circle cx="50" cy="50" r="22" fill="#FFE4E6"/>
                    <circle cx="26" cy="26" r="8" fill="#FDA4AF"/>
                    <circle cx="76" cy="28" r="9" fill="#FDA4AF"/>
                    <circle cx="72" cy="74" r="10" fill="#FDA4AF"/>
                </svg>
            `;
        } else {
            // General cellular slide
            cellSvg = `
                <svg viewBox="0 0 100 100" class="specimen-cell-svg">
                    <rect x="15" y="15" width="70" height="70" rx="35" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/>
                    <circle cx="50" cy="50" r="18" fill="#1E3E62"/>
                    <circle cx="53" cy="47" r="6" fill="#67E8F9"/>
                </svg>
            `;
        }

        if (specimenSvgBox) specimenSvgBox.innerHTML = cellSvg;
        this.microscopeModal.classList.add('active');

        const btnInspectQuestion = document.getElementById('btnInspectQuestion');
        if (btnInspectQuestion) {
            btnInspectQuestion.onclick = () => {
                this.microscopeModal.classList.remove('active');
                this.openQuestionModal(question, 'microscope');
            };
        }
    }

    openQuestionModal(question, toolType) {
        this.currentQuestion = question;
        this.currentTool = toolType;
        this.hasAnswered = false;

        // Set Headers
        document.getElementById('modalToolBadge').textContent = `🩺 Interaksi: ${question.toolName}`;
        document.getElementById('modalTopicTag').textContent = `Materi SMA: ${question.topicTag}`;
        document.getElementById('modalContextText').textContent = question.context;
        document.getElementById('modalQuestionText').textContent = question.question;

        // Reset Feedback
        const feedbackBox = document.getElementById('modalFeedbackBox');
        feedbackBox.className = 'feedback-box';
        feedbackBox.style.display = 'none';

        // Reset Continue button
        const btnContinue = document.getElementById('btnContinueNext');
        btnContinue.classList.remove('active');

        // Render Options
        const optionsContainer = document.getElementById('modalOptionsList');
        optionsContainer.innerHTML = '';

        const letters = ['A', 'B', 'C', 'D'];
        question.options.forEach((optText, index) => {
            const optDiv = document.createElement('div');
            optDiv.className = 'option-item';
            optDiv.innerHTML = `
                <div class="option-letter">${letters[index]}</div>
                <div class="option-text">${optText}</div>
            `;
            optDiv.onclick = () => this.handleOptionSelect(index, optDiv);
            optionsContainer.appendChild(optDiv);
        });

        this.questionModal.classList.add('active');
    }

    handleOptionSelect(selectedIndex, selectedDiv) {
        if (this.hasAnswered) return;

        const q = this.currentQuestion;
        const isCorrect = selectedIndex === q.correctIndex;
        const allOptionElements = document.querySelectorAll('.option-item');
        const feedbackBox = document.getElementById('modalFeedbackBox');
        const feedbackTitle = document.getElementById('modalFeedbackTitle');
        const feedbackText = document.getElementById('modalFeedbackText');
        const btnContinue = document.getElementById('btnContinueNext');

        if (isCorrect) {
            this.hasAnswered = true;
            window.soundSystem.playCorrect();

            selectedDiv.classList.add('correct');
            allOptionElements.forEach(el => el.classList.add('disabled'));

            // Show explanation with Usagi's joyful vibe
            feedbackBox.className = 'feedback-box success active';
            feedbackTitle.innerHTML = '🎉 YAHA! Jawaban Tepat!';
            feedbackText.innerHTML = `<strong>Pembahasan Biologi SMA:</strong> ${q.explanation}`;

            // Add Rewards
            this.addRewards(150, 1);

            // Progress patient recovery
            this.applySuccessfulTool(this.activePatientId, this.currentTool);

            // If this was prescription/treatment tool, hint the player to fetch medicine from pharmacy
            if (this.currentTool === 'treatment') {
                const patient = getPatientById(this.activePatientId);
                this.showUsagiSpeech("YAHA! Resep selesai! Ayo ke Ruang Obat!");
                this.activeMission = `Jalan ke Ruang Obat dan ambil: ${patient.targetMedicineName}!`;
                this.updateMissionHUD();
            }

            btnContinue.classList.add('active');
        } else {
            window.soundSystem.playWrong();
            selectedDiv.classList.add('wrong');

            feedbackBox.className = 'feedback-box error active';
            feedbackTitle.innerHTML = '⚠️ Haa?! Usagi Menggeleng!';
            feedbackText.innerHTML = `
                <strong>Petunjuk Biologis:</strong> ${q.hint}<br>
                <em>Coba pikirkan fungsi organ tubuh dan konsep dasarnya ya!</em>
            `;

            setTimeout(() => {
                selectedDiv.classList.remove('wrong');
            }, 900);
        }
    }

    applySuccessfulTool(patientId, toolType) {
        const progress = this.patientProgress[patientId];
        if (!progress.completedTools.has(toolType)) {
            progress.completedTools.add(toolType);

            // Each tool gives progress
            const newRecovery = Math.min(80, progress.completedTools.size * 16);
            progress.recovery = newRecovery;

            this.updateRecoveryDisplay(newRecovery);
            const patient = getPatientById(patientId);
            this.updateVitals(patient, newRecovery);
            this.updateToolButtonsState(patientId);
            this.renderRoster();
        }
    }

    addRewards(xpPoints, starsCount) {
        this.xp += xpPoints;
        this.stars += starsCount;

        this.dispXp.textContent = `${this.xp} XP`;

        // Check Rank Up
        if (this.xp >= 1500) {
            this.nurseRank = "Master Dokter Usagi 🌟";
        } else if (this.xp >= 900) {
            this.nurseRank = "Dokter Utama Klinik Chiikawa";
        } else if (this.xp >= 450) {
            this.nurseRank = "Dokter Muda Teladan";
        } else if (this.xp >= 150) {
            this.nurseRank = "Dokter Usagi Spesialis Biologi SMA";
        }
        this.dispNurseRank.textContent = this.nurseRank;
    }

    showQuestionHint() {
        if (!this.currentQuestion) return;
        const feedbackBox = document.getElementById('modalFeedbackBox');
        const feedbackTitle = document.getElementById('modalFeedbackTitle');
        const feedbackText = document.getElementById('modalFeedbackText');

        feedbackBox.className = 'feedback-box error active';
        feedbackTitle.innerHTML = '💡 Petunjuk Dokter Usagi:';
        feedbackText.textContent = this.currentQuestion.hint;
        window.soundSystem.playToolClick();
    }

    closeQuestionModal() {
        this.questionModal.classList.remove('active');
    }

    // =========================================================================
    // Pharmacy / Ruangan Obat-obatan System
    // =========================================================================
    openMedicineCabinet() {
        const patient = getPatientById(this.activePatientId);
        const progress = this.patientProgress[this.activePatientId];

        const cabinetModal = this.medicineCabinetModal;
        const cabinetPatientCase = document.getElementById('cabinetPatientCase');
        const cabinetMedicineGrid = document.getElementById('cabinetMedicineGrid');

        if (!cabinetModal || !cabinetMedicineGrid) return;

        window.soundSystem.playToolClick();
        this.showUsagiSpeech("PULULU! Pilih obat yang tepat!");

        // Set Patient Case Summary
        if (cabinetPatientCase) {
            cabinetPatientCase.innerHTML = `
                <div class="cabinet-patient-badge">Pasien: <strong>${patient.name}</strong></div>
                <div class="cabinet-case-detail">
                    <strong>Keluhan:</strong> ${patient.complaint}<br>
                    <strong>Target Biologi:</strong> ${patient.organSystem} (${patient.condition})
                </div>
            `;
        }

        // Render Medicines
        cabinetMedicineGrid.innerHTML = '';
        PHARMACY_MEDICINES.forEach(med => {
            const isTarget = med.id === patient.targetMedicineId;
            const medCard = document.createElement('div');
            medCard.className = 'medicine-card-item';
            medCard.innerHTML = `
                <div class="med-icon-box" style="background: ${med.color}22; border-color: ${med.color}">
                    <span class="med-emoji">${med.icon}</span>
                </div>
                <div class="med-card-info">
                    <span class="med-shelf-tag">${med.shelfTag}</span>
                    <h4 class="med-card-name">${med.name}</h4>
                    <p class="med-card-target">🎯 ${med.organTarget}</p>
                    <p class="med-card-desc">${med.description}</p>
                </div>
                <button class="btn-select-medicine">Ambil Obat 📦</button>
            `;

            medCard.onclick = () => this.handleMedicineSelect(med, isTarget);
            cabinetMedicineGrid.appendChild(medCard);
        });

        cabinetModal.classList.add('active');
    }

    handleMedicineSelect(medicine, isCorrect) {
        const patient = getPatientById(this.activePatientId);

        if (isCorrect) {
            // Correct medicine selected!
            this.carryingMedicine = medicine;
            window.soundSystem.playItemPickup();
            this.showUsagiSpeech("YAHA! Obat berhasil diambil!");

            // Update inventory HUD
            if (this.usagiInventoryText) {
                this.usagiInventoryText.innerHTML = `Membawa: <strong>${medicine.icon} ${medicine.name}</strong>`;
            }
            if (this.usagiCarriedItem) {
                this.usagiCarriedItem.innerHTML = medicine.icon;
                this.usagiCarriedItem.style.display = 'block';
            }

            // Update Mission HUD
            this.activeMission = `Bawa ${medicine.name} kembali ke Ruang Pemeriksaan untuk ${patient.name}!`;
            this.updateMissionHUD();

            // Close modal
            if (this.medicineCabinetModal) {
                this.medicineCabinetModal.classList.remove('active');
            }

            // Walk back hint
            setTimeout(() => {
                this.showUsagiSpeech("Ayo berikan obatnya ke pasien!");
            }, 600);
        } else {
            // Wrong medicine selected
            window.soundSystem.playWrong();
            this.showUsagiSpeech("HAA?! Bukan obat ini!");
            alert(`Haa?! Usagi menggeleng: ${medicine.name} bukan obat yang tepat untuk ${patient.name} (${patient.condition})!\n\nPetunjuk: Periksa kembali organ sasaran dan keluhan biologinya.`);
        }
    }

    administerMedicine() {
        const patient = getPatientById(this.activePatientId);
        const progress = this.patientProgress[this.activePatientId];

        if (!this.carryingMedicine || this.carryingMedicine.id !== patient.targetMedicineId) {
            alert(`Usagi belum membawa obat yang sesuai! Jalan ke Ruangan Obat di sebelah kanan untuk mengambil ${patient.targetMedicineName}.`);
            return;
        }

        // Successfully administer medicine!
        progress.isCured = true;
        progress.recovery = 100;
        this.curedCount++;

        this.updateRecoveryDisplay(100);
        this.updateVitals(patient, 100);
        this.dispPatientsCount.textContent = `${this.curedCount} Sembuh`;

        // Update Bed displays to cured
        this.patientAvatarBox.innerHTML = patient.avatarSvg.cured;
        if (this.stagePatientAvatar) {
            this.stagePatientAvatar.innerHTML = patient.avatarSvg.cured;
        }
        if (this.stageBedComplaint) {
            this.stageBedComplaint.textContent = `"${patient.curedDialog}"`;
        }

        // Clear carried medicine
        this.carryingMedicine = null;
        if (this.usagiInventoryText) {
            this.usagiInventoryText.innerHTML = `Tas Kosong (Siap bertugas)`;
        }
        if (this.usagiCarriedItem) {
            this.usagiCarriedItem.style.display = 'none';
        }

        // Add victory rewards
        this.addRewards(200, 2);
        this.renderRoster();

        // Celebration
        window.soundSystem.playPatientCured();
        this.startConfetti();
        this.showUsagiSpeech("YAHA! PULULU! PASIEN SEMBUH!");

        // Open Celebration Modal
        document.getElementById('certPatientName').textContent = patient.name;
        document.getElementById('certCondition').textContent = patient.condition;
        document.getElementById('certOrgan').textContent = patient.organSystem;
        document.getElementById('certNurseSignature').textContent = `${this.nurseName} (${this.nurseRank})`;

        setTimeout(() => {
            this.celebrationModal.classList.add('active');
        }, 500);
    }

    handleNextPatient() {
        this.celebrationModal.classList.remove('active');
        this.stopConfetti();

        // Find next uncured patient
        const nextPatient = PATIENTS_DATA.find(p => !this.patientProgress[p.id].isCured);
        if (nextPatient) {
            this.loadPatient(nextPatient.id);
            this.walkTo(250, 240);
            this.showUsagiSpeech(`Pasien berikutnya: ${nextPatient.name}! YAHA!`);
        } else {
            alert(`🎉 LUAR BIASA! Seluruh pasien Chiikawa di Klinik Dokter Usagi telah berhasil kamu sembuhkan, ${this.nurseName}! Kamu adalah Master Biologi SMA sejati!`);
        }
    }

    updateMissionHUD() {
        const patient = getPatientById(this.activePatientId);
        const progress = this.patientProgress[this.activePatientId];

        if (progress.isCured) {
            this.activeMission = `Pasien ${patient.name} sudah sembuh total! Silakan pilih pasien lain di daftar!`;
        } else if (this.carryingMedicine) {
            this.activeMission = `Bawa ${this.carryingMedicine.name} ke ranjang periksa dan berikan ke ${patient.name}!`;
        } else {
            this.activeMission = `Periksa ${patient.name} di ranjang periksa, lalu ambil ${patient.targetMedicineName} di Ruang Obat!`;
        }

        if (this.missionBannerText) {
            this.missionBannerText.textContent = this.activeMission;
        }
    }

    // =========================================================================
    // Dokter Usagi Walking Controller & Physics
    // =========================================================================
    initUsagiController() {
        window.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
                this.keysDown[e.code] = true;
                this.targetX = null; // override click-to-walk
                this.targetY = null;
            }
            if (e.code === 'Space' || e.code === 'Enter') {
                if (!this.questionModal.classList.contains('active') && !this.celebrationModal.classList.contains('active')) {
                    e.preventDefault();
                    this.handleActionTrigger();
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
                this.keysDown[e.code] = false;
            }
        });

        this.animFrameId = requestAnimationFrame((t) => this.gameLoop(t));
    }

    walkTo(x, y, onArrivalCallback = null) {
        this.targetX = Math.max(50, Math.min(this.worldWidth - 50, x));
        this.targetY = Math.max(120, Math.min(this.worldHeight - 50, y));
        this.onArrivalCallback = onArrivalCallback;
    }

    gameLoop(now) {
        const delta = Math.min(0.1, (now - this.lastFrameTime) / 1000);
        this.lastFrameTime = now;

        this.updateUsagiPhysics(delta);
        this.checkProximityTriggers();

        this.animFrameId = requestAnimationFrame((t) => this.gameLoop(t));
    }

    updateUsagiPhysics(delta) {
        let dx = 0;
        let dy = 0;

        // Check Keyboard controls
        if (this.keysDown['ArrowLeft'] || this.keysDown['KeyA']) dx -= 1;
        if (this.keysDown['ArrowRight'] || this.keysDown['KeyD']) dx += 1;
        if (this.keysDown['ArrowUp'] || this.keysDown['KeyW']) dy -= 1;
        if (this.keysDown['ArrowDown'] || this.keysDown['KeyS']) dy += 1;

        // Check Click-to-walk target
        if (this.targetX !== null && this.targetY !== null) {
            const diffX = this.targetX - this.usagiX;
            const diffY = this.targetY - this.usagiY;
            const dist = Math.hypot(diffX, diffY);

            if (dist > 8) {
                dx = diffX / dist;
                dy = diffY / dist;
            } else {
                this.targetX = null;
                this.targetY = null;
                if (this.onArrivalCallback) {
                    const cb = this.onArrivalCallback;
                    this.onArrivalCallback = null;
                    cb();
                }
            }
        }

        // Apply Movement
        if (dx !== 0 || dy !== 0) {
            this.isWalking = true;
            this.usagiX += dx * this.usagiSpeed * delta;
            this.usagiY += dy * this.usagiSpeed * delta;

            if (dx > 0) this.facingRight = true;
            if (dx < 0) this.facingRight = false;

            window.soundSystem.playFootstep();
        } else {
            this.isWalking = false;
        }

        // Clamp to Room World Boundaries
        this.usagiX = Math.max(40, Math.min(this.worldWidth - 50, this.usagiX));
        this.usagiY = Math.max(120, Math.min(this.worldHeight - 50, this.usagiY));

        this.updateUsagiPositionVisual();
    }

    updateUsagiPositionVisual() {
        if (!this.usagiCharacter) return;

        this.usagiCharacter.style.left = `${this.usagiX}px`;
        this.usagiCharacter.style.top = `${this.usagiY}px`;

        if (this.facingRight) {
            this.usagiCharacter.classList.remove('facing-left');
        } else {
            this.usagiCharacter.classList.add('facing-left');
        }

        if (this.isWalking) {
            this.usagiCharacter.classList.add('walking');
        } else {
            this.usagiCharacter.classList.remove('walking');
        }

        // Auto-scroll viewport if stage overflows
        if (this.hospitalStage) {
            const scrollTarget = this.usagiX - this.hospitalStage.clientWidth / 2;
            this.hospitalStage.scrollLeft = Math.max(0, scrollTarget);
        }
    }

    checkProximityTriggers() {
        if (!this.stageInteractPrompt) return;

        const patient = getPatientById(this.activePatientId);
        const progress = this.patientProgress[this.activePatientId];

        const distToBed = Math.hypot(this.usagiX - this.bedPos.x, this.usagiY - this.bedPos.y);
        const distToShelves = Math.hypot(this.usagiX - this.shelvesPos.x, this.usagiY - this.shelvesPos.y);

        if (distToBed < 120) {
            this.activeInteractTarget = 'bed';
            this.stageInteractPrompt.style.display = 'flex';
            this.stageInteractPrompt.style.left = `${this.bedPos.x}px`;
            this.stageInteractPrompt.style.top = `${this.bedPos.y - 80}px`;

            if (this.carryingMedicine && this.carryingMedicine.id === patient.targetMedicineId) {
                this.stageInteractPrompt.innerHTML = `<span>💊</span> <strong>SPASI / KLIK:</strong> Berikan ${this.carryingMedicine.name} ke ${patient.name}!`;
                this.stageInteractPrompt.className = 'stage-interact-prompt action-cure pulse';
            } else if (progress.isCured) {
                this.stageInteractPrompt.innerHTML = `<span>💖</span> <strong>${patient.name} sudah sembuh total!</strong>`;
                this.stageInteractPrompt.className = 'stage-interact-prompt action-done';
            } else {
                this.stageInteractPrompt.innerHTML = `<span>🩺</span> <strong>SPASI / KLIK:</strong> Periksa Pasien ${patient.name}!`;
                this.stageInteractPrompt.className = 'stage-interact-prompt action-exam pulse';
            }
        } else if (distToShelves < 150) {
            this.activeInteractTarget = 'pharmacy';
            this.stageInteractPrompt.style.display = 'flex';
            this.stageInteractPrompt.style.left = `${this.shelvesPos.x}px`;
            this.stageInteractPrompt.style.top = `${this.shelvesPos.y - 70}px`;
            this.stageInteractPrompt.innerHTML = `<span>📦</span> <strong>SPASI / KLIK:</strong> Buka Lemari Obat Farmasi!`;
            this.stageInteractPrompt.className = 'stage-interact-prompt action-pharmacy pulse';
        } else {
            this.activeInteractTarget = null;
            this.stageInteractPrompt.style.display = 'none';
        }
    }

    handleActionTrigger() {
        if (this.activeInteractTarget === 'bed') {
            const patient = getPatientById(this.activePatientId);
            const progress = this.patientProgress[this.activePatientId];

            if (this.carryingMedicine && this.carryingMedicine.id === patient.targetMedicineId) {
                this.administerMedicine();
            } else if (progress.isCured) {
                this.showUsagiSpeech("Pasien sudah sehat bugar! YAHA!");
            } else {
                // Open first uncompleted tool or default stethoscope question
                const tools = ['stethoscope', 'thermometer', 'bloodLab', 'microscope', 'treatment'];
                const nextTool = tools.find(t => !progress.completedTools.has(t)) || 'stethoscope';
                this.handleToolClick(nextTool);
            }
        } else if (this.activeInteractTarget === 'pharmacy') {
            this.openMedicineCabinet();
        } else {
            // General Usagi chirp
            window.soundSystem.playUsagiUra();
            this.showUsagiSpeech("YAHA! URA!");
        }
    }

    showUsagiSpeech(text) {
        if (!this.usagiSpeechBubble) return;
        this.usagiSpeechBubble.textContent = text;
        this.usagiSpeechBubble.classList.add('active');

        if (this.speechTimeout) clearTimeout(this.speechTimeout);
        this.speechTimeout = setTimeout(() => {
            if (this.usagiSpeechBubble) this.usagiSpeechBubble.classList.remove('active');
        }, 2200);
    }

    openEncyclopedia() {
        window.soundSystem.playToolClick();
        this.encyclopediaModal.classList.add('active');
    }

    closeEncyclopedia() {
        this.encyclopediaModal.classList.remove('active');
    }

    // =========================================================================
    // EKG Oscilloscope Visualizer
    // =========================================================================
    initEKG() {
        this.ekgCanvas = document.getElementById('ekgCanvas');
        if (!this.ekgCanvas) return;
        this.ekgCtx = this.ekgCanvas.getContext('2d');
        this.resizeEKG();
        window.addEventListener('resize', () => this.resizeEKG());
        this.animateEKG();
    }

    resizeEKG() {
        if (!this.ekgCanvas) return;
        const rect = this.ekgCanvas.parentElement.getBoundingClientRect();
        this.ekgCanvas.width = rect.width;
        this.ekgCanvas.height = 75;
    }

    animateEKG() {
        if (!this.ekgCtx || !this.ekgCanvas) return;

        const ctx = this.ekgCtx;
        const width = this.ekgCanvas.width;
        const height = this.ekgCanvas.height;
        const midY = height / 2;

        ctx.fillStyle = 'rgba(4, 13, 26, 0.15)';
        ctx.fillRect(0, 0, width, height);

        const speed = Math.max(2, this.currentHeartRate / 35);
        this.ekgX = (this.ekgX + speed) % width;

        const cycle = this.ekgX % 120;
        let y = midY;

        if (cycle > 20 && cycle < 35) {
            y = midY - Math.sin((cycle - 20) / 15 * Math.PI) * 7;
        } else if (cycle >= 45 && cycle < 48) {
            y = midY + 5;
        } else if (cycle >= 48 && cycle < 53) {
            y = midY - 28; // R peak
        } else if (cycle >= 53 && cycle < 57) {
            y = midY + 12; // S dip
        } else if (cycle > 70 && cycle < 95) {
            y = midY - Math.sin((cycle - 70) / 25 * Math.PI) * 10;
        }

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#00C9A7';
        ctx.shadowColor = '#00C9A7';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.arc(this.ekgX, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#48E5C2';
        ctx.fill();

        this.ekgAnimId = requestAnimationFrame(() => this.animateEKG());
    }

    // =========================================================================
    // Confetti Celebrator
    // =========================================================================
    initConfetti() {
        this.confettiCanvas = document.getElementById('confettiCanvas');
        if (!this.confettiCanvas) return;
        this.confettiCtx = this.confettiCanvas.getContext('2d');
        this.resizeConfetti();
        window.addEventListener('resize', () => this.resizeConfetti());
    }

    resizeConfetti() {
        if (!this.confettiCanvas) return;
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
    }

    startConfetti() {
        if (!this.confettiCanvas || !this.confettiCtx) return;
        this.resizeConfetti();
        this.confettiCanvas.style.display = 'block';

        const colors = ['#00C9A7', '#00B4D8', '#FACC15', '#F43F5E', '#8B5CF6', '#10B981'];
        this.confettiParticles = [];

        for (let i = 0; i < 90; i++) {
            this.confettiParticles.push({
                x: Math.random() * this.confettiCanvas.width,
                y: -20 - Math.random() * 200,
                size: 6 + Math.random() * 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: 2 + Math.random() * 4,
                speedX: (Math.random() - 0.5) * 3,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 8
            });
        }

        this.renderConfetti();
    }

    renderConfetti() {
        if (!this.confettiCtx || !this.confettiCanvas) return;
        const ctx = this.confettiCtx;
        ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

        let activeCount = 0;
        this.confettiParticles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;

            if (p.y < this.confettiCanvas.height + 40) {
                activeCount++;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }
        });

        if (activeCount > 0) {
            this.confettiAnimId = requestAnimationFrame(() => this.renderConfetti());
        } else {
            this.stopConfetti();
        }
    }

    stopConfetti() {
        if (this.confettiAnimId) {
            cancelAnimationFrame(this.confettiAnimId);
            this.confettiAnimId = null;
        }
        if (this.confettiCanvas) {
            this.confettiCanvas.style.display = 'none';
        }
    }
}

// Instantiate and start on DOM load
window.addEventListener('DOMContentLoaded', () => {
    window.biologyGame = new BiologyGame();
    window.biologyGame.init();
});
