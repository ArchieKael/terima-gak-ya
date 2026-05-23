// Fungsi untuk memutar musik BGM
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('music-toggle');
let isMusicPlaying = false;

function toggleMusic() {
    if (!bgm) return;
    
    if (isMusicPlaying) {
        bgm.pause();
        musicBtn.innerHTML = "🔇 Musik Off";
        isMusicPlaying = false;
    } else {
        bgm.play().then(() => {
            musicBtn.innerHTML = "🎵 Musik On";
            isMusicPlaying = true;
        }).catch(e => {
            console.log("Audio belum dimasukkan atau autoplay diblokir browser.");
            alert("Pastikan file lagunya tidak rusak ya!");
        });
    }
}

// Fungsi pindah tampilan tanpa me-reload halaman (SPA)
function showSection(sectionId) {
    document.getElementById('section-home').style.display = 'none';
    document.getElementById('section-no').style.display = 'none';
    document.getElementById('section-yes').style.display = 'none';
    
    document.getElementById(sectionId).style.display = 'block';

    // Jika masuk halaman yes, jalankan confetti
    if (sectionId === 'section-yes') {
        runConfetti();
    }
}

// Fungsi tombol Yes dan No dengan SFX
function handleYesClick() {
    const sfxYes = document.getElementById('sfx-yes');
    playSfxAndNavigate(sfxYes, 'section-yes');
}

function handleNoClick() {
    const sfxNo = document.getElementById('sfx-no');
    playSfxAndNavigate(sfxNo, 'section-no');
}

function goBackToHome() {
    showSection('section-home');
}

function playSfxAndNavigate(audioElement, sectionId) {
    let hasSource = false;
    if (audioElement) {
        const source = audioElement.querySelector('source');
        if (source && source.getAttribute('src') !== "") {
            hasSource = true;
        }
    }

    if (hasSource) {
        // Mainkan SFX
        audioElement.currentTime = 0; // reset dari awal kalau dipencet berkali-kali
        audioElement.play().catch(e => console.log("Gagal play SFX"));
        
        // Delay 0.5 detik (500ms) sebelum ganti tampilan
        setTimeout(() => {
            showSection(sectionId);
        }, 500); 
    } else {
        showSection(sectionId);
    }
}

function runConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#87cefa', '#4682b4']
        });
    }
}
