document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    initializeAudioPlayer();
    initializeMemoryPlayer();
    initializeVideoPlayer();
    checkLoginState();
    
    // Hide all puzzles except the first one
    const puzzles = document.querySelectorAll('.puzzle');
    puzzles.forEach((puzzle, index) => {
        if (index === 0) {
            puzzle.style.display = 'block';
        } else {
            puzzle.style.display = 'none';
            puzzle.classList.add('locked');
        }
    });
    
    initializeTerminal();
});

// Save and load progress
function saveProgress(puzzleNumber) {
    localStorage.setItem('diaryProgress', puzzleNumber.toString());
}

function loadProgress() {
    const progress = localStorage.getItem('diaryProgress');
    if (progress) {
        for (let i = 1; i <= parseInt(progress); i++) {
            unlockNextSection(i);
        }
    }
}

function unlockNextSection(puzzleNumber) {
    const nextPuzzle = document.getElementById(`puzzle${puzzleNumber + 1}`);
    
    if (nextPuzzle) {
        nextPuzzle.classList.remove('locked');
        nextPuzzle.classList.add('unlocked');
        nextPuzzle.style.display = 'block'; // Make sure it's visible
        
        // Add a flash effect
        nextPuzzle.style.animation = 'none';
        nextPuzzle.offsetHeight; // Trigger reflow
        nextPuzzle.style.animation = 'unlock 0.5s ease-out';
        
        // Scroll smoothly to the newly unlocked puzzle
        setTimeout(() => {
            nextPuzzle.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    saveProgress(puzzleNumber);
}

// Add button animation handling
function handleButtonSuccess(button) {
    button.classList.add('success');
    
    // Create unlock wave effect
    const wave = document.createElement('div');
    wave.className = 'unlock-wave';
    document.body.appendChild(wave);
    wave.style.animation = 'unlockWave 1s ease-out forwards';
    
    setTimeout(() => {
        button.classList.remove('success');
        wave.remove();
    }, 1000);
}

// Update puzzle checking functions
function checkCipher1() {
    const input = document.getElementById('cipher1-input').value.toUpperCase();
    const button = document.querySelector('#puzzle1 button');
    
    if (input === "JUST BEGINNING TO UNDERSTAND THE POWER") {
        handleButtonSuccess(button);
        revealMessage("First layer breached - The power becomes clear");
        unlockNextSection(1);
    } else {
        button.classList.add('error');
        setTimeout(() => button.classList.remove('error'), 500);
    }
}

function checkCipher2() {
    const input = document.getElementById('cipher2-input').value.toUpperCase();
    const button = document.querySelector('#puzzle2 button');
    
    if (input === "THE KGB WATCHES") {
        handleButtonSuccess(button);
        revealMessage("Second layer decoded - They are always watching");
        unlockNextSection(2);
    } else {
        button.classList.add('error');
        setTimeout(() => button.classList.remove('error'), 500);
    }
}

function checkCipher3() {
    const input = document.getElementById('cipher3-input').value.toUpperCase();
    const button = document.querySelector('#puzzle3 button');
    
    if (input === "MOTHER BETRAYS ALL") {
        handleButtonSuccess(button);
        revealMessage("Hidden truth revealed - Trust no one");
        unlockNextSection(3);
    } else {
        button.classList.add('error');
        setTimeout(() => button.classList.remove('error'), 500);
    }
}

function checkCipher4() {
    const input = document.getElementById('cipher4-input').value.toUpperCase();
    const button = document.querySelector('#puzzle4 button');
    
    // The answer should be "SUNFALL BEGINS NOW PROJECT"
    if (input === "SUNFALL BEGINS WITH FAMILY") {
        handleButtonSuccess(button);
        revealMessage("Cipher 4 decoded!");
        unlockNextSection(4);
    } else {
        button.classList.add('error');
        setTimeout(() => button.classList.remove('error'), 500);
    }
}

function checkSymbolPattern() {
    const input = document.getElementById('symbol-input').value.toUpperCase();
    const button = document.querySelector('#puzzle5 button');
    
    if (input === "MOTHER KILLED DAWN") {
        handleButtonSuccess(button);
        revealMessage("Project DAWN's fate revealed - History repeats");
        unlockNextSection(5);
    } else {
        button.classList.add('error');
        setTimeout(() => button.classList.remove('error'), 500);
    }
}

function checkWavePattern() {
    const input = document.getElementById('wave-input').value;
    const button = document.querySelector('#puzzle6 button');
    
    if (input === "7.1") {
        handleButtonSuccess(button);
        revealMessage("Wavelength pattern decoded - Neural resonance detected");
        unlockNextSection(6);
    } else {
        button.classList.add('error');
        setTimeout(() => button.classList.remove('error'), 500);
    }
}

function checkCoordinates() {
    const input = document.getElementById('coord-input').value.toUpperCase();
    const button = document.querySelector('#puzzle7 button');
    
    if (input === "SIBERIAN RESEARCH FACILITY") {
        handleButtonSuccess(button);
        revealMessage("Location identified - The truth lies in the past");
        unlockNextSection(7);
    } else {
        button.classList.add('error');
        setTimeout(() => button.classList.remove('error'), 500);
    }
}

function checkMemoryPattern() {
    const input = document.getElementById('memory-input').value.toUpperCase();
    const button = document.querySelector('#puzzle8 button');
    
    if (input === "MOTHER NEVER STOPPED TRYING") {
        handleButtonSuccess(button);
        revealMessage("The pattern emerges - Twenty years of deception");
        unlockNextSection(8);
        revealFinalMessage();
    } else {
        button.classList.add('error');
        setTimeout(() => button.classList.remove('error'), 500);
    }
}

// Audio player functionality
function initializeAudioPlayer() {
    const audio = document.getElementById('audio1');
    if (!audio) return;

    const playBtn = document.querySelector('.play-btn');
    const progress = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time-display');

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
        timeDisplay.textContent = formatTime(audio.currentTime);
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function revealMessage(message) {
    const msgElement = document.createElement('div');
    msgElement.className = 'revealed-message';
    msgElement.textContent = message;
    document.querySelector('.puzzle-container').appendChild(msgElement);
    setTimeout(() => msgElement.remove(), 3000);
}

function revealFinalMessage() {
    const finalEntry = document.createElement('section');
    finalEntry.className = 'diary-entry final';
    finalEntry.innerHTML = `
        <div class="entry-header">
            <h2>Final Warning</h2>
            <span class="date">Day of Discovery</span>
        </div>
        <div class="entry-content">
            <p class="urgent">If you're reading this, you now know the truth. My own mother, the one I trusted most, has betrayed not just me, but humanity itself. Project Sunfall must be stopped. Find Solstice. They know how to end this.</p>
        </div>
    `;
    document.querySelector('.diary-container').appendChild(finalEntry);
}

// Check login state
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login-challenge.html';
    }
}

// Add puzzle checking function
function checkPuzzle(puzzleNumber) {
    const input = document.getElementById(`puzzle${puzzleNumber}-input`).value.toUpperCase();
    const button = document.querySelector(`#puzzle${puzzleNumber} button`);
    
    let isCorrect = false;
    
    switch(puzzleNumber) {
        case 1:
            isCorrect = input === "2021-03-15";
            break;
        case 2:
            isCorrect = input === "TPAB";
            break;
        case 3:
            isCorrect = input === "OBEY";
            break;
        case 4:
            isCorrect = input === "SUNFALL";
            break;
        case 5:
            isCorrect = input === "ENTER VOID NOW";
            break;
    }
    
    if (isCorrect) {
        handleButtonSuccess(button);
        revealMessage(`Puzzle ${puzzleNumber} solved!`);
        
        if (puzzleNumber === 5) {
            // Add a slight delay before redirecting
            setTimeout(() => {
                window.location.href = 'diary.html';
            }, 1500); // Wait for the success animation to complete
        } else {
            unlockNextSection(puzzleNumber);
        }
    } else {
        button.classList.add('error');
        setTimeout(() => button.classList.remove('error'), 500);
    }
}

// Terminal functionality
function initializeTerminal() {
    const terminalInput = document.querySelector('.terminal-input');
    const outputText = document.querySelector('.output-text');
    const terminalBody = document.querySelector('.terminal-body');
    
    if (!terminalInput || !outputText) return;
    
    let commandHistory = [];
    let historyIndex = -1;
    
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim();
            if (command) {
                processCommand(command, outputText);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                terminalInput.value = '';
                
                // Auto scroll to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });
    
    // Focus terminal input when clicking anywhere in the terminal
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Initial terminal message
    outputText.innerHTML = `
        EMERGENCY ACCESS TERMINAL v2.1
        -----------------------------
        Type 'help' for available commands
        
        $>`;
}

function processCommand(command, outputText) {
    const output = document.createElement('div');
    output.className = 'command-line';
    output.innerHTML = `<span class="prompt">$</span> ${command}`;
    outputText.appendChild(output);
    
    const response = document.createElement('div');
    response.className = 'response-line';
    
    switch(command.toLowerCase()) {
        case 'help':
            response.innerHTML = `
                Available commands:
                ------------------
                help     - Show this help message
                ls       - List files in current directory
                cat     - Read file contents
                decrypt - Attempt to decrypt files
                clear   - Clear terminal screen`;
            break;
            
        case 'ls':
            response.innerHTML = `
                ENCRYPTED_FILES/
                ├── project_sunfall.dat
                ├── override_codes.bin
                └── emergency_protocol.exe`;
            break;
            
        case 'cat project_sunfall.dat':
            response.innerHTML = `
                ERROR: File encrypted
                Attempting decryption...
                ----------------------
                WARNING: Security breach detected
                Initiating emergency protocol...
                HINT: The project name holds the key`;
            break;
            
        case 'decrypt project_sunfall.dat':
            response.innerHTML = `
                DECRYPTION SEQUENCE INITIATED
                ---------------------------
                Enter override code: SUNFALL
                
                Access code revealed. Proceed with caution.`;
            break;
            
        case 'clear':
            outputText.innerHTML = '';
            return;
            
        default:
            response.innerHTML = `Command not recognized: ${command}
                               Type 'help' for available commands`;
    }
    
    outputText.appendChild(response);
}

// Memory Fragment Audio Player
function initializeMemoryPlayer() {
    const audio = document.getElementById('kendrickAudio');
    const playBtn = document.querySelector('[data-audio="kendrick"]');
    const seekBar = document.querySelector('.seek-bar');
    const seekFill = document.querySelector('.seek-fill');
    const timeCurrent = document.querySelector('.time-current');
    const timeTotal = document.querySelector('.time-total');
    const canvas = document.getElementById('kendrickVisualizer');
    
    if (!audio || !playBtn || !canvas) return;
    
    const ctx = canvas.getContext('2d');
    let audioContext, analyser, source;
    
    // Initialize audio context and analyser
    function initAudioContext() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        function draw() {
            requestAnimationFrame(draw);
            
            analyser.getByteFrequencyData(dataArray);
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            
            for(let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                
                ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        }
        
        draw();
    }
    
    // Play/Pause functionality
    playBtn.addEventListener('click', () => {
        if (!audioContext) initAudioContext();
        
        if (audio.paused) {
            audio.play();
            playBtn.querySelector('.btn-icon').textContent = '⏸';
        } else {
            audio.pause();
            playBtn.querySelector('.btn-icon').textContent = '▶';
        }
    });
    
    // Seek bar functionality
    audio.addEventListener('loadedmetadata', () => {
        timeTotal.textContent = formatTime(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        seekFill.style.width = `${percent}%`;
        timeCurrent.textContent = formatTime(audio.currentTime);
    });
    
    seekBar.addEventListener('click', (e) => {
        const rect = seekBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });
    
    // Add glitch effect on audio end
    audio.addEventListener('ended', () => {
        playBtn.querySelector('.btn-icon').textContent = '▶';
        document.querySelector('.glitch-player').classList.add('glitch-effect');
        setTimeout(() => {
            document.querySelector('.glitch-player').classList.remove('glitch-effect');
        }, 1000);
    });
}

// Initialize video player
function initializeVideoPlayer() {
    const video = document.getElementById('securityFootage');
    const playBtn = document.querySelector('.video-controls .play');
    const progressBar = document.querySelector('.video-progress');
    const timecode = document.querySelector('.timecode');
    const frameByFrameBtn = document.querySelector('.frame-by-frame');
    
    if (!video || !playBtn || !progressBar) return;
    
    // Play/Pause functionality
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.textContent = '⏸';
        } else {
            video.pause();
            playBtn.textContent = '▶';
        }
    });
    
    // Update progress bar and timecode
    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.value = progress;
        timecode.textContent = formatTimecode(video.currentTime);
    });
    
    // Progress bar seeking
    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * video.duration;
        video.currentTime = time;
    });
    
    // Frame by frame control
    frameByFrameBtn.addEventListener('click', () => {
        video.pause();
        video.currentTime += 1/30; // Advance one frame (assuming 30fps)
        playBtn.textContent = '▶';
    });
}

function formatTimecode(seconds) {
    const pad = num => String(Math.floor(num)).padStart(2, '0');
    return `${pad(seconds/60)}:${pad(seconds%60)}:${pad((seconds*100)%100)}`;
}