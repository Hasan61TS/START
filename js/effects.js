class GlitchEffect {
    constructor() {
        this.glitchTexts = document.querySelectorAll('.glitch');
        this.init();
    }

    init() {
        this.glitchTexts.forEach(text => {
            this.applyGlitch(text);
        });
    }

    applyGlitch(element) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.textShadow = `
                    ${Math.random() * 10}px ${Math.random() * 10}px ${Math.random() * 10}px rgba(255,0,0,0.5),
                    ${Math.random() * -10}px ${Math.random() * -10}px ${Math.random() * 10}px rgba(0,102,204,0.5)
                `;
                setTimeout(() => {
                    element.style.textShadow = '';
                }, 50);
            }
        }, 100);
    }
}

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
    new GlitchEffect();
}); 