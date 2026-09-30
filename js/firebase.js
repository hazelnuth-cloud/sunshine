/**
 * Biology Champions: Klinik Dokter Usagi (Chiikawa Bio Care)
 * Firebase Cloud Integration Module
 * Connected to Firebase Project: biology-911
 */

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDfdnuY054VJyZ7Wtkyxx2U94BD4T545Sk",
    authDomain: "biology-911.firebaseapp.com",
    projectId: "biology-911",
    storageBucket: "biology-911.firebasestorage.app",
    messagingSenderId: "906549747924",
    appId: "1:906549747924:web:36f4d528b4d8c66608db41"
};

class FirebaseManager {
    constructor() {
        this.config = FIREBASE_CONFIG;
        this.isInitialized = false;
        this.isOnline = false;
        this.db = null;
        this.app = null;
        this.statusListeners = [];
        this.currentStatus = 'connecting'; // 'connecting' | 'online' | 'syncing' | 'offline' | 'saved'
        this.statusMessage = 'Menghubungkan ke Firebase...';
        this.cachedLeaderboard = [];
    }

    onStatusChange(callback) {
        if (typeof callback === 'function') {
            this.statusListeners.push(callback);
            callback(this.currentStatus, this.statusMessage);
        }
    }

    notifyStatus(status, message) {
        this.currentStatus = status;
        this.statusMessage = message;
        this.statusListeners.forEach(cb => {
            try {
                cb(status, message);
            } catch (err) {
                console.error("Status listener error:", err);
            }
        });
    }

    async init() {
        this.notifyStatus('connecting', 'Menghubungkan ke biology-911...');
        
        try {
            // Step 1: Load Firebase App SDK dynamically
            await this.loadScript("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
            // Step 2: Load Firestore SDK dynamically
            await this.loadScript("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js");

            if (window.firebase && window.firebase.initializeApp) {
                if (!window.firebase.apps || !window.firebase.apps.length) {
                    this.app = window.firebase.initializeApp(this.config);
                } else {
                    this.app = window.firebase.apps[0];
                }
                this.db = window.firebase.firestore();
                this.isInitialized = true;
                this.isOnline = true;
                this.notifyStatus('online', 'Firebase Cloud Aktif (biology-911)');
                console.log("✓ Firebase SDK initialized successfully for project:", this.config.projectId);
                return true;
            } else {
                throw new Error("Firebase SDK script did not expose window.firebase");
            }
        } catch (err) {
            console.warn("Firebase SDK CDN unavailable, activating direct Cloud REST fallback:", err.message);
            // Fallback to REST API mode
            const testResult = await this.testRestConnection();
            if (testResult) {
                this.isInitialized = true;
                this.isOnline = true;
                this.notifyStatus('online', 'Firebase Cloud Aktif (REST mode)');
                return true;
            } else {
                this.isInitialized = false;
                this.isOnline = false;
                this.notifyStatus('offline', 'Mode Offline (Tersimpan Lokal)');
                return false;
            }
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if already in document
            const existing = document.querySelector(`script[data-src="${src}"]`);
            if (existing) {
                resolve();
                return;
            }
            const s = document.createElement('script');
            s.dataset.src = src;
            s.src = src;
            s.async = true;
            s.onload = () => resolve();
            s.onerror = (e) => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(s);
        });
    }

    async testRestConnection() {
        try {
            const url = `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/(default)/documents/leaderboard?key=${this.config.apiKey}&pageSize=1`;
            const resp = await fetch(url);
            return resp.ok;
        } catch (e) {
            return false;
        }
    }

