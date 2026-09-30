/**
 * Biology Champions: Klinik Dokter Usagi (Chiikawa Bio Hospital)
 * Web Audio API Sound Synthesizer
 * Provides medical soundscapes & Usagi sound effects (heartbeat, EKG beep, stethoscope, Yaha, Ura, Haa, footsteps, medicine pickup)
 * Zero external audio files needed!
 */

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.ambientPlaying = false;
        this.ambientTimer = null;
        this.lastFootstepTime = 0;
        this.initOnUserGesture();
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initOnUserGesture() {
        const unlock = () => {
            this.initContext();
            window.removeEventListener('click', unlock);
            window.removeEventListener('keydown', unlock);
            window.removeEventListener('touchstart', unlock);
        };
        window.addEventListener('click', unlock, { once: true });
        window.addEventListener('keydown', unlock, { once: true });
        window.addEventListener('touchstart', unlock, { once: true });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted && this.ambientPlaying) {
            this.stopAmbient();
        }
        return this.isMuted;
    }

    // Play a smooth tone
    playTone(freq, type = 'sine', duration = 0.2, gainValue = 0.15, startTime = 0) {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const t = this.ctx.currentTime + startTime;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(gainValue, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + duration);
    }

    // Medical Monitor Beep (EKG)
    playEkgBeep(isHigh = false) {
        if (this.isMuted) return;
        const freq = isHigh ? 1150 : 880;
        this.playTone(freq, 'sine', 0.08, 0.12);
    }

    // Heartbeat lub-dub sound
    playHeartbeat() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        // Lub (low thud)
        this.playThump(65, 0.12, 0.28, 0);
        // Dub (slightly sharper low thud 0.18s later)
        this.playThump(52, 0.15, 0.22, 0.18);
    }

    playThump(freq, duration, gainVal, startDelay) {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        const t = this.ctx.currentTime + startDelay;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(25, t + duration);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, t);

        gain.gain.setValueAtTime(gainVal, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + duration);
    }

    // Correct Answer - Cheerful medical victory chime
    playCorrect() {
        if (this.isMuted) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            this.playTone(freq, 'triangle', 0.28, 0.14, idx * 0.08);
        });
        this.playUsagiYaha();
    }

    // Wrong Answer - Gentle low bounce
    playWrong() {
        if (this.isMuted) return;
        this.playTone(330, 'sawtooth', 0.18, 0.08, 0);
        this.playTone(260, 'sawtooth', 0.25, 0.08, 0.14);
        this.playUsagiHaa();
    }

    // Tool click / Stethoscope attach
    playToolClick() {
        if (this.isMuted) return;
        this.playTone(1200, 'sine', 0.04, 0.08, 0);
        this.playTone(1800, 'sine', 0.04, 0.05, 0.03);
    }

    // Medicine Pill pop sound
    playPop() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.exponentialRampToValueAtTime(800, t + 0.08);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.09);
    }

    // Usagi's joyful chirp: "YAHA!"
    playUsagiYaha() {
        if (this.isMuted) return;
        // Bright energetic triplet arpeggio
        const tones = [587.33, 880, 1174.66]; // D5, A5, D6
        tones.forEach((freq, i) => {
            this.playTone(freq, 'sine', 0.14, 0.12, 0.05 + i * 0.07);
        });
    }

    // Usagi's excited voice: "URA!"
    playUsagiUra() {
        if (this.isMuted) return;
        this.playTone(740, 'triangle', 0.12, 0.15, 0);
        this.playTone(987.77, 'sine', 0.15, 0.15, 0.09);
    }

    // Usagi's confused voice: "HAA?!"
    playUsagiHaa() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, t);
        osc.frequency.linearRampToValueAtTime(280, t + 0.22);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.22);
    }

    // Soft cute footstep sound when walking
    playFootstep() {
        if (this.isMuted) return;
        const now = Date.now();
        if (now - this.lastFootstepTime < 220) return; // throttle
        this.lastFootstepTime = now;
        this.playTone(420 + Math.random() * 80, 'sine', 0.04, 0.035, 0);
    }

    // Picking up medicine sound from the pharmacy shelf
    playItemPickup() {
        if (this.isMuted) return;
        const notes = [659.25, 880, 1318.51]; // E5, A5, E6
        notes.forEach((freq, idx) => {
            this.playTone(freq, 'triangle', 0.18, 0.13, idx * 0.07);
        });
    }

    // Patient cured - Grand celebratory fanfare with Usagi cheer
    playPatientCured() {
        if (this.isMuted) return;
        const chords = [
            { f: 523.25, t: 0 },    // C5
            { f: 659.25, t: 0.1 },  // E5
            { f: 783.99, t: 0.2 },  // G5
            { f: 1046.50, t: 0.35 },// C6
            { f: 1318.51, t: 0.5 }, // E6
            { f: 1567.98, t: 0.65 } // G6
        ];
        chords.forEach(c => {
            this.playTone(c.f, 'triangle', 0.45, 0.18, c.t);
        });
        setTimeout(() => this.playUsagiYaha(), 600);
    }

    // Level Up sound
    playLevelUp() {
        if (this.isMuted) return;
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((f, i) => {
            this.playTone(f, 'sine', 0.3, 0.16, i * 0.1);
        });
    }

    // Gentle ambient hospital clinic melody loop
    toggleAmbient() {
        if (this.ambientPlaying) {
            this.stopAmbient();
            return false;
        } else {
            this.startAmbient();
            return true;
        }
    }

    startAmbient() {
        if (this.isMuted) return;
        this.initContext();
        this.ambientPlaying = true;

        const melody = [
            { f: 523.25, dur: 0.3 }, // C5
            { f: 587.33, dur: 0.3 }, // D5
            { f: 659.25, dur: 0.4 }, // E5
            { f: 783.99, dur: 0.5 }, // G5
            { f: 659.25, dur: 0.3 }, // E5
            { f: 523.25, dur: 0.6 }  // C5
        ];

        let index = 0;
        const step = () => {
            if (!this.ambientPlaying || this.isMuted) return;
            const note = melody[index];
            this.playTone(note.f, 'sine', note.dur * 1.5, 0.035, 0);
            index = (index + 1) % melody.length;
            this.ambientTimer = setTimeout(step, 900);
        };
        step();
    }

    stopAmbient() {
        this.ambientPlaying = false;
        if (this.ambientTimer) {
            clearTimeout(this.ambientTimer);
            this.ambientTimer = null;
        }
    }
}

// Global sound manager instance
window.soundSystem = new SoundSystem();
