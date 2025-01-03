document.addEventListener('DOMContentLoaded', () => {
    // Initialize the site
    initializeVHSEffect();
    initializeTypewriter();
    initializePostsLink();
});

function initializeVHSEffect() {
    // Random glitch effect
    setInterval(() => {
        if (Math.random() > 0.95) {
            document.body.style.filter = `
                hue-rotate(${Math.random() * 360}deg) 
                saturate(${Math.random() * 2 + 0.5})
            `;
            setTimeout(() => {
                document.body.style.filter = '';
            }, 50);
        }
    }, 100);
}

function initializeTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        element.style.opacity = '1';
    });
}

function initializePostsLink() {
    const postsLink = document.querySelector('a.locked');
    postsLink.addEventListener('click', (e) => {
        e.preventDefault();
        const key = prompt('Enter the key to access posts:');
        if (key === 'Love') { // The key from your binary puzzle
            // Add glitch effect before redirect
            document.body.classList.add('major-glitch');
            // Store a temporary access token
            sessionStorage.setItem('accessToken', Date.now());
            setTimeout(() => {
                window.location.href = 'posts.html';
            }, 1000);
        } else {
            showErrorMessage('Invalid key. Access denied.');
        }
    });
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message glitch';
    errorDiv.textContent = message;
    document.querySelector('.container').appendChild(errorDiv);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
} 