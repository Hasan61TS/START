document.addEventListener('DOMContentLoaded', () => {
    initializeVHSEffects();
    initializeAudioPlayer();
    initializePuzzles();
    startGlitchEffects();
});

// VHS and visual effects
function initializeVHSEffects() {
    const staticOverlay = document.querySelector('.static-overlay');
    const vhsOverlay = document.querySelector('.vhs-overlay');
    
    // Random static intensity
    setInterval(() => {
        staticOverlay.style.opacity = Math.random() * 0.3;
    }, 100);
    
    // Tracking issues
    setInterval(() => {
        vhsOverlay.style.transform = `translateY(${Math.random() * 2}px)`;
    }, 50);
}

// Audio player functionality
function initializeAudioPlayer() {
    const audio = document.getElementById('hidden-audio');
    const playBtn = document.querySelector('.play-btn');
    const progress = document.querySelector('.progress');
    
    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.textContent = '⏸';
            } else {
                audio.pause();
                playBtn.textContent = '▶';
            }
        });
        
        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${percent}%`;
        });
    }
}

// Puzzle initialization and checking
function initializePuzzles() {
    // Show puzzle interface after initial message
    setTimeout(() => {
        document.querySelector('.puzzle-interface').classList.remove('hidden');
    }, 10000);
    
    // Initialize glitch text effects
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        setInterval(() => {
            text.style.textShadow = Math.random() > 0.5 ? 
                '2px 2px #ff0000, -2px -2px #0000ff' : 'none';
        }, 100);
    });
}

// Message decryption checker
function checkMessageDecryption() {
    const input = document.getElementById('cipher-input').value.toUpperCase();
    
    // Check different cipher solutions
    if (checkBase64(input) || checkBinary(input) || checkMorse(input) || checkVigenere(input)) {
        revealNextClue();
    }
}

// Cipher checking functions
function checkBase64(input) {
    const base64Message = atob('VGhlIHN1biBzZXRzIG9uIHRoZSBvbGQgd29ybGQ=');
    return input === base64Message.toUpperCase();
}

function checkBinary(input) {
    const binaryMessage = "The key is in your name";
    return input === binaryMessage.toUpperCase();
}

function checkMorse(input) {
    const morseMessage = "WATCH THE SKY";
    return input === morseMessage;
}

function checkVigenere(input) {
    const key = "SUNFALL";
    const encryptedText = "QNVKGB VHAPYK WLZRVA";
    return input === decryptVigenere(encryptedText, key);
}

// Vigenere cipher decryption
function decryptVigenere(text, key) {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            result += ' ';
            continue;
        }
        
        const shift = key[keyIndex % key.length].charCodeAt(0) - 65;
        const charCode = (text[i].charCodeAt(0) - 65 - shift + 26) % 26 + 65;
        result += String.fromCharCode(charCode);
        keyIndex++;
    }
    
    return result;
}

// Reveal next clue after successful puzzle completion
function revealNextClue() {
    const messageContent = document.querySelector('.message-content');
    const hiddenClue = document.createElement('div');
    hiddenClue.className = 'revealed-clue';
    hiddenClue.innerHTML = `
        <p class="classified-text">LOCATION CONFIRMED: FACILITY PRIME</p>
        <p class="classified-text">PROJECT DAWN ARCHIVES ACCESSIBLE</p>
        <p class="classified-text">GRANDFATHER'S RESEARCH FOUND</p>
    `;
    messageContent.appendChild(hiddenClue);
    
    // Trigger glitch effect
    hiddenClue.style.animation = 'glitch 0.3s infinite';
    setTimeout(() => {
        hiddenClue.style.animation = '';
    }, 1000);
}

// Glitch effects for text
function startGlitchEffects() {
    const dialogues = document.querySelectorAll('.dialogue');
    
    dialogues.forEach(dialogue => {
        dialogue.addEventListener('mouseover', () => {
            dialogue.style.animation = 'textGlitch 0.1s infinite';
        });
        
        dialogue.addEventListener('mouseout', () => {
            dialogue.style.animation = '';
        });
    });
}

// Audio spectrogram analysis
function analyzeAudioSpectrum() {
    const audio = document.getElementById('hidden-audio');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        
        // Check for hidden message pattern
        const pattern = detectMessagePattern(dataArray);
        if (pattern) {
            revealSpectrogramMessage();
        }
    }
    
    draw();
}

function detectMessagePattern(dataArray) {
    // Implement pattern detection logic for "DAWN NEVER DIED"
    return false; // Placeholder
}

function revealSpectrogramMessage() {
    const spectrogramData = document.querySelector('.spectrogram-data');
    spectrogramData.innerHTML = 'DAWN NEVER DIED';
    spectrogramData.classList.add('revealed');
} 