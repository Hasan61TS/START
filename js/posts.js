document.addEventListener('DOMContentLoaded', () => {
    // Always reset progress when loading the page
    resetAllProgress();
    
    // Check if we have a valid access token
    const accessToken = sessionStorage.getItem('accessToken');
    const currentTime = Date.now();
    
    // If we don't have a valid token, redirect to index
    if (!accessToken || currentTime - parseInt(accessToken) > 2000) {
        window.location.href = 'index.html';
        return;
    }
    
    // Clear the token immediately after checking
    sessionStorage.removeItem('accessToken');
});

// Add back the puzzle answers
const puzzleAnswers = {
    1: 'opening light door',
    2: 'CIPHER',
    3: 'DIGEL',
    4: 'MUST DECRYPT INTO',
    5: 'ANYA PUERO'
};

function resetAllProgress() {
    // Clear all localStorage items except userLoggedIn
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    localStorage.clear();
    if (userLoggedIn) {
        localStorage.setItem('userLoggedIn', userLoggedIn);
    }
    
    // Lock all posts except the first one
    lockAllPosts();
    
    // Remove login button if it exists
    removeLoginButton();
}

function removeLoginButton() {
    const loginBtn = document.querySelector('.login-btn')?.parentElement;
    if (loginBtn) {
        loginBtn.remove();
    }
}

function lockAllPosts() {
    // Lock ALL posts including the first one
    document.querySelectorAll('.post').forEach(post => {
        post.classList.add('locked');
    });
    
    // Only unlock the first post
    const firstPost = document.getElementById('post1');
    if (firstPost) {
        firstPost.classList.remove('locked');
    }
}

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('puzzleProgress') || '[]');
    
    // Unlock posts based on saved progress
    progress.forEach(puzzleNum => {
        unlockPost(puzzleNum + 1); // Unlock next post after solved puzzle
    });
}

function resetProgress(event) {
    event.preventDefault();
    
    // Show confirmation dialog
    if (confirm('Are you sure you want to reset all progress?')) {
        // Clear localStorage
        localStorage.removeItem('puzzleProgress');
        localStorage.removeItem('loginEnabled');
        
        // Add glitch effect
        document.body.classList.add('major-glitch');
        
        // Reload page after short delay
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}

function checkPuzzle(puzzleNum) {
    const input = document.getElementById(`puzzle${puzzleNum}-input`).value.toUpperCase();
    const isCorrect = input === puzzleAnswers[puzzleNum].toUpperCase();

    if (isCorrect) {
        // Save progress
        const progress = JSON.parse(localStorage.getItem('puzzleProgress') || '[]');
        if (!progress.includes(puzzleNum)) {
            progress.push(puzzleNum);
            localStorage.setItem('puzzleProgress', JSON.stringify(progress));
        }

        // Show success message
        if (puzzleNum === 4) {
            showSuccessMessage();
            unlockPost(puzzleNum + 1);
            // Enable login after puzzle 4
            localStorage.setItem('loginEnabled', 'true');
            addLoginButton();
        } else if (puzzleNum === 5) {
            showFinalSuccess();
        } else {
            showSuccessMessage();
            unlockPost(puzzleNum + 1);
        }
    } else {
        showErrorMessage('Incorrect solution. Try again.');
    }
}

function unlockPost(puzzleNum) {
    const post = document.getElementById(`post${puzzleNum}`);
    if (post) {
        post.classList.remove('locked');
    }
}

function showFinalSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'error-message success';
    successDiv.textContent = 'Access granted. The login system is now available.';
    document.querySelector('.container').appendChild(successDiv);
    
    // Show the login menu item
    localStorage.setItem('loginEnabled', 'true');
    
    // Add login button to navigation
    addLoginButton();
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function addLoginButton() {
    const nav = document.querySelector('.main-nav ul');
    // Remove existing login button if it exists
    const existingLogin = nav.querySelector('.login-btn');
    if (existingLogin) {
        existingLogin.parentElement.remove();
    }
    
    // Create new login button
    const loginItem = document.createElement('li');
    loginItem.innerHTML = '<a href="login-challenge.html" class="login-btn glitch">Login</a>';
    
    // Insert after the Posts link
    const postsLink = nav.querySelector('a[href="#"].active, a[href="posts.html"]').parentElement;
    postsLink.insertAdjacentElement('afterend', loginItem);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'error-message success';
    successDiv.textContent = 'Puzzle solved! Next entry unlocked.';
    document.querySelector('.container').appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.container').appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function checkFinalPuzzle() {
    const finalPost = document.getElementById('post5');
    if (!finalPost || finalPost.classList.contains('locked')) return;

    finalPost.addEventListener('click', () => {
        showFinalSuccess();
    });
} 