/**
 * Biology Champions - Game Engine & Interactive Nurse Controller
 * Manages game state, patient interactions, quiz flow, EKG canvas, and celebrations
 */

class BiologyGame {
    constructor() {
        // Player State
        this.nurseName = "Perawat Maya";
        this.nurseAvatar = "👩‍⚕️";
        this.nurseRank = "Perawat Magang";
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
    }

    bindEvents() {
        // Welcome avatar selections
        const avatarChoices = document.querySelectorAll('.avatar-choice');
        avatarChoices.forEach(choice => {
            choice.addEventListener('click', (e) => {
                avatarChoices.forEach(c => c.classList.remove('active'));
                choice.classList.add('active');
                this.nurseAvatar = choice.dataset.avatar || "👩‍⚕️";
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
        this.welcomeScreen.style.display = 'none';
        this.wardScreen.style.display = 'grid';

        // Load default first patient
        this.loadPatient(this.activePatientId);
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
                    ${isCured ? '💖' : '🩺'}
                </div>
                <div class="roster-info">
                    <div class="roster-name">${patient.name} (${patient.age})</div>
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

        // Update avatar
        this.patientAvatarBox.innerHTML = progress.isCured ? patient.avatarSvg.cured : patient.avatarSvg.sick;

        // Update Recovery bar
        this.updateRecoveryDisplay(progress.recovery);

        // Update Vitals based on recovery
        this.updateVitals(patient, progress.recovery);

        // Update Tools button state
        this.updateToolButtonsState(patientId);

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
        const progress = this.patientProgress[this.activePatientId];

        // Check if question exists for this tool
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
            // Pale microcytic RBCs
            cellSvg = `
                <svg viewBox="0 0 100 100" class="specimen-cell-svg">
                    <circle cx="50" cy="50" r="42" fill="#FDA4AF" stroke="#E11D48" stroke-width="2"/>
                    <circle cx="50" cy="50" r="24" fill="#FFE4E6"/>
                    <circle cx="28" cy="28" r="8" fill="#FDA4AF"/>
                    <circle cx="75" cy="30" r="9" fill="#FDA4AF"/>
                    <circle cx="70" cy="72" r="10" fill="#FDA4AF"/>
                </svg>
            `;
        } else if (patient.id === 'patient_2') {
            // Bacteria Gram-positive chains
            cellSvg = `
                <svg viewBox="0 0 100 100" class="specimen-cell-svg">
                    <circle cx="25" cy="35" r="10" fill="#7C3AED" stroke="#4C1D95" stroke-width="2"/>
                    <circle cx="40" cy="42" r="10" fill="#7C3AED" stroke="#4C1D95" stroke-width="2"/>
                    <circle cx="55" cy="50" r="10" fill="#7C3AED" stroke="#4C1D95" stroke-width="2"/>
                    <circle cx="70" cy="58" r="10" fill="#7C3AED" stroke="#4C1D95" stroke-width="2"/>
                    <circle cx="82" cy="70" r="9" fill="#7C3AED" stroke="#4C1D95" stroke-width="2"/>
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

        // Automatically open question after 1.4s or on click
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

        const patient = getPatientById(this.activePatientId);

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

            // Show explanation
            feedbackBox.className = 'feedback-box success active';
            feedbackTitle.innerHTML = '🎉 Jawaban Tepat! Analisis Klinis Valid!';
            feedbackText.innerHTML = `<strong>Pembahasan Ilmiah:</strong> ${q.explanation}`;

            // Add Rewards
            this.addRewards(150, 1);

            // Progress patient recovery
            this.applySuccessfulTool(this.activePatientId, this.currentTool);

            btnContinue.classList.add('active');
        } else {
            window.soundSystem.playWrong();
            selectedDiv.classList.add('wrong');

            feedbackBox.className = 'feedback-box error active';
            feedbackTitle.innerHTML = '⚠️ Kurang Tepat, Perawat Champion!';
            feedbackText.innerHTML = `
                <strong>Petunjuk Biologis:</strong> ${q.hint}<br>
                <em>Coba analisis ulang mekanisme seluler atau organ yang terlibat.</em>
            `;

            // Allow student to retry another option
            setTimeout(() => {
                selectedDiv.classList.remove('wrong');
            }, 900);
        }
    }

    applySuccessfulTool(patientId, toolType) {
        const progress = this.patientProgress[patientId];
        if (!progress.completedTools.has(toolType)) {
            progress.completedTools.add(toolType);

            // 5 tools per patient -> 20% each
            const newRecovery = Math.min(100, progress.completedTools.size * 20);
            progress.recovery = newRecovery;

            this.updateRecoveryDisplay(newRecovery);
            const patient = getPatientById(patientId);
            this.updateVitals(patient, newRecovery);
            this.updateToolButtonsState(patientId);
            this.renderRoster();

            // Check if 100% Cured!
            if (newRecovery >= 100 && !progress.isCured) {
                progress.isCured = true;
                this.curedCount++;
                this.dispPatientsCount.textContent = `${this.curedCount} Sembuh`;
                this.renderRoster();

                // Wait for question modal close before triggering grand celebration
                this.triggerCelebrationPending = true;
            }
        }
    }

    addRewards(xpPoints, starsCount) {
        this.xp += xpPoints;
        this.stars += starsCount;

        this.dispXp.textContent = `${this.xp} XP`;

        // Check Rank Up
        if (this.xp >= 1500) {
            this.nurseRank = "Master Biology Champion 🌟";
        } else if (this.xp >= 900) {
            this.nurseRank = "Kepala Ruangan Rawat Inap";
        } else if (this.xp >= 450) {
            this.nurseRank = "Perawat Primer Spesialis";
        } else if (this.xp >= 150) {
            this.nurseRank = "Perawat Muda Cekatan";
        }
        this.dispNurseRank.textContent = this.nurseRank;
    }

    showQuestionHint() {
        if (!this.currentQuestion) return;
        const feedbackBox = document.getElementById('modalFeedbackBox');
        const feedbackTitle = document.getElementById('modalFeedbackTitle');
        const feedbackText = document.getElementById('modalFeedbackText');

        feedbackBox.className = 'feedback-box error active';
        feedbackTitle.innerHTML = '💡 Petunjuk Medis & Biologi:';
        feedbackText.textContent = this.currentQuestion.hint;
        window.soundSystem.playToolClick();
    }

    closeQuestionModal() {
        this.questionModal.classList.remove('active');

        // If patient was just fully cured, launch grand celebration!
        if (this.triggerCelebrationPending) {
            this.triggerCelebrationPending = false;
            setTimeout(() => this.triggerCureCelebration(), 300);
        }
    }

    triggerCureCelebration() {
        const patient = getPatientById(this.activePatientId);
        window.soundSystem.playPatientCured();
        this.startConfetti();

        // Update Avatar to Cured
        this.patientAvatarBox.innerHTML = patient.avatarSvg.cured;

        // Fill Certificate details
        document.getElementById('certPatientName').textContent = patient.name;
        document.getElementById('certCondition').textContent = patient.condition;
        document.getElementById('certOrgan').textContent = patient.organSystem;
        document.getElementById('certNurseSignature').textContent = `${this.nurseName} (${this.nurseRank})`;

        this.celebrationModal.classList.add('active');
    }

    handleNextPatient() {
        this.celebrationModal.classList.remove('active');
        this.stopConfetti();

        // Find next uncured patient
        const nextPatient = PATIENTS_DATA.find(p => !this.patientProgress[p.id].isCured);
        if (nextPatient) {
            this.loadPatient(nextPatient.id);
        } else {
            alert(`🎉 LUAR BIASA! Seluruh pasien di Rumah Sakit Bio Medika telah berhasil kamu sembuhkan, ${this.nurseName}! Kamu adalah Biology Champion sejati!`);
        }
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

        // Clear with fade trail
        ctx.fillStyle = 'rgba(4, 13, 26, 0.15)';
        ctx.fillRect(0, 0, width, height);

        // Speed depends on heart rate (BPM)
        const speed = Math.max(2, this.currentHeartRate / 35);
        this.ekgX = (this.ekgX + speed) % width;

        // Generate ECG waveform pattern (P wave, QRS complex, T wave)
        const cycle = this.ekgX % 120;
        let y = midY;

        if (cycle > 20 && cycle < 35) {
            // P wave (atrial depolarization)
            y = midY - Math.sin((cycle - 20) / 15 * Math.PI) * 7;
        } else if (cycle >= 45 && cycle < 48) {
            // Q dip
            y = midY + 5;
        } else if (cycle >= 48 && cycle < 53) {
            // R spike (ventricular depolarization)
            y = midY - 26;
            if (cycle === 50 && Math.random() > 0.4) {
                window.soundSystem.playEkgBeep(this.currentHeartRate > 100);
            }
        } else if (cycle >= 53 && cycle < 57) {
            // S dip
            y = midY + 12;
        } else if (cycle > 70 && cycle < 95) {
            // T wave (ventricular repolarization)
            y = midY - Math.sin((cycle - 70) / 25 * Math.PI) * 9;
        }

        // Draw glowing point
        ctx.beginPath();
        ctx.arc(this.ekgX, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00C9A7';
        ctx.shadowColor = '#00C9A7';
        ctx.shadowBlur = 10;
        ctx.fill();

        this.ekgAnimId = requestAnimationFrame(() => this.animateEKG());
    }

    // =========================================================================
    // Confetti Particle System
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
        this.resizeConfetti();
        this.confettiParticles = [];
        const colors = ['#00C9A7', '#00B4D8', '#FACC15', '#F43F5E', '#8B5CF6', '#10B981'];

        for (let i = 0; i < 120; i++) {
            this.confettiParticles.push({
                x: Math.random() * this.confettiCanvas.width,
                y: Math.random() * -this.confettiCanvas.height * 0.5,
                w: Math.random() * 10 + 6,
                h: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 4 + 3,
                angle: Math.random() * 360,
                vAngle: (Math.random() - 0.5) * 8
            });
        }
        this.renderConfetti();
    }

    renderConfetti() {
        if (!this.confettiCtx || this.confettiParticles.length === 0) return;

        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

        this.confettiParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.angle += p.vAngle;

            this.confettiCtx.save();
            this.confettiCtx.translate(p.x, p.y);
            this.confettiCtx.rotate((p.angle * Math.PI) / 180);
            this.confettiCtx.fillStyle = p.color;
            this.confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            this.confettiCtx.restore();
        });

        // Keep looping while particles on screen
        const alive = this.confettiParticles.some(p => p.y < this.confettiCanvas.height);
        if (alive) {
            this.confettiAnimId = requestAnimationFrame(() => this.renderConfetti());
        } else {
            this.stopConfetti();
        }
    }

    stopConfetti() {
        if (this.confettiAnimId) cancelAnimationFrame(this.confettiAnimId);
        if (this.confettiCtx && this.confettiCanvas) {
            this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        }
        this.confettiParticles = [];
    }
}

// Instantiate and launch on DOM loaded
window.addEventListener('DOMContentLoaded', () => {
    window.game = new BiologyGame();
    window.game.init();
});
