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
            alert("Masukkan file lagunya dulu ke dalam folder ya! (Isi atribut src di index.html)");
        });
    }
}

// Fungsi tombol Yes dan No dengan SFX
function handleYesClick() {
    const sfxYes = document.getElementById('sfx-yes');
    playSfxAndNavigate(sfxYes, 'yes.html');
}

function handleNoClick() {
    const sfxNo = document.getElementById('sfx-no');
    playSfxAndNavigate(sfxNo, 'no.html');
}

function playSfxAndNavigate(audioElement, url) {
    // Cek apakah ada file audio yang dimasukkan ke sfx
    let hasSource = false;
    if (audioElement) {
        const source = audioElement.querySelector('source');
        if (source && source.getAttribute('src') !== "") {
            hasSource = true;
        }
    }

    if (hasSource) {
        // Mainkan SFX
        audioElement.play().catch(e => console.log("Gagal play SFX"));
        
        // Kasih delay sedikit (misal 800ms) agar suaranya terdengar dulu sebelum pindah halaman
        setTimeout(() => {
            window.location.href = url;
        }, 800); 
    } else {
        // Jika tidak ada SFX, langsung pindah halaman tanpa delay
        window.location.href = url;
    }
}