    /**
     * Save / Sync doctor score and clinic achievements to Firebase
     */
    async saveScore(doctorData) {
        this.notifyStatus('syncing', 'Menyimpan progres ke cloud...');
        const payload = {
            doctorName: doctorData.nurseName || 'Dokter Usagi',
            doctorAvatar: doctorData.nurseAvatar || '🐰',
            doctorRank: doctorData.nurseRank || 'Dokter Spesialis Biologi SMA',
            xp: Number(doctorData.xp) || 0,
            stars: Number(doctorData.stars) || 0,
            curedCount: Number(doctorData.curedCount) || 0,
            timestamp: new Date().toISOString()
        };

        // Always save to localStorage as backup
        try {
            localStorage.setItem('usagi_bio_last_save', JSON.stringify(payload));
        } catch (e) {}

        // Try saving via Firebase SDK
        if (this.db) {
            try {
                await this.db.collection('leaderboard').add({
                    ...payload,
                    createdAt: window.firebase.firestore.FieldValue.serverTimestamp()
                });
                this.notifyStatus('saved', 'Tersimpan di Cloud ☁️');
                setTimeout(() => this.notifyStatus('online', 'Firebase Cloud Aktif'), 3000);
                return { success: true, method: 'sdk' };
            } catch (err) {
                console.warn("Firestore SDK write failed, trying REST fallback:", err.message);
            }
        }

        // Try saving via REST API
        try {
            const restUrl = `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/(default)/documents/leaderboard?key=${this.config.apiKey}`;
            const restBody = {
                fields: {
                    doctorName: { stringValue: payload.doctorName },
                    doctorAvatar: { stringValue: payload.doctorAvatar },
                    doctorRank: { stringValue: payload.doctorRank },
                    xp: { integerValue: payload.xp.toString() },
                    stars: { integerValue: payload.stars.toString() },
                    curedCount: { integerValue: payload.curedCount.toString() },
                    timestamp: { timestampValue: payload.timestamp }
                }
            };

            const resp = await fetch(restUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(restBody)
            });

            if (resp.ok) {
                this.notifyStatus('saved', 'Tersimpan di Cloud ☁️');
                setTimeout(() => this.notifyStatus('online', 'Firebase Cloud Aktif'), 3000);
                return { success: true, method: 'rest' };
            } else {
                throw new Error(`HTTP ${resp.status}`);
            }
        } catch (err) {
            console.error("Cloud save failed, saved locally:", err);
            this.notifyStatus('offline', 'Tersimpan di Memori Lokal');
            return { success: false, method: 'local_storage' };
        }
    }

    /**
     * Fetch Top Scores from Firestore
     */
    async getLeaderboard(maxLimit = 10) {
        // Try Firebase SDK first
        if (this.db) {
            try {
                const snapshot = await this.db.collection('leaderboard')
                    .orderBy('xp', 'desc')
                    .limit(maxLimit)
                    .get();

                const results = [];
                snapshot.forEach(doc => {
                    const d = doc.data();
                    results.push({
                        id: doc.id,
                        doctorName: d.doctorName || 'Dokter Usagi',
                        doctorAvatar: d.doctorAvatar || '🐰',
                        doctorRank: d.doctorRank || 'Dokter Spesialis Biologi SMA',
                        xp: d.xp || 0,
                        stars: d.stars || 0,
                        curedCount: d.curedCount || 0,
                        timestamp: d.timestamp || ''
                    });
                });
                if (results.length > 0) {
                    this.cachedLeaderboard = results;
                    return results;
                }
            } catch (err) {
                console.warn("Firestore SDK get failed, trying REST fallback:", err.message);
            }
        }

        // Try Firestore REST API
        try {
            const restUrl = `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/(default)/documents/leaderboard?key=${this.config.apiKey}&pageSize=${maxLimit}`;
            const resp = await fetch(restUrl);
            if (resp.ok) {
                const data = await resp.json();
                if (data.documents && data.documents.length) {
                    const results = data.documents.map(doc => {
                        const f = doc.fields || {};
                        return {
                            id: doc.name.split('/').pop(),
                            doctorName: f.doctorName?.stringValue || 'Dokter Usagi',
                            doctorAvatar: f.doctorAvatar?.stringValue || '🐰',
                            doctorRank: f.doctorRank?.stringValue || 'Dokter Spesialis Biologi SMA',
                            xp: parseInt(f.xp?.integerValue || '0', 10),
                            stars: parseInt(f.stars?.integerValue || '0', 10),
                            curedCount: parseInt(f.curedCount?.integerValue || '0', 10),
                            timestamp: f.timestamp?.timestampValue || ''
                        };
                    });
                    // Sort descending by xp
                    results.sort((a, b) => b.xp - a.xp);
                    this.cachedLeaderboard = results;
                    return results;
                }
            }
        } catch (err) {
            console.error("Leaderboard fetch failed:", err);
        }

        // Fallback demo/local list if Firestore collection is newly created
        return this.cachedLeaderboard.length > 0 ? this.cachedLeaderboard : this.getLocalFallbackLeaderboard();
    }

    getLocalFallbackLeaderboard() {
        let localPlayer = null;
        try {
            const saved = localStorage.getItem('usagi_bio_last_save');
            if (saved) localPlayer = JSON.parse(saved);
        } catch (e) {}

        const list = [
            { doctorName: "Dokter Usagi (Top Master)", doctorAvatar: "🐰", doctorRank: "Master Dokter Usagi 🌟", xp: 1200, stars: 12, curedCount: 6 },
            { doctorName: "Hachiware Bio Care", doctorAvatar: "🐱", doctorRank: "Dokter Utama Klinik Chiikawa", xp: 950, stars: 9, curedCount: 5 },
            { doctorName: "Chiikawa Semangat", doctorAvatar: "🤍", doctorRank: "Dokter Muda Teladan", xp: 600, stars: 6, curedCount: 3 }
        ];

        if (localPlayer) {
            list.unshift({
                doctorName: `${localPlayer.doctorName} (Kamu)`,
                doctorAvatar: localPlayer.doctorAvatar,
                doctorRank: localPlayer.doctorRank,
                xp: localPlayer.xp,
                stars: localPlayer.stars,
                curedCount: localPlayer.curedCount
            });
            list.sort((a, b) => b.xp - a.xp);
        }

        return list;
    }
}

// Global instance
window.firebaseManager = new FirebaseManager();
